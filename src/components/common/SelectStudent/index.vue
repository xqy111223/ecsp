<template>
  <div class="selelect-student">
    <el-select
      :loading="loading"
      :remote-method="remoteMethod"
      @change="change"
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
        <span style="float: right;margin-left:10px; color: #8492a6; font-size: 13px" v-if="item.isSame">{{ item.loginName }}</span>
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { queryUserOptions } from '@/api/personal/basicSetting'
/*
* Description index
* Created By xuqingyu
* Created At 2019/11/25 14:12
*/
export default {
  name: 'SelelectStudent',
  props: {
    areaId: {
      type: Number,
      default: null
    },
    schoolId: {
      type: Number,
      default: null
    },
    classId: {
      type: Number,
      default: null
    },
    gradeId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      value: '',
      options: [],
      list: [],
      loading: false,
      states: [],
      keywords: []
    }
  },
  computed: { // 在计算属性中获取state中的状态数据，数据改变后会自动更新
    ...mapGetters([
      'basePlatformId', // 平台id
      'platformType', // 0是区域,1是学校
      'baseAreaId', // 区域ID
      'baseSchoolId', // 学校ID
    ])
  },
  methods: {
    /**
     * @description: 监听selected的change事件，触发父组件的change事件调用handleStudentChange，改变Id
     * @param e 描述
     * @returns {}
     */
    change (val) {
      this.$emit('handleStudentChange', val)
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
          value: item.userName,
          label: item.userName,
          baseUserId: item.baseUserId,
          baseSchoolName: item.baseSchoolName,
          loginName: item.loginName,
          isSame: !!(resNameArr.length - 1),
        })
      })
    },
    /**
     * @description: 远程搜索方法，每次输入查询值时都请求一次查询接口
     * @param query 描述
     * @returns {}
     */
    async remoteMethod (query) {
      if (query.length > 1) {
        if (query.length === 2 && this.keywords.includes(query)) {
          this.loading = false
          this.options = [{ label: `请输入至少两个字,非"${query}"...` }]
        } else {
          this.options.length = 0
          this.loading = true
          const params = {
            userType: 4,
            schoolId: this.schoolId || this.baseSchoolId,
            status: 1,
            classId: this.classId,
            gradeId: this.gradeId,
            areaId: this.areaId || this.baseAreaId,
            basePlatformId: this.basePlatformId,
            userName: query
          }
          this.states = await queryUserOptions(params)
          // console.log('this.states', this.states)
          this.loading = false
          await this.handleOptions(this.states)
        }
      } else {
        this.loading = false
        this.options = [{ label: '请输入至少两个字' }]
      }
    },
  }
}
</script>

<style scoped lang="scss">
  .index {

  }
</style>
