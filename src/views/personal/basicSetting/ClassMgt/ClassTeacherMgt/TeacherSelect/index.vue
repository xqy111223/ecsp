<template>
  <div class="teacher-select">
    <el-select
      :loading="loading"
      :remote-method="remoteMethod"
      @change="selectedId"
      clearable
      filterable
      placeholder="请输入至少2个字"
      remote
      size="date-flat"
      value-key="label"
      v-model="value">
      <el-option
        :key="item.value"
        :label="item.label"
        :value="item"
        v-for="item in options">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right;margin-left:10px; color: #8492a6; font-size: 13px" v-if="item.isSame">{{ platformType === 0 ? item.baseSchoolName : item.loginName }}</span>
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
/*
* Description index
* Created By xuqingyu
* Created At 2019/11/25 14:12
*/
export default {
  name: 'index',
  props: {
    states: Array,
    index: Number,
    item: Object
  },
  data () {
    return {
      value: this.item.name,
      options: [],
      list: [],
      loading: false,
      keywords: ['老师']
    }
  },
  computed: { // 在计算属性中获取state中的状态数据，数据改变后会自动更新
    ...mapGetters([
      'platformType' // 平台类型
    ])
  },
  watch: {
    item: function (newV, oldV) {
      this.value = newV.name
    }
  },
  methods: {
    /**
     * @description: 监听selected的change事件，触发父组件的getSelectedId事件，改变Id
     * @param e 描述
     * @returns {}
     */
    selectedId (val) {
      const obj = { val: val.baseUserId, index: this.index, name: val.label }
      this.$emit('updateId', obj)
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
        this.options.push({
          value: item.baseUserId,
          label: item.userName,
          baseUserId: item.baseUserId,
          baseSchoolName: item.baseSchoolName,
          loginName: item.loginName,
          isSame: !!(resNameArr.length - 1),
        })
      })
      // console.log('this.platformType', this.platformType)
    },
    /**
     * @description: 远程搜索方法，每次输入查询值时都请求一次查询接口
     * @param query 描述
     * @returns {}
     */
    async remoteMethod (query) {
      // if (query.length > 1) {
      if (query.length === 2 && this.keywords.includes(query)) {
        this.loading = false
        this.options = [{ label: `请输入至少两个字,非"${query}"...` }]
      } else {
        this.options.length = 0
        this.loading = true
        this.list = this.states.filter(item => item.userName.indexOf(query) > 0)
        // console.log('this.states', this.states)
        this.loading = false
        await this.handleOptions(this.states)
      }
      // } else {
      //   this.loading = false
      //   this.options = [{ label: '请输入至少两个字' }]
      // }
    },
  }
}
</script>

<style scoped lang="scss">

</style>
