/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.11.13 14:22.
* @Author
* @Description 个人中心 - 应用管理 - 课表管理 - 编辑课表 table区域
**/
<template>
  <div class="class-table">
    <!-- 课表 table -->
    <el-table :data="tableData" :span-method="arraySpanMethod" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseLeave" border>
      <el-table-column :class-name="getClassName(item)" :index="index" :key="item.prop" :label="item.label" :width="getIndex(index)" v-for="(item, index) in columns">
        <template slot-scope="scope">
          <!-- 午别 列 -->
          <div v-if="item.prop==='type'">{{ scope.row[item.prop] }}</div>
          <!-- 节次 列 -->
          <div class="cl-section" v-else-if="item.prop==='number'">
            {{scope.row.number}}
            <p class="ft12 c6">{{ scope.row.startTime }} - {{ scope.row.endTime }}</p><i class="el-icon-custom-sign"></i>
          </div>

          <!-- 课程内容 -->
          <div @click="triggerEvent(scope.row)" class="box-radius position" v-else-if="item.prop && scope.row[item.prop] && scope.row[item.prop].length">
            <el-popover placement="top-start" trigger="click" width="260">
              <!-- 课程信息浮层 内容 -->
              <class-information :classData="scope.row[item.prop]" :edit=true :noMore="noMore" @getDelete="getDelete" @getMore="getMore"></class-information>
              <div slot="reference">
                <div :class="['cl-teacher', getClassName(scope.row[item.prop])]" v-if="scope.row[item.prop].length === 1">
                  <h6 class="ellipsis">
                    <i class="el-icon-custom-Independent-course" v-show="scope.row[item.prop][0].selfDefine"></i> <!-- 自主开课 -->
                    {{ scope.row[item.prop][0].subjectCustomName }}<!-- 学科名称 -->
                  </h6>
                  <p class="ellipsis">{{ scope.row[item.prop][0].masterTeacherName }}</p><!-- 教师姓名 -->
                  <i class="el-icon-custom-cross-region" v-show="scope.row[item.prop][0].crossDomainFlag"></i> <!-- 跨域课 -->
                </div>

                <h6 class="cl-lesson ellipsis bor gray" v-else>
                  <i class="el-icon-custom-Independent-course" v-show="scope.row[item.prop][0].selfDefine"></i><!-- 自主开课 -->
                  {{ scope.row[item.prop].length }}节课
                </h6>
              </div>
            </el-popover>
          </div>
          <!-- 无内容 cell- -->
          <div :class="['el-empty position', addCourseList.includes(`${index}.${scope.row.index}`) ? 'cl-add' : '']" @click="handleCellClick(index, scope.row)" v-else>
            <i class="el-icon-custom-add-course"></i>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 更多课程信息 - 弹窗 -->
    <class-info :dialogVisible="dialogVisible" :moreData="moreData" @getDialog="setDialog"></class-info>
    <!-- 删除课程时间选择 -->
    <el-dialog :before-close="handleDateClose" :visible.sync="dialogDateVisible" append-to-body title="删除" width="300px">
      <p class="mb10">请选择删除课程的日期范围</p>
      <el-date-picker align="right" end-placeholder="结束日期" range-separator="至" size="flat" start-placeholder="开始日期" type="daterange" unlink-panels v-model="delDate">
      </el-date-picker>
      <span class="dialog-footer" slot="footer">
        <el-button @click="handleDeterClick" type="primary">确 定</el-button>
        <el-button @click="dialogDateVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import ClassInfo from './ClassInfo'
import { delCourse, vacation } from '@/api/personal/appMgt' // 删除课程、是否是假期
import { CHINESE_NUMBER, WEEK_NUMBER } from '@/constants/COMMON' // 一到二十、 周一到周日
import ClassInformation from '@/components/personal/ClassInformation/' // 课表移入 浮层内容

export default {
  name: 'ClassTable',
  components: {
    ClassInfo, // 浮层信息 框架
    ClassInformation // 浮层信息 内容
  },
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
    getWeek: {
      type: Function,
      default () {
        return null
      }
    }
  },
  data () {
    return {
      getYear: '', // 接收日期组件传的时间
      columns: [], // 课表初始化渲染 - 循环列
      moreData: [], // 传给更多课程弹窗组件 的数据
      noMore: true, // 课表浮层 是否 有更多信息通道
      tableData: [], // 课表数据
      spanArray: [], // 合并单元格

      delDate: '', // 删除时间范围
      courseId: '', // 删除课程的ID
      timeList: [], // 装载 新增 课程的时间
      vacationDate: [], // 是否是假期返回值
      addCourseList: [], // 装载 table 列.行 做序号使用
      courseDetailInfos: [], // 新增课程 提交数据

      dialogVisible: false, // 课程信息 弹窗标志
      dialogDateVisible: false, // 删除课程日期范围 弹窗标志
    }
  },
  watch: {
    classData: {
      deep: true,
      immediate: true,
      handler (newVal, oldVal) {
        this.classData.list.length && this.classData.courseInfo.length && this.renderTable()
      }
    }
  },
  created () {
    this.getDate()
  },
  mounted () {
    this.getWeek && this.getWeek()
  },
  methods: {
    /**
     *@Description
     *@Param
     *@Return 生成列信息 - 周、日期排列.
     **/
    getDate (e) {
      let firstDate = dayjs(e).startOf('week').add(1, 'day') // 获取当天 + 一天
      if (new Date().getDay() === 0 && dayjs().format('DD') === '01') {
        firstDate = dayjs().startOf('week').subtract(6, 'day') // 每月第一天是周日的时候，获取上个月最后一周天数
      }
      this.columns = [{
        label: '午别',
        prop: 'type'
      }, {
        label: '节次',
        prop: 'number'
      }]
      WEEK_NUMBER.split('_').forEach((week, i) => { // 表头日期
        const md = firstDate.add(i, 'day').format('MM.DD') // 当前月日
        const currentTime = dayjs(dayjs().format('YYYY-MM-DD')).valueOf() // 当日时间戳（年月日）
        const dateY = ((this.getYear || dayjs().format('YYYY')) + '.' + md)
        const today = currentTime === dayjs(dateY).valueOf() ? 1 : 0
        const vacation = this.vacationDate && this.vacationDate[i]
        let flag = ''
        if (vacation && vacation.isVacation) {
          flag = '/' + vacation.name
        } else {
          flag = today ? '/今天' : ''
        }
        this.columns.push({
          // label: `${week}/${md}${firstDate.add(i, 'day').get('day') === dayjs().get('day') ? '/今天' : ''}`,
          today: `${today ? 'today' : ''}`,
          label: `${week}/${md}${flag}`,
          prop: 'week_' + (i + 1),
          md: md
        })
      })
    },
    /**
     * @description: 课程表格 - 数据渲染
     * @param arguments 描述
     * @returns {}
     */
    renderTable () {
      let num = 0 // 上午课数
      this.tableData = [] // 课表table数据
      this.spanArray = [] // 合并单元格数据
      const tableData = [] // 课表排课信息 - 临时存储数据
      const courseInfo = this.classData.courseInfo // 上课节次和时间
      courseInfo.forEach((val, i) => { // 循环指定教室上课时间，将上下午节次\时间 - 分开
        let obj = {
          index: i + 1,
          number: CHINESE_NUMBER.split('_')[i], // CHINESE_NUMBER: 一 到 二十
          day: dayjs(Number(val.endTime)).format('MM-DD'),
          endTime: dayjs(Number(val.endTime)).format('HH:mm'),
          startTime: dayjs(Number(val.startTime)).format('HH:mm'),
          addId: val.id, // 添加课程的时候 使用
        }
        if (val.dayPeriod === 'AM') {
          obj.type = '上午'
          obj = { ...val, ...obj }
          tableData.push(obj)
          num++
        } else {
          obj.type = '下午'
          obj = { ...val, ...obj }
          tableData.push(obj)
        }
      })

      this.classData.list && this.classData.list.forEach(val => { // 循环课程信息 渲染课程表
        const courseDate = ('157' + val.time) * 100000 // 临时

        const weekIndex = new Date(courseDate).getDay() || 7 // val.courseDate
        const week = `week_${weekIndex}`
        if (val.dayPeriod === 'AM') { // 上午课
          const index = val.lessonSeq - 1 // 节次
          tableData[index][week] ? tableData[index][week].push(val) : tableData[index][week] = [val]
        } else { // 下午课
          const index = (val.lessonSeq - 1) + num // 节次 - 下午节次 + 上午节次
          tableData[index][week] ? tableData[index][week].push(val) : tableData[index][week] = [val]
        }
      })

      this.tableData = tableData
      this.mergeSpan() // 单元格合并 - 午别
    },
    /**
     *@Description
     *@Param
     *@Return 课表 - 编辑课表 - 点击 td 监听事件 - 空白处新增. row, column, cell, event
     **/
    handleCellClick (index, row) {
      const code = index + '.' + row.index
      const del = this.addCourseList.indexOf(code)
      const currentDate = dayjs().format('YYYY.MM.DD') // 当前所在年月日
      const ymd = (this.getYear || dayjs().format('YYYY')) + '.' + this.columns[index].md // 时间控件里的时间 年

      if (new Date(ymd).getTime() >= new Date(currentDate).getTime()) { // 控件年月日 >= 当前年月日 可添加
        console.log('可添加')
        if (del > -1) {
          this.addCourseList.splice(del, 1)
          this.timeList.splice(del, 1)
        } else {
          this.addCourseList.push(code)
          this.timeList.push(this.columns[index].md)
        }
      } else {
        this.$message.warning('只可以添加今天以后的课程！')
        return false
      }

      const arr = this.timeList.sort()
      const obj = {
        min: arr[0],
        max: arr[arr.length - 1],
        timeList: this.timeList,
        y: this.getYear || dayjs().format('YYYY'), // 取时间控件的年份
      }
      this.$emit('addCourseData', obj, this.addCourseList)
    },
    /**
     *@Description
     *@Param
     *@Return 父组件调用 函数 - 时间组件切换时 选中的 td 清空, 表头时间更新.
     **/
    clearEmpty (e) {
      this.getYear = dayjs(e).format('YYYY') // 接收时间控件中的年份
      this.getVacation(e) // 加载假期、更新表头
      this.addCourseList = [] // 清空要添加的课程
    },
    /**
     *@Description
     *@Param
     *@Return 获取 当日是否是假期.
     **/
    getVacation (e) {
      const params = {
        areaId: this.baseAreaId,
        date: dayjs().format('YYYY-MM-DD')
      }
      vacation(params).then(res => {
        this.vacationDate = res
        this.getDate(e)
      })
    },
    /**
     *@Description
     *@Param
     *@Return 课程信息 弹窗组件 接收classInformation组件 事件监听弹窗状态.
     **/
    setDialog () {
      this.dialogVisible = false
    },
    /**
     *@Description
     *@Param
     *@Return 课程信息 弹窗组件 接收classInformation组件 事件监听更多信息.
     **/
    getMore (e) {
      this.dialogVisible = true
      console.log('接收class-info信息*****', e)
      this.moreData = e
    },
    /**
     *@Description
     *@Param
     *@Return 课程信息 弹窗组件 接收classInformation组件 事件监听删除.
     **/
    getDelete (e) {
      console.log('删除***', e)
      this.courseId = e.courseId
      this.dialogDateVisible = true
    },
    /**
     *@Description 日期范围选择 - 确定事件
     *@Param
     *@Return .
     **/
    handleDeterClick () {
      const params = {
        courseId: this.courseId,
        courseDateMin: new Date(this.delDate[0]).getTime(),
        courseDateMax: new Date(this.delDate[1]).getTime(),
      }
      if (params.courseDateMin) {
        delCourse(params).then(res => {
          console.log(res)
          this.dialogDateVisible = false
        })
      } else {
        this.$message.warning('请选择删除课程日期范围！')
        return false
      }
    },
    /**
     *@Description 日期范围选择 - 关闭事件
     *@Param
     *@Return .
     **/
    handleDateClose () {
      this.dialogDateVisible = false
    },
    /**
     * @description: 处理表格的单元格合并
     * @param arguments 描述
     * @returns {}
     */
    mergeSpan () {
      let contactDot = 0
      this.tableData.forEach((val, index) => {
        // val.index = index
        if (index === 0) {
          this.spanArray.push(1)
        } else {
          if (val.type === this.tableData[index - 1].type) {
            this.spanArray[contactDot] += 1
            this.spanArray.push(0)
          } else {
            this.spanArray.push(1)
            contactDot = index
          }
        }
      })
    },
    /**
     *@Description
     *@Param
     *@Return 课表 td 鼠标移入事件 监听.
     **/
    handleMouseEnter (row, column, cell, event) {
      // console.log(row, column, cell, event)
      // this.$emit('mouseEnter', row)
    },
    /**
     *@Description
     *@Param
     *@Return 课表 td 鼠标移出事件 监听..
     **/
    handleMouseLeave () {
    },
    /**
     * @description: 表格合并回调
     * @param column 合并行、列的算法 - 第一列午别，进行合并
     * @returns {}
     */
    arraySpanMethod ({ column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const row = this.spanArray[rowIndex]
        const col = row > 0 ? 1 : 0
        return { rowspan: row, colspan: col }
      }
    },
    /**
     * @description: 方法说明
     * @param  循环出 节次、当天的列，并赋上 class
     * @returns {}
     */
    getClassName (item) {
      if (Array.isArray(item)) {
        if (item[0].status === 1) {
          return 'green starting bor'
        } else if (item[0].status === 2) {
          return 'gray bor'
        } else {
          return 'light bor'
        }
      } else {
        if (item.label.indexOf('节次') > -1) {
          return 'sort'
        }
        if (item.today === 'today') {
          return 'today'
        }
      }
    },
    /**
     * @description: 方法说明
     * @param  课表 第一列 宽度固定 50
     * @returns {}
     */
    getIndex (index) {
      return index === 0 ? 50 : ''
    },
    /**
     * @description: td 点击触发事件
     * @param data td 数据对象
     * @returns {}
     */
    triggerEvent (data) {
      console.log('data', data)
      this.$emit('table-click', {
        daySeq: data.daySeq,
        classSeq: data.classSeq,
        dayPeriodFlag: data.type === '上午' ? 'AM' : 'PM'
      })
    }
  },
}
</script>
<style lang="scss">
  .el-popover.el-popper {
    padding: 0;
    border-radius: 16px;
    .popper__arrow {
      bottom: -30px;
      width: 14px;
      height: 14px;
      border: none;
      border-radius: 14px;
      background: #0070ff;
      &:after {
        bottom: 1px;
        width: 1px;
        height: 30px;
        margin-left: 7px;
        border: none;
        background: #0070ff;
      }
    }
  }
</style>
<style lang="scss" scoped>
  @import "&/default/var.scss";
  /deep/ .table-area {
    border: 1px solid red;
  }
  .class-table {
    position: relative;
    .el-table {
      border-radius: 5px;
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.2);
      /* thead 区域*/
      /deep/ th {
        font-size: 12px;
        font-weight: normal;
        padding: 0;
        text-align: center;
        background: $primary-color;
        background: var(--primary-color);
        background-blend-mode: normal, normal;
      }
      /* 今天 */
      /deep/ th.today {
        background: #ffb400;
      }
      /* 节次列 icon */
      /deep/ td {
        padding: 0;
      }
      td.sort {
        i {
          position: absolute;
          top: 25px;
          right: 0;
          color: #f19149;
        }
      }
      /deep/ .el-table__header-wrapper {
        /* 表头区域 - th 位置 */
        tr {
          font-size: $font-normal-size;
          height: 40px;
          color: white;
        }
      }
    }
    /* 节次列 - 节次时间 */
    .cl-section {
      padding-right: 10px;
      text-align: right;
    }
    /* table 中方块底 td */
    .box-radius {
      /* 节课 */
      cursor: pointer;
      text-align: left;
      .cl-lesson {
        position: absolute;
        display: flex;
        align-items: center;
        width: calc(100% - 5px);
        i {
          margin-top: 0;
        }
      }
      &:hover {
        /*background: #9ffbcd;*/
      }
      .starting {
        &::after {
          position: absolute;
          right: 5px;
          bottom: 4px;
          display: block;
          width: 18px;
          height: 12px;
          content: ' ';
          background-image: url("~@/assets/images/starting.gif");
        }
      }
      /* 底色 */
      .bor {
        height: 100%;
        padding-left: 5px;
        border-radius: 5px;
      }
      /*  教师姓名 */
      .cl-teacher {
        font-size: 12px;
        p {
          color: #666;
        }
      }
      /* 自主开课 */
      .el-icon-custom-Independent-course {
        position: absolute;
        left: -5px;
        margin-top: 5px;
        color: #ff00ff;
      }
      /* 跨域 */
      .el-icon-custom-cross-region {
        position: absolute;
        top: -2px;
        right: -2px;
        color: #13b0f9;
      }
    }
  }
  .c6 {
    color: #666;
  }
  .orange {
    background: #ffb400;
  }
  .light {
    background: #e1efff;
  }
  .green {
    background: #9ffbcd;
  }
  .gray {
    background: #eee;
  }
  .position {
    position: absolute;
    top: 5px;
    right: 5px;
    bottom: 5px;
    left: 5px;
  }
  /* 空 */
  .el-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #fff;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
      background: #e1efff;
    }
  }
  .cl-add {
    background: #abd2ff;
  }
</style>
