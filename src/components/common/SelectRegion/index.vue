/*
* Description index
* Created By yinmeng@codyy.com
* Created At 2019/10/9 13:36
*/
<template>
  <el-cascader :clearable="clearable" :filterable="filterable" :placeholder="placeholder" :props="props" v-model="selected"
               @change="change" size="flat"></el-cascader>
</template>
<script>
import { getAreaData } from '@/api/common'

export default {
  name: 'SelectRegion',
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    areaCode: {
      type: String,
      default: '000000' // 默认全国
    },
    areaId: {
      type: Number,
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    checkStrictly: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '请选择区域'
    }
  },
  data () {
    return {
      props: { // 配置级联菜单选项
        lazy: true, // 动态加载子节点
        emitPath: false, // 选中节点时，返回节点值
        value: 'areaId', // 指定选项的值为
        label: 'areaName', // 指定选项标签
        lazyLoad: this.loadData // 加载动态数据的方法
      },
      selected: null
    }
  },
  watch: {
    selected () {
      if (!this.selected) {
        this.$emit('update:value', this.selected)
      }
    }
  },
  created () {
    // 合并配置
    this.props = { ...this.props, multiple: this.multiple, checkStrictly: this.checkStrictly }
  },
  methods: {
    change (value) {
      // 触发外层事件，并更新值
      const v = !isNaN(value) ? value : value.indexOf('_') ? value.split('_')[0] : value
      this.$emit('update:value', Number(v))
      this.$emit('change', Number(v))
    },
    /**
     * 加载区域数据
     * @param node 为当前点击的节点
     * @param resolve 为数据加载完成的回调(必须调用)
     * @returns {Promise<void>}
     */
    async loadData (node, resolve) {
      const params = {}
      if (!node.root) {
        params.areaId = Number(node.data.areaId)
      } else {
        params[this.areaId ? 'areaId' : 'areaCode'] = this.areaId || this.areaCode
      }
      let result = await getAreaData(params)
      result = result.map(r => {
        return {
          areaCode: r.areaCode,
          areaId: r.baseAreaId,
          areaName: r.areaName,
          leaf: r.hasChild === '1'
        }
      })
      if (!node.root) {
        result.unshift({
          leaf: true,
          areaName: '全部',
          areaId: node.value + '_' + Math.random(),
        })
      }
      resolve && resolve(result)
    }
  }
}
</script>

<style lang="scss" scoped>
  .select-region {
  }
</style>
