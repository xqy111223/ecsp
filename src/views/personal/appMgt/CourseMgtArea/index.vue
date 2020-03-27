/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.12.03 11:02.
* @Author
* @Description 个人空间 - 应用管理 - 课程管理 - 区域
**/
<template>
  <div class="course-manage-area">
    <!-- 页头 -->
    <page-header></page-header>
    <!-- 查询条件 -->
    <div class="search-area">
      <el-form :inline="true" :model="form" class="demo-form-inline" label-width="85px">
        <el-form-item label="区域：">
          <select-region @change="handleAreaChange" v-model="form.areaId"></select-region>
        </el-form-item>

        <el-form-item label="学校：">
          <select-school :areaId="form.areaId" @handleSchoolChange="handleSchoolChange" v-model="form.masterSchoolId"></select-school>
        </el-form-item>

        <el-form-item label="教室：">
          <el-select @change="handleRoomChange" placeholder="请选择" size="flat" v-model="form.classroomId">
            <el-option :key="item.baseClassroomId" :label="item.roomName" :value="item.baseClassroomId.toString()" v-for="item in classroomOption"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="年级：">
          <el-select @change="handleGradeChange" placeholder="请选择年级" v-model="form.bookGradeId">
            <el-option :key="item.baseKnowledgeId" :value="item" v-for="item in gradeOption">{{ item.customName || item.name }}</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="学科：">
          <el-select @change="handleSubjectChange" placeholder="请选择学科" v-model="form.bookSubjectId">
            <el-option :key="item.baseKnowledgeId" :value="item" v-for="item in subjectOption">{{ item.customName || item.name }}</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="主讲教师：">
          <select-teacher :areaId="form.areaId" :schoolId="form.masterSchoolId" @getSelectedId="handleTeacherChange" v-model="form.masterTeacherId"></select-teacher>
        </el-form-item>

        <el-form-item label="上课模式：">
          <el-select placeholder="请选择" size="flat" v-model="form.modeCount">
            <el-option label="直播课程" value="0"></el-option>
            <el-option label="互动课堂一拖一" value="1"></el-option>
            <el-option label="互动课堂一拖二" value="2"></el-option>
            <el-option label="互动课堂一拖三" value="3"></el-option>
            <el-option label="互动课堂一拖四" value="4"></el-option>
            <el-option label="互动课堂一拖五及以上" value="5"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="授课情况：">
          <el-select placeholder="请选择" size="flat" v-model="form.isvalid">
            <el-option label="有效授课" value="1"></el-option>
            <el-option label="无效授课" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="门户展示：">
          <el-select placeholder="请选择" size="flat" v-model="form.isPlatformDisplay">
            <el-option label="展示" value="1"></el-option>
            <el-option label="不展示" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上课时间：">
          <el-date-picker @change="handleTimeChange" end-placeholder="结束日期" range-separator="至" size="flat" start-placeholder="开始日期" type="daterange"
                          v-model="timeFrame">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="视频时长：">
          <el-input class="w70" placeHolder="分钟" size="flat" v-model="form.durationMin"></el-input>
          —
          <el-input class="w70" placeHolder="分钟" size="flat" v-model="form.durationMax"></el-input>
        </el-form-item>

        <el-form-item label="课程名称：">
          <el-input placeHolder="请输入" size="flat" v-model="form.courseName"></el-input>
        </el-form-item>
        <el-button @click="handleSearchClick" class="mt5" size="mini" type="success">查询</el-button>
      </el-form>
    </div>
    <!-- 查询结果 -->
    <div class="table-total">
      共<span class="blue">{{total}}</span>条数据
      <span class="fr">
          <el-button @click="handleOperationClick('cancel')" class="no-radius ml10" size="mini" type="custom" v-show="showCancel">取消操作</el-button>
          <el-button @click="handleOperationClick('delete')" class="no-radius ml10" size="mini" type="custom" v-show="showDelete">确定删除</el-button>
          <el-button @click="handleOperationClick('exhibition')" class="no-radius ml10" size="mini" type="custom" v-show="showExhibition">确认展示</el-button>
          <el-button @click="handleOperationClick('noShow')" class="no-radius ml10" size="mini" type="custom" v-show="showExhibition">确认不展示</el-button>
          <el-select @visible-change="handleVisibleChange" class="no-radius ml10" size="flat" v-model="batch">
            <el-option label="批量删除" value="0"></el-option><el-option label="批量门户展示" value="1"></el-option>
          </el-select>
        </span>
    </div>
    <!-- 列表 -->
    <el-table :data="list" @selection-change="handleSelectionChange" header-row-class-name="table-header-default" row-class-name="table-body-default" stripe>
      <el-table-column type="selection" v-if="showCheckbox"></el-table-column>

      <el-table-column label="课程名称" width="170px">
        <template slot-scope="scope">
          {{ scope.row.courseName }}
          <el-tooltip class="item" content="门户展示" effect="dark" placement="right">
            <i class="el-icon-custom-portal-display" v-if="scope.row.publicFlag"></i>
          </el-tooltip>
          <el-tooltip class="item" content="课程封面为本地上传图片" effect="dark" placement="right">
            <i class="el-icon-custom-cover" v-if="scope.row.coverType === 'UPLOAD'"></i>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column label="上课时间" prop="realStartTime" width="145px"></el-table-column>

      <el-table-column label="上课时长" width="95px">
        <template slot-scope="scope">
          {{ scope.row.classLength }}
          <el-tooltip class="item" content="无效授课" effect="dark" placement="right">
            <i class="el-icon-custom-invalid-course" v-if="scope.row.isvali"></i>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column label="视频时长" prop="totalDuration"></el-table-column>

      <el-table-column label="年级" prop="gradeBaseName"></el-table-column>

      <el-table-column label="学科" prop="subjectBaseName"></el-table-column>

      <el-table-column label="主讲教师" prop="masterTeacherName"></el-table-column>

      <el-table-column label="主讲学校" prop="masterSchoolName" width="200px"></el-table-column>

      <el-table-column label="听讲学校" prop="allReceiveSchoolName" width="300px"></el-table-column>

      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <a type="btn">点播</a>
          <a @click="handleEditDelClick('edit', scope.row)" type="btn">编辑</a>
          <a @click="handleEditDelClick('delete', scope.row)" color="danger" type="btn" v-if="scope.row.areaOrSchoolAttentdeeType === 'MASTER'">删除</a>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination :current-page.sync="form.pageNum" :hide-on-single-page="true" :page-size="form.pageSize" :page-sizes="[10, 20, 30]" :pager-count="5" :total="total"
                   @current-change="handleCurrentChange" @handleSizeChange="handleSizeChange" background class="pagination" layout="prev, pager, next, sizes, jumper,slot">
      <el-button type="primary">确定</el-button>
    </el-pagination>
    <!-- 编辑弹窗 -->
    <edit-course :dialogVisible="dialogVisible" @getDialog="getDialog" ref="editCourse"></edit-course>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import EditCourse from './EditCourse' // 编辑弹窗
import PageHeader from '@/components/personal/PageHeader/' // 页头
import SelectRegion from '@/components/common/SelectRegion/' // 区域组件
import SelectSchool from '@/components/common/SelectSchool/' // 学校组件
import SelectTeacher from '@/components/common/SelectTeacher/' // 主讲教师组件
import { commentDel, courseMgt, getClassroom, gradeData } from '@/api/personal/appMgt' // 获取教室、年级、学科、课程管理、删除

export default {
  name: 'CourseMgtArea',
  props: {},
  components: { PageHeader, SelectRegion, SelectSchool, SelectTeacher, EditCourse },
  data () {
    return {
      form: {
        areaId: null,
        isvalid: '', // 授课情况：0: 无效、1：有效
        modeCount: '', // 上课模式
        superFlag: 'N', // Y: 大于等于modeCount, N:等于modeCount
        courseName: '', // 课程名称
        durationMin: '', // 视频时长 - 最小
        durationMax: '', // 视频时长 - 最大
        classroomId: '', // 教室id
        bookGradeId: '', // 年级id
        bookSubjectId: '', // 学科id
        masterSchoolId: null, // 主讲学校id
        masterTeacherId: '', // 主讲老师ID
        realStartDateMin: '', // 实际上课时间范围 - 最小
        realStartDateMax: '', // 实际上课时间范围 - 最大
        isPlatformDisplay: '', //  是否门户展示：0：不展示、1：展示

        pageNum: 1, // 当前页数
        pageSize: 10, // 每页显示条数
      },
      pagination: {
        total: 0, // 总数
        pageNum: 1, // 当前页数
        pageSize: 20, // 每页条数
        pageCount: 0, // 总页数
        isPaging: true // 是否分页
      },
      total: 0,
      list: [], // 表格数据
      timeFrame: '', // 上课时间 - 范围
      batch: '批量操作', // 批量操作按钮
      gradeOption: [], // 年级数据
      subjectOption: [], // 学科数据
      classroomOption: [], // 教室数据
      multipleSelection: [], // check选中项
      showCancel: false, // 取消按钮
      showDelete: false, // 删除按钮
      showCheckbox: false, // checkbox 展示与否
      showExhibition: false, // 展示按钮

      dialogVisible: false, // 编辑弹窗
    }
  },
  created () {
    this.getCourseMgt() // 课程
    this.getGradeSubject('grade') // 年级
  },
  methods: {
    /**
     *@Description
     *@Param
     *@Return 查询条件 - 区域事件监听.
     **/
    handleAreaChange () {
      console.log('区域查询***', this.form)
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
      console.log('教室*****', e)
    },
    /**
     *@Description
     *@Param
     *@Return 查询条件 - 年级数据改变时触发学科查询.
     **/
    handleGradeChange () {
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
     *@Return 查询条件 - 学科数据改变时触发主讲教师查询.
     **/
    handleSubjectChange () {
      console.log('学科切换****', this.form)
    },
    /**
     *@Description
     *@Param
     *@Return 主讲教师 事件监听.
     **/
    handleTeacherChange (e) {
      console.log('主讲教师****', e)
    },

    /**
     *@Description
     *@Param
     *@Return 查询条件 - 时间范围.
     **/
    handleTimeChange (e) {
      e ? this.form.realStartDateMin = new Date(e[0]).getTime() : this.form.realStartDateMin = '' // 实际上课时间范围 - 最小
      e ? this.form.realStartDateMax = new Date(e[1]).getTime() : this.form.realStartDateMax = '' // 实际上课时间范围 - 最大
    },
    /**
     *@Description
     *@Param
     *@Return 查询条件 - 查询按钮.
     **/
    handleSearchClick () {
      if (typeof (Number(this.form.durationMin)) === 'number' && typeof (Number(this.form.durationMax)) === 'number') {
        this.getCourseMgt()
      } else {
        this.$message.warning('视频时长请设置为数字！')
        return false
      }
    },
    /**
     *@Description
     *@Param
     *@Return 课程管理 - 数据获取.
     **/
    getCourseMgt () {
      console.log('课程查询参数****', this.form)
      courseMgt(this.form).then(res => {
        res.list.forEach(val => {
          const time = val.realEndTime - val.realStartTime
          val.classLength = this.secondsFormat(time)
          val.totalDuration = this.secondsFormat(val.totalDuration)
          val.realStartTime = dayjs(val.realStartTime).format('YYYY-MM-DD HH:mm')
        })
        this.list = res.list
        console.log('课程管理****', res)
      })
    },
    /**
     *@Description
     *@Param
     *@Return table check 选中项.
     **/
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    /**
     * @description: 点击批量删除按钮——操作表格
     * @param arguments 描述
     * @returns {}
     */
    handleOperationClick (type) {
      console.log(type)
      switch (type) {
        case 'cancel':
          this.batch = '批量操作'
          this.showCancel = false // 取消按钮
          this.showDelete = false // 删除
          this.showCheckbox = false // table checkbox
          this.showExhibition = false // 展示按钮
          break
        case 'delete':
          if (this.multipleSelection.length === 0) {
            this.$message.warning('请选择要删除的课程！')
            return false
          } else {
            this.commentDelete()
          }
          break
        case 'exhibition': // 展示
          console.log('exhibition')
          break
        case 'noShow': // 不展示
          console.log('noShow')
          break
      }
    },
    /**
     *@Description
     *@Param
     *@Return 删除 提示方法.
     **/
    commentDelete (row) {
      const params = {
        commentIdList: []
      }
      if (row) {
        const commentId = row.id
        params.commentIdList.push(commentId)
      } else {
        this.multipleSelection.forEach(val => {
          const commentId = val.id
          params.commentIdList.push(commentId)
        })
      }
      this.showConfirmBox({
        message: '是否确定删除？',
        title: '删除',
        type: 'warning',
        style: 2
      }).then((row) => {
        console.log('params:', params)
        commentDel(params).then(res => {
          this.$message.success('删除成功！')
        })
      }).catch(e => console.log('取消', e))
    },
    /**
     *@Description
     *@Param
     *@Return 批量操作.
     **/
    handleVisibleChange (e) {
      if (!e) {
        this.showCheckbox = true // table checkbox
        this.showCancel = true // 取消按钮
        if (this.batch === '0') {
          this.showDelete = true
          this.showExhibition = false // 展示按钮
        } else {
          this.showDelete = false
          this.showExhibition = true // 展示按钮
        }
      }
    },
    /**
     *@Description
     *@Param
     *@Return 编辑 - 删除 事件监听.
     **/
    handleEditDelClick (type, data) {
      if (type === 'edit') {
        this.$refs.editCourse.getByCourse(data, this.form)
        this.dialogVisible = true
      } else {
        this.commentDelete(data)
      }
      console.log('编辑 - 删除', type, data)
    },
    /**
     *@Description
     *@Param
     *@Return 编辑 弹窗事件.
     **/
    getDialog () {
      this.dialogVisible = false
    },
    /**
     *@Description
     *@Param
     *@Return 数字转时分秒.
     **/
    secondsFormat (sec) {
      let hour = Math.floor(sec / 3600)
      let minute = Math.floor((sec - hour * 3600) / 60)
      let second = sec - hour * 3600 - minute * 60
      if (hour < 10) {
        hour = '0' + hour
      }
      if (minute < 10) {
        minute = '0' + minute
      }
      if (second < 10) {
        second = '0' + second
      }
      return hour + ':' + minute + ':' + second
    },

    /**
     * @description: 点击分页切换查询行数
     * @param arguments 描述
     * @returns {}
     */
    handleSizeChange (val) {
      this.form.pageSize = val
    },
    /**
     * @description: 点击分页查询按钮
     * @param arguments 描述
     * @returns {}
     */
    handleCurrentChange (val) {
      this.form.pageNum = val
    },
  }
}
</script>
<style lang="scss" scoped>
  .course-manage-area {
    i {
      cursor: pointer;
    }
    /deep/ input {
      height: 32px;
      padding: 0 5px;
      border-color: #dcdcdc;
    }
    /deep/ .el-input__suffix {
      top: -2px;
    }
    /deep/ .el-range-editor {
      border-color: #dcdcdc;
    }
    .search-area {
      padding: 18px 0;
      border-bottom: 1px dashed #dcdcdc;
    }
    .w70 {
      width: 70px;
    }
    .table-total {
      font-size: 12px;
      line-height: 24px;
      margin-top: 20px;
      margin-bottom: 10px;
      color: #666;
      .blue {
        color: #347eff;
      }
    }
    .pagination {
      margin: 40px 0;
      text-align: right;
    }
    .mt5 {
      margin-top: 5px;
    }
    .ml10 {
      margin-left: 10px;
    }
    .el-icon-custom-portal-display {
      color: #5090ff;
    }
    .el-icon-custom-cover {
      color: #40d688;
    }
    .el-icon-custom-invalid-course {
      color: #ff3b21;
    }
  }
</style>
