/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.12.31 10:17.
* @Author
* @Description 门户首页 - 课程表 模块 - 入口
**/
<template>
  <div class="portal-class-table">
    <!-- 模块 标题 -->
    <div class="home-title"><i class="el-icon-custom-class-schedule"></i>课程表</div>
    <!-- 课程表 模块 -->
    <class-table :class-data="tableData" :style="compStyle" @table-click="showDialog"></class-table>
    <!-- 课程表 课程列表 - 弹窗 -->
    <class-dialog :data-list="dataList" :visible.sync="dialogVisible"></class-dialog>
  </div>
</template>

<script>
import ClassTable from './ClassTable'
import ClassDialog from './ClassDialog'
import { getClassTableData, getClassTableDialogData } from '@/api/onlineclass/home'

export default {
  name: 'ClassTableIndex',
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    basePX: {
      type: Number,
      default: 40
    }
  },
  computed: {
    compStyle () {
      return {
        height: this.options.sizey * this.basePX - (25 + 43 + 30) + 'px',
        overflowY: 'auto'
      }
    }
  },
  components: { ClassTable, ClassDialog },
  data () {
    return {
      dataList: [], // 课程列表 数据 - 弹窗中使用
      tableData: {}, // 课程表 - 课程数据
      dialogVisible: false // 课程列表 弹窗 flag
    }
  },
  async beforeCreate () {
    try {
      const data = await getClassTableData('000000')
      // console.log('home-tableData****', data)
      this.tableData = data
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    showDialog (data) {
      console.log(data)
      // 获取列表数据
      this.dialogVisible = true
      this.loadSubject(data)
    },
    /**
     * @description: 根据点击的周期，获取课程信息
     * @param arguments 描述
     * @returns {}
     */
    async loadSubject (data) {
      try {
        this.dataList = []
        const result = await getClassTableDialogData('000000', data.daySeq, data.classSeq, data.dayPeriodFlag)
        console.log('result******************************', result)
        // this.dataList = result
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .home-title {
    font-size: 24px;
    font-weight: bold;
    line-height: 1;
    margin-top: 43px;
    margin-bottom: 30px;
    color: #8696ac;
    i {
      font-size: 22px;
      font-weight: normal;
      margin-right: 10px;
      color: #347eff;
    }
  }
</style>
