<template class="select-school">
  <el-select
    :loading="loading"
    :remote-method="remoteMethod"
    :clearable="clearable"
    filterable
    remote
    placeholder="请输入至少2个字"
    size="date-flat"
    @change="change"
    v-model="value">
    <el-option
      :key="item.value"
      :label="item.label"
      :value="item.value"
      v-for="item in options">
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right;margin-left:10px; color: #8492a6; font-size: 13px" v-if="item.isSame">{{ item.areaName }}</span>
    </el-option>
  </el-select>
</template>

<script>
import { searchSchoolList } from '@/api/common'
import { mapGetters } from 'vuex'
/*
* Description index
* Created By xuqingyu
* Created At 2019/11/25 14:12
*/
export default {
  name: 'SelectSchool',
  props: {
    areaId: {
      type: Number,
      default: null
    },
    clearable: {
      type: Boolean,
      default: true
    },
  },
  data () {
    return {
      value: null,
      loading: true,
      options: [],
      list: [],
      states: [],
      keywords: ['实验', '初中', '小学', '中学', '高中', '学校', '幼小', '完小', '完中']
    }
  },
  computed: {
    ...mapGetters([
      'baseAreaId', // 区域ID
    ])
  },
  methods: {
    /**
     * @description: 监听selected的change事件，触发父组件的change事件handleSchoolChange，改变Id
     * @param e 描述
     * @returns {}
     */
    change (val) {
      this.$emit('handleSchoolChange', val)
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
          if (_item.schoolName === item.schoolName) {
            resNameArr.push(_item.schoolName)
          }
        })
        this.options.push({
          value: item.baseSchoolId,
          label: item.schoolName,
          areaName: item.areaName,
          isSame: !!(resNameArr.length - 1),
        })
      })
      // console.log('this.options', this.options)
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
          this.options = []
          this.loading = true
          const params = {
            // 如果没有从外部传入查询的区域id,则去当前平台的区域id
            baseAreaId: this.areaId || this.baseAreaId,
            schoolName: query
          }
          console.log('查询学校params', params)
          this.states = await searchSchoolList(params)
          console.log('学校this.states', this.states)
          await this.handleOptions(this.states)
          this.loading = false
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
  .select-school {

  }
</style>
