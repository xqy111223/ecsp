/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.11.06 09:08.
* @Author
* @Description 个人中心 - 应用管理 - 课表管理 - 编辑课表 - 课表设置
**/
<template>
  <div class="class-setting">
    <ul class="cl-set">
      <li>
        <i class="red">*</i> 设置课程信息：
        <el-button @click="handleSetClick('info')" class="no-radius" size="mini" type="custom">设置</el-button>
        <p class="info-list" v-show="infoData">{{ infoData }} <i @click="handleDeleteClick('info')" class="el-icon-custom-delete1"></i></p>
      </li>
      <li>
        是否跨域：
        <el-radio label="2" v-model="crossDomain">域内</el-radio>
        <el-radio label="1" v-model="crossDomain">跨域</el-radio>
      </li>
      <li>
        设置听讲教室：
        <el-button @click="handleSetClick('room')" class="no-radius" size="mini" type="custom">设置</el-button>
        <p>{{ roomList.length }}间听讲教室</p>
      </li>
      <li>
        <div class="mb10"><i class="red">*</i> 设置日期范围：</div>
        <div class="cl-time">
          <el-input class="start-time" placeholder="开始日期" readonly v-model="startTime"></el-input>
          ~
          <el-date-picker :clearable="false" :editable="false" :picker-options="pickerOptions" class="end-time" placeholder="结束日期" type="date" v-model="endTime"></el-date-picker>
        </div>
      </li>
      <li>
        设置模式：
        <el-checkbox v-model="septumCheck">隔周排课</el-checkbox>
      </li>
    </ul>
    <div class="center">
      <el-button @click="handleBtnClick('app')" size="mini" type="primary">应用</el-button>
      <el-button @click="handleBtnClick('cancel')" size="mini" type="info">取消</el-button>
    </div>
    <!-- 设置课程信息弹窗 -->
    <el-dialog :visible.sync="infoDialogVisible" append-to-body title="设置课程信息" width="340px">
      <el-form :model="formInline" class="demo-form-inline">
        <el-form-item label="年级：">
          <el-select @change="handleGradeChange" placeholder="请选择年级" v-model="formInline.grade">
            <el-option :key="item.baseKnowledgeId" :value="item" v-for="item in gradeOption">{{ item.customName || item.name }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学科：">
          <el-select @change="handleSubjectChange" placeholder="请选择学科" v-model="formInline.project">
            <el-option :key="item.baseKnowledgeId" :value="item" v-for="item in subjectOption">{{ item.customName || item.name }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教师：">
          <el-select :loading="loading" :remote-method="remoteMethodTea" filterable placeholder="请选择教师" remote size="flat" v-model="formInline.teacher">
            <el-option :key="item.baseUserId" :value="item.userName" v-for="item in teacherOption">
              <span>{{ item.userName }}</span>
              <span class="ml10 fr">{{ item.areaPath }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="handleInfoClick('cancel')">取 消</el-button>
        <el-button @click="handleInfoClick('determine')" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设置听讲教室弹窗 -->
    <el-dialog :visible.sync="roomDialogVisible" append-to-body title="设置听讲教室" width="900px">
      <p>请添加或移除听讲教室：</p>
      <ul class="cl-room-list">
        <li :key="index" v-for="(item, index) in roomList">
          <i class="red">*</i> 学校：
          <el-select :loading="loading" :remote-method="remoteMethod" @change="handleSchoolChange" filterable placeholder="请输入关键词" remote size="flat" v-model="item.school">
            <el-option :key="item.baseSchoolId" :value="item.schoolName" v-for="item in schoolOption">
              <span>{{ item.schoolName }}</span>
              <span class="ml10 fr">{{ item.areaName }}</span>
            </el-option>
          </el-select>

          <i class="red ml10">*</i> 教室：
          <el-select @change="handleRoomChange" placeholder="请选择教室" size="flat" v-model="item.room">
            <el-option :key="item.baseClassroomId" :label="item.roomName" :value="item.baseClassroomId" v-for="item in classroomOption"></el-option>
          </el-select>

          <span class="ml10">教师：</span>
          <el-select :loading="loading" :remote-method="remoteMethodTea" @change="handleTeaChange" filterable placeholder="请输入关键词" remote size="flat" v-model="item.teacher">
            <el-option :key="item.baseUserId" :value="item.userName" v-for="item in teacherOption">
              <span>{{ item.userName }}</span>
              <span class="ml10 fr">{{ item.areaPath }}</span>
            </el-option>
          </el-select>
          <i @click="handleDeleteClick('room', index)" class="red el-icon-custom-delete"></i>
        </li>
      </ul>

      <div @click="handleAddRoomClick" class="cl-add-room"><i class="el-icon-custom-add"></i> 添加听讲教室</div>
      <span class="dialog-footer" slot="footer">
        <el-button @click="handleSetRoomClick('cancel')">取 消</el-button>
        <el-button @click="handleSetRoomClick('determine')" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 应用弹窗 -->
    <el-dialog :visible.sync="dialogVisible" append-to-body title="应用" width="320px">
      <div>当前设置将被应用到 {{ courseList.length }} 节课程</div>
      <span class="dialog-footer" slot="footer">
        <el-button @click="handleBtnClick('cancel')">取 消</el-button>
        <el-button @click="handleBtnClick('appDetermine')" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import { addCourse, getClassroom, getSchoolData, gradeData, teacherData } from '@/api/personal/appMgt'
// 获取学校、获取教室\节次-区域级别、上课时间数据-教室级别、课表数据

export default {
  name: 'ClassSetting',
  components: {},
  props: {
    classData: { // 接受父组件传过来的课表数据
      type: Array,
      default () {
        return {
          courseInfo: [], // 课表 - 午别、节次、时间
        }
      }
    },
    classRoomId: String,
    form: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    const _this = this
    return {
      // type: '', // 学校、教师输入框 状态判断
      infoData: '', // 设置课程信息 - 学校-教室-教师展示
      formInline: { // 设置课程信息 - 弹窗数据
        grade: '',
        project: '',
        teacher: '',
      },
      roomList: [{ // 设置听讲教室列表 - 弹窗数据
        room: '',
        school: '',
        teacher: '',
      }],
      loading: false, // 学校远程搜索
      crossDomain: '2', // 是否跨域
      septumCheck: false, // 隔周排课
      endTime: dayjs().format('YYYY-MM-DD'), // 设置日期范围 - 结束日期初始值
      startTime: dayjs().format('YYYY-MM-DD'), // 设置日期范围 - 开始日期初始值
      limitMin: new Date(new Date().setDate(new Date().getDate() - 1)), // 动态设置 - 日期范围的时间最大最小范围
      limitMax: (new Date().getTime() + 180 * 24 * 3600 * 1000), // 未来6个月 ,
      pickerOptions: { // 日期控件范围参数
        disabledDate (time) {
          return (_this.limitMin > time) || time.getTime() > _this.limitMax
        },
      },

      timeList: [], // 添加课程的时间（月日）- 接收父组件
      courseInfo: [], // 上课时间与节次 - 接收父组件
      courseList: [], // 添加的课程列表 - 接收父组件
      gradeOption: [], // 年级数据
      schoolOption: [], // 学校数据
      subjectOption: [], // 学科数据
      teacherOption: [], // 教师数据
      classroomOption: [], // 教室数据
      addCourseParams: {}, // 应用 - 添加、编辑课程提交参数

      dialogVisible: false, // 应用 按钮确定
      infoDialogVisible: false, // 设置课程信息
      roomDialogVisible: false, // 设置听讲教室
      schoolName: ['实验', '初中', '小学', '中学', '高中', '学校', '幼小', '完小', '完中'],
    }
  },
  watch: {
    classData: {
      deep: true,
      immediate: true,
      handler: function (newVal, oldVal) {
        this.classData.length && this.renderTable()
      }
    },
    classRoomId: {
      immediate: true,
      handler: function (newVal, oldVal) {
        this.classRoomId = newVal
      }
    }
  },
  created () {
  },
  methods: {
    /**
     *@Description
     *@Param
     *@Return 初始化 上课时间与节次.
     **/
    renderTable () {
      const tableData = [] // 课表排课信息 - 临时存储数据
      this.classData.forEach((val, i) => { // 循环指定教室上课时间，将上下午节次\时间 - 分开
        let obj = {
          endTime: dayjs(Number(val.endTime)).format('HH:mm'),
          startTime: dayjs(Number(val.startTime)).format('HH:mm'),
        }
        if (val.dayPeriod === 'AM') {
          obj.type = '上午'
          obj = { ...val, ...obj }
          tableData.push(obj)
        } else {
          obj.type = '下午'
          obj = { ...val, ...obj }
          tableData.push(obj)
        }
      })
      this.courseInfo = tableData
    },
    /**
     *@Description
     *@Param
     *@Return 设置课程信息、设置听讲教室 -- 设置按钮 -- 事件 监听.
     **/
    handleSetClick (e) {
      if (e === 'info') { // 设置课程信息
        this.infoDialogVisible = true
        this.getGradeSubject('grade') // 加载年级 数据
      } else { // 设置听讲教室
        this.schoolData() // 加载学校 数据
        this.roomDialogVisible = true
      }
    },
    /**
     *@Description
     *@Param
     *@Return 编辑课表 - 年级数据改变时触发学科查询.
     **/
    handleGradeChange (e) {
      this.formInline.grade = e.gradeId
      console.log('年级切换', e, this.formInline)
      this.getGradeSubject('subject')
    },
    /**
     *@Description
     *@Param
     *@Return 编辑课表 - 获取年级、学科.
     **/
    getGradeSubject (type) {
      // console.log('form*****', this.form)
      const params = {
        areaId: this.form.areaId, // 区域ID
        schoolId: this.form.schoolId, // 学校ID
      }
      if (type === 'grade') {
        params.gradeId = ''
        params.type = 'GRADE' // 年级：GRADE 学科：SUBJECT
      } else {
        params.type = 'SUBJECT' // 年级：GRADE 学科：SUBJECT
        params.gradeId = this.formInline.grade
      }
      gradeData(params).then(res => {
        if (type === 'grade') {
          this.gradeOption = res
          // console.log('年级查询*****', res)
        } else {
          this.subjectOption = res
          // console.log('学科查询*****', res)
        }
      })
    },
    /**
     *@Description
     *@Param
     *@Return 编辑课表 - 学科 - 数据改变时触发教师查询.
     **/
    handleSubjectChange () {
      this.getTeacherData()
    },
    /**
     *@Description
     *@Param
     *@Return 教师选择框 搜索事件监听.
     **/
    remoteMethodTea (query) {
      if (query.trim().length > 1) {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.getTeacherData(query)
        }, 200)
      } else {
        this.teacherOption = []
      }
    },
    /**
     *@Description
     *@Param
     *@Return 听讲教室 - 教师 - 数据获取.
     **/
    getTeacherData (name, classId) {
      const params = {
        status: 1, // 状态: 0关闭、1正常 必填 全部传空
        userType: 3, // 用户列表类型必填, 1：是区域管理员、2：是校级管理员、3：是教师、4：是学生、5：是家长
        userName: name, // 姓名
        classId: classId, // 班级Id userType为3,4,5 ,教师,学生和家长时使用
        areaId: this.form.areaId, // 区域Id
        schoolId: this.form.schoolId, // 学校Id
        gradeId: this.formInline.grade, // 年级Id userType为3,4,5 ,教师,学生和家长时使用
        subjectId: this.formInline.project, // 学科Id userType为3教师时使用
      }
      teacherData(params).then(res => {
        this.teacherOption = res
      })
    },
    /**
     *@Description
     *@Param
     *@Return 设置课程信息 确定事件.
     **/
    handleInfoClick (e) {
      if (e === 'determine') {
        if (this.infoData) {
          this.$message.warning('你已经添加过教师，请删除后在设置！')
          return false
        }
        if (this.formInline.grade && this.formInline.project && this.formInline.teacher) {
          this.infoData = this.formInline.grade + '-' + this.formInline.project + '-' + this.formInline.teacher // 设置课程信息
        } else {
          this.$message.warning('请选择年级、学科、教师！')
          return false
        }
        this.infoDialogVisible = false
      } else {
        this.infoDialogVisible = false
      }
    },
    /**
     *@Description
     *@Param
     *@Return 设置听讲教室 弹窗  - 学校、远程搜索函数.
     **/
    remoteMethod (query) {
      if (query.trim().length === 2 && this.schoolName.indexOf(query) > 0) {
        return false
      }
      if (query.trim().length > 1) {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.schoolData(query)
        }, 200)
      } else {
        this.schoolOption = []
      }
    },
    /**
     *@Description
     *@Param
     *@Return 设置听讲教室 弹窗 - 获取学校.
     **/
    schoolData (name) {
      const params = {
        schoolName: name, // 学校名称
        directOnly: false, // 直属校
        platformOnly: false, // 只查询已开通平台的学校
        baseAreaId: this.form.areaId, // 区域ID
        baseSchoolId: this.form.schoolId, // 主讲教室所在学校ID，传的时候可获取该校的关联校
      }
      getSchoolData(params).then(res => {
        console.log('学校mock数据***', res)
        this.schoolOption = res
      })
    },
    /**
     *@Description
     *@Param
     *@Return 设置听讲教室 弹窗 - 学校 change 事件监听.
     **/
    handleSchoolChange (e) {
      console.log('schoolId****', e)
      this.getClassroomData(e) // 教室查询
    },
    /**
     *@Description
     *@Param
     *@Return 设置听讲教室 弹窗 - 获取教室.
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
     *@Return 设置听讲教室 弹窗 - 教室 change 事件监听.
     **/
    handleRoomChange (e) {
      this.getTeacherData('', e)
    },
    /**
     *@Description
     *@Param
     *@Return 设置听讲教室 弹窗 - 教师 change 事件监听.
     **/
    handleTeaChange (e) {
    },
    /**
     *@Description
     *@Param
     *@Return 设置课程信息、设置听讲教室 - 删除事件.
     **/
    handleDeleteClick (type, index) {
      if (type === 'info') {
        this.infoData = ''
      } else {
        this.roomList.splice(index, 1)
      }
    },
    /**
     *@Description
     *@Param
     *@Return 设置听讲教室 - 添加听讲教室.
     **/
    handleAddRoomClick () {
      const obj = {
        room: '',
        school: '',
        teacher: '',
      }
      this.roomList.push(obj)
    },
    /**
     *@Description
     *@Param
     *@Return 设置听讲教室 弹窗 - 确定 、 取消 按钮事件监听.
     **/
    handleSetRoomClick (type) {
      if (type === 'determine') { // 设置听讲教室 确定按钮
        console.log('roomList****', this.roomList)
        this.roomList.forEach(val => {
          if (this.form.classroom === val.room) {
            this.$message.warning('主讲教室、听讲教室之间都不允许重复！')
            return false
          }
          if (this.formInline.teacher === val.teacher) {
            this.$message.warning('主讲教师、听讲教师之间都不允许重复！')
            return false
          }
        })
        this.roomDialogVisible = true // 设置听讲教室
      } else {
        this.roomDialogVisible = false // 设置听讲教室
      }
    },
    /**
     *@Description
     *@Param
     *@Return 应用、取消事件监听.
     **/
    handleBtnClick (e) {
      if (e === 'app') { // 应用按钮 组合添加课程数据 - 触发弹窗 确认提交
        if (this.infoData === '') {
          this.$message.warning('请设置课程信息！')
          return false
        }
        const weekNum = dayjs(this.endTime).diff(dayjs(this.startTime), 'week') + 1 // 开始时间 与 结束时间 之间的 周数
        const weekArr = [] // 一周课程数组信息
        const allArr = [] // 所有添加课程信息
        this.courseList.forEach((val, ind) => {
          const obj = {
            courseAttentdeeInfo: [{ // 参与方信息 - 接收
              teacherId: '', // 老师ID
              classroomId: '', // 教室ID
            }],
          }
          // const dayIndex = val.split('.')[0] // 取的日 7.1
          const timeIndex = val.split('.')[1] - 1 // 取得时 7.1

          obj.endTime = dayjs(this.startTime).format('YYYY') + '-' + this.timeList[ind].replace('.', '-') + ' ' + this.courseInfo[timeIndex].endTime // 计划结束时间
          obj.startTime = dayjs(this.startTime).format('YYYY') + '-' + this.timeList[ind].replace('.', '-') + ' ' + this.courseInfo[timeIndex].startTime // 计划开始时间
          obj.masterRoomId = this.classRoomId // 主讲教室Id
          obj.bookGradeId = this.formInline.grade // 年级ID
          obj.bookSubjectId = this.formInline.project // 学科ID
          obj.masterTeacherId = this.formInline.teacher // 主讲老师
          this.roomList.map((item, index) => {
            obj.courseAttentdeeInfo[index].classroomId = item.room
            obj.courseAttentdeeInfo[index].teacherId = item.teacher
          })
          weekArr.push(obj)
        })
        const num = this.septumCheck ? 2 : 1
        for (let i = 0; i < weekNum; i += num) {
          weekArr.map(val => {
            const obj = {
              startTime: dayjs(val.startTime).add(7 * i, 'day').format('YYYY-MM-DD HH:mm'),
              endTime: dayjs(val.endTime).add(7 * i, 'day').format('YYYY-MM-DD HH:mm')
            }
            allArr.push({ ...val, ...obj })
          })
        }
        if (allArr.length === 0) {
          this.$message.warning('请先添加课程信息！')
          return false
        }
        this.addCourseParams = { // 课程参数
          holidayFlag: 1, // 假期是否排课 - 1：是、其余值否
          courseDetailInfos: allArr,
          crossDomain: this.crossDomain, // 是否为跨域课 - 1：是、其余值否
        }
        this.dialogVisible = true
      }

      if (e === 'appDetermine') { // 应用 - 弹窗 - 确定按钮
        console.log('添加课程提交参数****', this.addCourseParams)
        addCourse(this.addCourseParams).then(res => {
          console.log('添加*****', res)
          this.$message.success('添加课程成功！')
          this.dialogVisible = false
        })
      }
    },
    /**
     *@Description
     *@Param
     *@Return 父组件 editTable调用 传最大最小时间.
     **/
    getAddCourseData (e, data) {
      const start = e.y + '-' + e.min.replace('.', '-')
      const end = e.y + '-' + e.max.replace('.', '-')
      this.startTime = start
      this.endTime = end
      this.limitMin = new Date(new Date().setDate(new Date(end).getDate() - 1)) // 最小值为当前添加课程的最小时间
      this.limitMax = new Date(end).getTime() + 183 * 24 * 3600 * 1000 // 未来六个月

      this.courseList = data.sort()
      this.timeList = e.timeList
    },
  },
}
</script>

<style lang="scss" scoped>
  /* 课程设置 */
  .cl-set {
    margin-top: 20px;
    li {
      margin-bottom: 25px;
      color: #666;
    }
  }
  /* 课程设置 - 信息列表 */
  .info-list {
    font-size: 12px;
    display: inline-block;
    margin-top: 10px;
    padding: 5px;
    color: #000;
    border-radius: 2px;
    background: #d3e6ff;
    i {
      margin-left: 5px;
      cursor: pointer;
      color: red;
    }
  }
  /* 设置听讲教室 - 弹窗 */
  .cl-room-list {
    li {
      padding: 10px 0;
    }
    li:not(:last-child) {
      border-bottom: 1px dashed #dcdcdc;
    }
    .el-icon-custom-delete {
      font-size: 16px;
      margin-left: 35px;
      cursor: pointer;
    }
  }
  .cl-add-room {
    line-height: 40px;
    height: 40px;
    cursor: pointer;
    text-align: center;
    color: #4c89f2;
    border: 1px dashed #dcdcdc;
  }
  .red {
    color: red;
  }
  .center {
    text-align: center;
  }
  /* 设置日期范围 开始时间 */
  .cl-time {
    width: 221px;
    height: 32px;
    border: solid 1px #b2b7bf;
    border-radius: 2px;
    background-color: #ffffff;
  }
  .start-time {
    width: 80px;
    height: 20px;
    margin: 4px 0 0 10px;
    /deep/ input {
      height: 100%;
      padding: 0;
      color: #999;
      border: none;
    }
  }
  .end-time {
    position: absolute;
    width: 100px;
    height: 20px;
    margin: 4px 0 0 10px;
    /deep/ input {
      height: 100%;
      padding: 0;
      color: #333;
      border: none;
    }
    /deep/ .el-input__prefix {
      top: -10px;
      left: 75px;
    }
  }
</style>
