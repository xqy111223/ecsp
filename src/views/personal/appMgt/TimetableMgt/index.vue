/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.11.04 09:15.
* @Author
* @Description 个人空间 - 应用管理 - 课表管理
**/
<template>
  <div class="cl-time-table">
    <!--页头-->
    <page-header></page-header>
    <!-- 课表 查询条件 -->
    <div class="cl-search">
      <el-form :inline="true" :model="form" label-width="70px">

        <el-form-item label="区域：">
          <select-region :filterable="true" @change="handleAreaChange" v-model="form.areaId"></select-region>
        </el-form-item>

        <el-form-item label="学校：">
          <select-school :areaId="form.areaId" @handleSchoolChange="handleSchoolChange" v-model="form.schoolId"></select-school>
        </el-form-item>

        <el-form-item label="教室：">
          <el-select @change="handleRoomChange" placeholder="请选择教室" size="flat" v-model="form.classroom">
            <el-option :key="item.baseClassroomId" :label="item.roomName" :value="item.baseClassroomId.toString()" v-for="item in classroomOption"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="课程：">
          <el-select @change="handleProjectChange" placeholder="请选择课程" size="flat" v-model="form.projectName">
            <el-option label="主讲" value="MASTER"></el-option>
            <el-option label="受邀" value="RECEIVE"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- 课表表头 操作 -->
    <div v-show="courseFlag">
      <div class="cl-caption">
        <!-- 设置上课时间 弹窗 -->
        <el-button @click="handleDialogClick('set')" class="no-radius" size="mini" type="custom">设置上课时间</el-button>
        <time-setting :classRoomId="form.classroom" :dialogVisible="setTimeDialog"
                      @getDialog="setTimeDialogFn"></time-setting>
        <!-- 编辑课表 弹窗 -->
        <el-button @click="handleDialogClick('edit')" class="no-radius" size="mini" type="custom">编辑课表</el-button>
        <edit-table :class-data="tableData" :classRoomId="form.classroom" :dialogVisible="tableDialog" :form="form"
                    @getDialog="setTableDialog"></edit-table>
        <!-- 课程表 学期选择 -->
        <div class="cl-project">
          <el-select @change="handleSemesterChange" placeholder="请选择学期" size="flat" v-model="cycle">
            <el-option :key="item.baseTermId" :label="item.cname" :value="item"
                       v-for="item in semesterOption"></el-option>
          </el-select>
          课程表
        </div>
        <!-- 日期上下周选择 -->
        <week-data @getWeek="getWeek" class="fr"></week-data>
      </div>
      <!-- 课表 表格区域 -->
      <p class="cl-student-num">{{ min }} 至 {{ max }} <span class="fr">学生人数：{{ studentNum }}</span></p>
      <div class="table-area">
        <class-table :class-data="tableData" :style="compStyle" @mouseEnter="mouseEnter" ref="classTable"></class-table>
      </div>
    </div>
    <div class="no-course" v-show="!courseFlag"></div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import { mapGetters } from 'vuex'
import EditTable from './EditTable' // 编辑课表
import ClassTable from './ClassTable' // 课表表格
import TimeSetting from './TimeSetting' // 设置上课时间
import WeekData from '@/components/personal/WeekData/' // 切换周 时间组件
import PageHeader from '@/components/personal/PageHeader/' // 页头 组件
import SelectRegion from '@/components/common/SelectRegion/' // 区域组件
import SelectSchool from '@/components/common/SelectSchool/' // 学校组件
import { getClassroom, getCursor, getRoomTime, semester } from '@/api/personal/appMgt' // 获取学校、获取教室\节次-区域级别、上课时间数据-教室级别、课表数据

export default {
  name: 'Timetable',
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
  components: { PageHeader, SelectRegion, TimeSetting, EditTable, WeekData, ClassTable, SelectSchool },
  data () {
    return {
      min: '',
      max: '', // 表头时间范围使用
      form: { // 查询条件
        areaId: null,
        schoolId: '',
        classroom: '',
        projectName: ''
      },
      cycle: '', // 课程表 - 学期
      tableData: { // 课表table数据
        list: [],
        courseInfo: []
      },
      studentNum: 0, // 教室学生数量
      courseFlag: true, // 选择教室之后 才展示课表
      courseDateMax: '', // 最大时间 - 周切换控件 当天所在周的周日
      courseDateMin: '', // 最小时间 - 周切换控件 当天所在周的周一
      semesterOption: [], // 学期数据
      tableDialog: false, // 编辑课表 - 弹窗
      classroomOption: [], // 教室数据
      setTimeDialog: false, // 设置上课时间 - 弹窗
    }
  },
  computed: {
    ...mapGetters(['userId', 'basePlatformId', 'baseAreaId', 'baseSchoolId']),
    compStyle () {
      return {
        height: this.options.sizey * this.basePX - (25 + 43 + 30) + 'px',
        overflowY: 'auto'
      }
    }
  },
  created () {
    this.getSemester() // 获取学期
    this.getRoomTimeData() // 指定教室上课时间获取

    this.getClassroomData()
  },
  mounted () {
  },
  methods: {
    /**
     *@Description
     *@Param
     *@Return 查询条件 - 区域事件监听.
     **/
    handleAreaChange (e) {
      this.form.areaId = e
      this.getSemester(e) // 区域改变 - 学期改变
    },
    /**
     *@Description
     *@Param
     *@Return 查询条件 - 学校事件监听.
     **/
    handleSchoolChange (e) {
      const schoolId = e
      this.getClassroomData(schoolId)
    },
    /**
     *@Description
     *@Param
     *@Return 查询条件 - 获取教室.
     **/
    getClassroomData (schoolId) {
      const params = {
        crossDomain: 1, // 是否跨域，可选，1支持，0不支持
        isPaging: false, // true分页，false不分页，不传默认分页
        baseSchoolId: schoolId, // 学校ID
        baseAreaId: this.form.areaId, // 区域ID
      }
      getClassroom(params).then(res => {
        console.log('教室查询***', res)
        this.classroomOption = res.list
      })
    },
    /**
     *@Description
     *@Param
     *@Return 查询条件 - 教室事件监听.
     **/
    handleRoomChange (e) {
      this.studentNum = e
      this.getCursorData()
      this.courseFlag = true
    },
    /**
     *@Description
     *@Param
     *@Return 课程 - 主讲受邀 - 事件监听.
     **/
    handleProjectChange () {
      console.log('课程***', this.form)
      this.getCursorData()
    },
    /**
     *@Description ---------------------------- 无用排查 废弃
     *@Param
     *@Return 课表鼠标 - 移入 单元格事件.
     **/
    mouseEnter (data) {
      console.log('td移入*****', data)
      this.loadSubject(data) // 获取列表数据
    },
    /**
     *@Description
     *@Param
     *@Return 设置上课时间(set)、编辑课表(edit) - 按钮事件监听.
     **/
    handleDialogClick (e) {
      if (e === 'set') { // 设置上课时间 组件
        this.setTimeDialog = true
      } else { // 编辑课表 组件
        this.tableDialog = true
      }
    },
    /**
     *@Description
     *@Param
     *@Return 选择 学期事件监听 -- 更新课表信息.
     **/
    handleSemesterChange (e) {
      this.courseDateMax = e.endDate // 最大时间
      this.courseDateMin = e.startDate // 最小时间
      this.getCursorData()
    },
    /**
     *@Description
     *@Param
     *@Return 接收触发事件 - 弹窗设置处理 - 设置上课时间(set)、编辑课表(table).
     **/
    setTimeDialogFn (e) {
      this.setTimeDialog = false
    },
    setTableDialog () {
      this.tableDialog = false
    },
    /**
     *@Description
     *@Param
     *@Return 获取学期.
     **/
    getSemester (id) {
      const params = {
        areaId: id || this.baseAreaId
      }
      semester(params).then(res => {
        res.length && res.forEach(val => {
          val.end = dayjs(val.endDate).format('YYYY-MM-DD')
          val.start = dayjs(val.startDate).format('YYYY-MM-DD')
          val.cname = val.start.substr(0, 4) + '-' + val.end.substr(0, 4) + val.name
        })
        this.semesterOption = res
        this.getWeek() // 初始化的时候 判断数据的时间范围是否包含 当前周
      })
    },
    /**
     *@Description
     *@Param
     *@Return 子组件 - 周组件切换时 传值.
     **/
    getWeek (e) {
      let num = 0
      const day = e ? (new Date(e).getDay() || 7) : (new Date().getDay() || 7)
      const firstDay = dayjs(e).subtract((day - 1), 'day') // 一周 第一天
      const lastDay = dayjs(e).add((7 - day), 'day') // 一周 最后一天
      this.min = firstDay.format('YYYY-MM-DD') // 表头使用
      this.max = lastDay.format('YYYY-MM-DD')
      this.courseDateMin = new Date(this.min).getTime() // firstDay.valueOf() // 最小时间 - 周切换控件 当天所在周的周一
      this.courseDateMax = new Date(this.max).getTime() // lastDay.valueOf() // 最大时间 - 周切换控件 当天所在周的周日

      for (let i = 0, len = this.semesterOption.length; i < len; i++) {
        const val = this.semesterOption[i]
        // 本周周一 > 时间段的最大时间 || 本周周日 < 时间段最小时间  => 说明本周不在时间段内 需要展示当前周   ==== 当前取反 不显示当前周
        if (!(this.courseDateMin > val.endDate || this.courseDateMax < val.startDate)) {
          num++
          break
        }
      }
      if (num > 0 && this.semesterOption[0].id === '1') {
        this.semesterOption.shift()
      }
      if (num === 0 && this.semesterOption[0].id !== '1') {
        const obj = {
          id: '1',
          cname: '当前周',
          endDate: this.courseDateMax,
          startDate: this.courseDateMin,
        }
        this.semesterOption.unshift(obj)
      }
      this.getCursorData() // 更新课表信息
      this.$refs.classTable.getVacation(e) // 切换时间控件 - 调用class table 子组件 方法 判断是否是节日 更新表头
    },
    /**
     *@Description
     *@Param
     *@Return 获取课程表 - 排课信息.
     **/
    getCursorData () {
      const params = {
        userId: this.userId, // 用户ID
        platformId: this.basePlatformId, // 平台ID
        classroomId: this.form.classroom, // 教室ID
        courseDateMax: this.courseDateMax, // 最大时间
        courseDateMin: this.courseDateMin, // 最小时间
        attendeeType: this.form.projectName, // MASTER、RECEIVE
      }
      getCursor(params).then(res => {
        console.log('课程***', res)
        this.tableData.list = res.list
      })
    },
    /**
     *@Description
     *@Param
     *@Return 课程表 - 节次、上课时间 - 教室级别.
     **/
    getRoomTimeData () {
      getRoomTime({ classroomId: 'classroomId' }).then(res => {
        this.tableData.courseInfo = res.list
        console.log('教室课表上课时间、节次*****', res)
      })
    },
  }
}
</script>
<style lang="scss" scoped>
  .cl-time-table {
    min-height: 886px;

    .cl-search {
      padding-top: 20px;
      border-bottom: 1px dashed #dcdcdc;
    }
  }

  .cl-caption {
    position: relative;
    margin: 15px auto;

    .cl-project {
      position: absolute;
      top: 0;
      left: 50%;
      width: 230px;
      margin-left: -115px;

      /deep/ .el-input {
        width: 180px;
      }
    }
  }

  .cl-student-num {
    line-height: 30px;
    height: 30px;
    padding: 0 10px;
    border: 1px solid #e5e5e5;
  }

  .no-course {
    height: 600px;
    background: url("~@/assets/images/no-course.png") no-repeat center center;
  }
</style>
