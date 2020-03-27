/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.11.06 14:22.
* @Author
* @Description 个人中心 - 应用管理 - 课表管理 - 编辑课表 组件
**/
<template>
  <el-dialog :before-close="handleClose" :visible.sync="dialogVisible" width="1200px">
    <!-- 表头 -->
    <div class="cl-edit-title">
      <div class="w920 fl">
        <h4 class="cl-title fl">编辑课表</h4>
        <!-- 日期选择 -->
        <week-data @getWeek="getWeek" class="fr"></week-data>
      </div>

      <h4 class="cl-title w280 fr">课程设置</h4>
    </div>
    <!-- 主体 body 区域  -->
    <div class="cl-edit-table mt5">
      <!-- 左侧 - table 区域 课表编辑 -->
      <div class="cl-table fl w920">
        <edit-class :class-data="tableData" :getWeek="getWeek" @addCourseData="addCourseData" ref="editClass"></edit-class>
      </div>
      <!-- 右侧设置 - 区域 课程设置 -->
      <div class="cl-set fr w280">
        <class-setting :class-data="tableData.courseInfo" :classRoomId="classRoomId" :form="form" ref="classSetting"></class-setting>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import dayjs from 'dayjs' // 切换周 时间组件
import EditClass from './EditClass' // 课表编辑
import ClassSetting from './ClassSetting' // 课程设置
import WeekData from '@/components/personal/WeekData/'

export default {
  name: 'editTable',
  props: {
    classData: { // 接受父组件传过来的课表数据
      type: Object,
      default () {
        return {
          list: [], // 课表 - 排课课程信息
          courseInfo: [], // 课表 - 午别、节次、时间
        }
      }
    },
    classRoomId: String,
    dialogVisible: Boolean, // 弹窗flag
    form: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: { WeekData, EditClass, ClassSetting },
  data () {
    return {
      tableData: {}
    }
  },
  watch: {
    classData: {
      deep: true,
      handler (newVal, oldVal) {
        this.tableData = newVal
      }
    }
  },
  methods: {
    /**
     *@Description
     *@Param
     *@Return 关闭 按钮.
     **/
    handleClose (e) {
      this.$emit('getDialog')
    },
    /**
     *@Description
     *@Param
     *@Return 接收子组件 editClass 点击空白td事件，接受最大最小时间.
     **/
    addCourseData (time, data) {
      this.$refs.classSetting.getAddCourseData(time, data)
    },
    /**
     *@Description
     *@Param
     *@Return 子组件 - 周组件切换时 传值.
     **/
    getWeek (e) {
      const day = e ? (new Date(e).getDay() || 7) : (new Date().getDay() || 7)
      const firstDay = dayjs(e).subtract((day - 1), 'day') // 一周 第一天
      const dateArr = [] // 周一 到 周日的时间 判断假期使用
      for (let i = 0; i < 7; i++) {
        const day = dayjs(firstDay).add(i, 'day').format('YYYY-MM-DD')
        dateArr.push(day)
      }
      this.$refs.editClass.clearEmpty(e, dateArr)
    },
  }
}
</script>
<style lang="scss" scoped>
  .w920 {
    width: 910px;
  }
  .w280 {
    width: 270px;
  }
  /* 表头 */
  .cl-edit-title {
    overflow: hidden;
    padding: 5px 0;
    border-bottom: 1px solid #dcdcdc;
    .w920 {
      overflow: hidden;
    }
    .cl-title {
      font-size: 16px;
      font-weight: normal;
      margin-top: 15px;
      padding-left: 10px;
      color: #333;
      &:before {
        position: relative;
        top: -2px;
        left: -3px;
        display: inline-block;
        width: 5px;
        height: 5px;
        content: '';
        background: #333;
      }
    }
  }
  /* 主体 - body中自定义 */
  .cl-edit-table {

  }
  /* 修正弹窗原生样式 */
  /deep/ .el-dialog {
    border-radius: 0;
    .el-dialog__header {
      padding: 0;
      .el-icon-close.el-icon {
        font-size: 20px;
        color: #347eff;
      }
    }
    .el-dialog__body {
      max-height: 580px;
      padding: 0;
    }
  }
</style>
