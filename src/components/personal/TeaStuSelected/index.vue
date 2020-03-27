<template>
  <div class="index">
    <el-select
      :loading="loading"
      :remote-method="remoteMethod"
      @change="selectedUserId"
      clearable
      filterable
      placeholder="请输入至少2个字"
      remote
      size="date-flat"
      v-model="value">
      <el-option
        :key="item.value"
        :label="item.label"
        :value="item.value"
        v-for="item in options">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right;margin-left:10px; color: #8492a6; font-size: 13px" v-if="item.isSame">{{ platformType === 0 ? item.schoolName : item.loginName }}</span>
      </el-option>
    </el-select>
  </div>
</template>

<script>
/*
* Description index
* Created By xuqingyu
* Created At 2019/11/5 11:32
*/
import { mapGetters } from 'vuex'

export default {
  name: 'index',
  props: ['getSearchList', 'loginName'],
  data () {
    return {
      value: '',
      options: [],
      list: [],
      loading: false,
      states: [],
    }
  },
  computed: { // 在计算属性中获取state中的状态数据，数据改变后会自动更新
    ...mapGetters([
      'platformType' // 平台类型
    ])
  },
  watch: {
    loginName: function (newVal, oldVal) {
      this.value = newVal
    }
  },
  methods: {
    /**
     * @description: 监听selected的change事件，触发父组件的getSelectedUserId事件，改变Id
     * @param e 描述
     * @returns {}
     */
    selectedUserId (e) {
      this.$emit('getSelectedUserId', e)
    },
    /**
     * @description: 处理Options的属性结构
     * @param arguments 描述
     * @returns {}
     */
    handleOptions (lists) {
      lists.map(item => {
        const resNameArr = []
        lists.forEach(_item => {
          if (_item.userName === item.userName) {
            resNameArr.push(_item.userName)
          }
        })
        // this.options.push({
        //   value: item.userName,
        //   label: item.userName,
        //   baseUserId: item.baseUserId,
        //   baseSchoolName: item.baseSchoolName,
        //   loginName: item.loginName,
        //   isSame: !!(resNameArr.length - 1),
        // })
        this.options.push({
          value: item.baseUserId,
          label: item.userName,
          loginName: item.loginName,
          schoolName: item.baseSchoolName,
          isSame: !!(resNameArr.length - 1),
        })
      })
      console.log('this.options', this.options)
    },
    /**
     * @description: 远程搜索方法，每次输入查询值时都请求一次查询接口
     * @param query 描述
     * @returns {}
     */
    async remoteMethod (query) {
      if (query.length > 1) {
        this.options.length = 0
        this.loading = true
        this.states = await this.getSearchList(query)
        this.loading = false
        await this.handleOptions(this.states)
      } else {
        this.loading = false
        this.options = [{ label: '请输入至少两个字' }]
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .index {
  }
</style>
