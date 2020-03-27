<template>
  <div class="class-teacher-mgt">
    <div class="bread-crumb">
      <span class="mr5">
        <router-link to="/basic_setting/class_mgt">
        班级管理
        </router-link>
      </span>
      >
      <span class="c666 ml5">任课教师管理</span>
    </div>
    <p class="mt10 page-title-warp-2"><span class="color-label font-strong page-title-two">{{classDetail.gradeName + classDetail.className}}教师管理</span>
    </p>
    <div class="table-area">
      <div class="table-total">
        共<span class="blue">{{listData.total}}</span>条数据
        <el-button v-if="classDetail.status===0" size="mini" type="custom" class="no-radius fr" @click="clickAddBtn">
          添加教师
        </el-button>
      </div>
      <el-table
        :data="listData.list"
        row-class-name="table-body-default"
        header-row-class-name="table-header-default"
        stripe
        style="width: 100%">
        <el-table-column
          prop="userName"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="loginName"
          label="用户名"
        >
        </el-table-column>
        <el-table-column
          prop="subjectInfo"
          label="学科">
          <template slot-scope="scope">
            <span v-for="(item, index) in scope.row.subjectInfo" :key="item.subjectId">{{item.subjectCustomName?item.subjectCustomName:item.subjectName }}{{scope.row.subjectInfo.length-1 === index ?'':'、'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="classDetail.status===0"
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <a type="btn" @click="selectedSubject(scope.row)">选择学科</a>
            <a type="btn" @click="removeClass(2,scope.row)">移出班级</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <class-tea-add-dialog
      ref="teaAddDialog"
      :dialog-title="dialogTitle"
      :visible.sync="visible"
      :classSubjectInfo="classSubjectInfo"
      :confirmDialogForm="confirmDialogForm">
    </class-tea-add-dialog>
    <selected-subject-dialog
      dialog-title="选择学科"
      :rowSubjectIds="rowSubjectIds"
      :rowTeacherId="rowTeacherId"
      :confirmDialogForm="confirmSelectedSubject"
      :visible.sync="selectedSubjectVisible">
    </selected-subject-dialog>
  </div>
</template>

<script>
/*
* Description index
* Created By xuqingyu
* Created At 2019/10/15 11:57
*/
import {
  getClassTeacherList,
  queryClassDetail,
  submitAddClassTeacher,
  submitRemoveClassTeacher,
  submitSelectedClassSubject
} from '@/api/personal/basicSetting'
import ClassTeaAddDialog from './ClassTeaAddDialog'
import SelectedSubjectDialog from './SelectedSubjectDialog'
import { mapGetters } from 'vuex'

export default {
  name: 'ClassTeacherMgt',
  props: {},
  components: { ClassTeaAddDialog, SelectedSubjectDialog },
  data () {
    return {
      visible: false,
      selectedSubjectVisible: false,
      selectedSubjectTitle: '',
      dialogTitle: '',
      rowInfo: '',
      queryParams: {
        classId: this.classId,
        isPaging: false,
        schoolId: this.baseSchoolId
      },
      listData: {},
      classDetail: {},
      classSubjectInfo: [],
      rowSubjectIds: [],
      rowTeacherId: 0,
    }
  },
  created () {
    this.initTableData()
    this.initClassDetail()
  },
  computed: {
    classId: function () {
      return +this.$route.params.id
    },
    ...mapGetters([
      'baseSchoolId', // 学校id
    ])
  },
  methods: {
    /**
     * @description: 弹出层，提交——选择学科——确认按钮
     * @param arguments 描述
     * @returns {}
     */
    async confirmSelectedSubject (obj) {
      const params = {
        classId: this.classId,
        subjectInfo: obj.subjectInfo,
        userId: obj.userId,
      }
      await submitSelectedClassSubject(params)
      // this.initTableData()
      this.selectedSubjectVisible = false
    },
    /**
     * @description: 点击——选择学科——按钮
     * @param arguments 描述
     * @returns {}
     */
    selectedSubject (row) {
      this.selectedSubjectVisible = true
      this.rowSubjectIds = []
      row.subjectInfo.forEach(item => {
        this.rowSubjectIds.push(item.subjectId)
      })
      this.rowTeacherId = row.userId
      console.log('选择学科this.rowSubjectIds', this.rowSubjectIds)
      console.log('选择学科this.rowTeacherId', this.rowTeacherId)
    },
    /**
     * @description: 点击把老师——移出班级——按钮
     * @param arguments 描述
     * @returns {}
     */
    removeClass (style, row) {
      this.showConfirmBox({
        message: '确定要将此教师移出班级吗？',
        title: '提示',
        style: style || 0,
        type: 'warning',
      }).then(async () => {
        const params = {}
        params.classId = this.classId
        params.userId = row.userId
        // console.log('移出教师', params)
        await submitRemoveClassTeacher(params)
        // await this.initTableData()
      }).catch(e => console.log('取消', e))
    },
    /**
     * @description: 初始化页面，班级详情查询
     * @param arguments 描述
     * @returns {}
     */
    async initClassDetail () {
      const params = []
      params.push(this.classId)
      this.classDetail = await queryClassDetail(params)
    },
    /**
     * @description: 提交添加教师——点击弹出层确认按钮
     * @param arguments 描述
     * @returns {}
     */
    async confirmDialogForm (params) {
      this.visible = false
      console.log('添加教师params', params)
      await submitAddClassTeacher(params)
      // await this.initTableData()
    },
    /**
     * @description: 点击添加学生按钮，弹出新增弹出层
     * @param arguments 描述
     * @returns {}
     */
    clickAddBtn () {
      this.visible = true
      this.dialogTitle = '添加教师'
    },
    /**
     * @description: 点击搜索区域——initTableData查询按钮
     * @param arguments 描述
     * @returns {}
     */
    clickSearchBtn () {
      this.initTableData()
    },
    /**
     * @description: 初始化表格数据
     * @param arguments 描述
     * @returns {}
     */
    async initTableData () {
      this.listData = await getClassTeacherList(this.queryParams)
      this.listData.list.map(item => {
        this.classSubjectInfo.push(...item.subjectInfo)
      })
    },
  }
}
</script>

<style scoped lang="scss">
  @import "./index.scss";
</style>
