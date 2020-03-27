<template class="school-select">
  <el-select
    :loading="loading"
    :remote-method="remoteMethod"
    @change="selectedId"
    @clear="selectedId"
    :clearable="clearable"
    :filterable="filterable"
    :placeholder="placeholder"
    :remote="remote"
    size="date-flat"
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
/*
* Description index
* Created By xuqingyu
* Created At 2019/11/25 14:12
*/
export default {
  name: 'SchoolSelect',
  props: {
    getSearchList: Function,
    clearable: {
      type: Boolean,
      default: true
    },
    filterable: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '请输入至少2个字'
    },
    remote: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      value: '',
      options: [],
      list: [],
      loading: false,
      states: [],
      keywords: ['实验', '初中', '小学', '中学', '高中', '学校', '幼小', '完小', '完中']
    }
  },
  methods: {
    /**
     * @description: 监听selected的change事件，触发父组件的getSelectedId事件，改变Id
     * @param e 描述
     * @returns {}
     */
    selectedId (val) {
      this.$emit('getSelectedId', val)
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
          this.states = await this.getSearchList(query)
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
  .school-select {

  }
</style>
