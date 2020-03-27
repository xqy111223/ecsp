/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.12.27 09:07.
* @Author
* @Description 个人空间 - 课程表 - 组件
**/
<template>
  <div class="portal-container portal-class-table">
    <div class="home-title">
      <!-- 模块标题 -->
      <i class="el-icon-custom-class-schedule"></i>课程表
      <!-- 日期上下周选择 -->
      <week-data @getWeek="getWeek" class="fr"></week-data>
    </div>

    <div class="class-table">
      <class-table :class-data="tableData" :showTime="false" :style="compStyle" @mouseEnter="mouseEnter" ref="classTable"></class-table>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapGetters } from 'vuex'
// import ClassTable from '@/views/personal/appMgt/TimetableMgt/ClassTable' // 课程表
import ClassTable from './ClassTable' // 课程表
import WeekData from '@/components/personal/WeekData/' // 切换周 时间组件
import { getLesson, getRoomTime, getCursor } from '@/api/personal/appMgt' // 获取区域学校上下午最大节次数、获取教室上课节次-时间数据、课表数据

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
  data () {
    return {
      tableData: { // 课表table数据
        list: [],
        courseInfo: []
      },
      classroomId: '', // 教室id

      courseDateMin: '',
      courseDateMax: '',
      min: '',
      max: ''
    }
  },
  components: { ClassTable, WeekData },
  created () {
    this.getCursorData() // 课程表数据
    this.getLessonData() // 获取上课最大节次 - 区域学校
    this.getRoomTimeData() // 获取上课节次、时间 - 教室
  },
  computed: {
    ...mapGetters(['userId', 'platformId', 'baseAreaId', 'baseSchoolId']),
    compStyle () {
      return {
        height: this.options.sizey * this.basePX - (25 + 43 + 30) + 'px',
        overflowY: 'auto'
      }
    },
  },
  methods: {
    /**
     *@Description 根据点击的周期，获取课程信息
     *@Param
     *@Return 获取课程表 - 排课信息.
     **/
    getCursorData () {
      const params = {
        userId: this.userId, // 用户ID
        platformId: this.platformId, // 平台ID
        classroomId: '', // 教室ID
        courseDateMax: this.courseDateMax, // 最大时间
        courseDateMin: this.courseDateMin, // 最小时间
      }
      getCursor(params).then(res => {
        console.log('空间首页****课程表数据***', res)
        this.tableData.list = res.list
      })
    },
    /**
     *@Description
     *@Param
     *@Return 课程表 - 最大上课节次 - 区域学校级别（首页、老师空间使用）.
     **/
    getLessonData () {
      const params = {
        areaId: this.baseAreaId, // 区域ID
        schoolId: this.baseSchoolId, // 学校ID areaId、schoolId必须有一个不为空，两个都有值时以schoolId为准
      }
      getLesson(params).then(res => {
        const AMArr = []
        const PMArr = []
        res.list.forEach(val => {
          const obj = {
            endTime: 0, // 学生家长老师 不需要展示节次时间
            startTime: 0,
            dayPeriod: 'AM',
          }
          if (val.dayPeriod === 'AM') {
            for (let i = 0; i < val.countMax; i++) {
              obj.dayPeriod = 'AM'
              AMArr.push(obj)
            }
          } else {
            for (let i = 0; i < val.countMax; i++) {
              obj.dayPeriod = 'PM'
              PMArr.push(obj)
            }
          }
        })

        this.tableData.courseInfo = AMArr.concat(PMArr)
        console.log('区域学校上课最大节次数*****this.tableData.courseInfo', AMArr.concat(PMArr))
      })
    },
    /**
     *@Description
     *@Param
     *@Return 课程表 - 节次、上课时间 - 教室级别.
     **/
    getRoomTimeData () {
      getRoomTime({ classroomId: this.classroomId }).then(res => {
        // this.tableData.courseInfo = res.list
        console.log('教室课表上课时间、节次*****', res)
      })
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
     *@Return 子组件 - 周组件切换时 传值.
     **/
    getWeek (e) {
      const day = e ? (new Date(e).getDay() || 7) : (new Date().getDay() || 7)
      const firstDay = dayjs(e).subtract((day - 1), 'day') // 一周 第一天
      const lastDay = dayjs(e).add((7 - day), 'day') // 一周 最后一天
      this.min = firstDay.format('YYYY-MM-DD') // 表头使用
      this.max = lastDay.format('YYYY-MM-DD')
      this.courseDateMin = new Date(this.min).getTime() // firstDay.valueOf() // 最小时间 - 周切换控件 当天所在周的周一
      this.courseDateMax = new Date(this.max).getTime() // lastDay.valueOf() // 最大时间 - 周切换控件 当天所在周的周日

      this.getCursorData() // 更新课表信息
      this.$refs.classTable.getVacation(e) // 切换时间控件 - 调用class table 子组件 方法 判断是否是节日 更新表头
    },
  }
}
</script>
<style lang="scss" scoped>
  .portal-class-table {
    border: 1px solid blue;
    /* 课程表 标题 */
    .home-title {
      font-size: 24px;
      font-weight: bold;
      line-height: 1;
      overflow: hidden;
      margin-top: 43px;
      margin-bottom: 30px;
      color: #8696ac;
    }
    i {
      font-size: 22px;
      font-weight: normal;
      margin-right: 10px;
      color: #347eff;
    }
  }
</style>
