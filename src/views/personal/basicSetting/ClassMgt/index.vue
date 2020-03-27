<template>
  <div class="class-mgt">
    <page-header>
      <el-button size="medium" type="primary" @click="goToHistoryClass">历史班级</el-button>
      <el-button size="mini" type="custom" class="no-radius" @click="clickAddBtn">新增班级</el-button>
      <el-button size="mini" type="custom" class="no-radius">批量导入班级</el-button>
    </page-header>
    <div class="search-area">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline" label-width="85px">
        <el-form-item label="年级：">
          <el-select clearable size="flat" v-model="queryParams.gradeId" placeholder="请选择">
            <el-option v-for="item in gradeList" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级名称：">
          <el-input size="flat" v-model="queryParams.className" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="班主任：">
          <tea-stu-selected
            :getSearchList="getHeadTeacherList"
            @getSelectedUserId='getHeadTeacherId'
          >
          </tea-stu-selected>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="success" @click="clickSearchBtn">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-area">
      <div class="table-total">
        共<span class="blue">{{listData.total}}</span>条数据
        <a type="btn" class="auto-upgrade-text" @click="clickAutoUpgrade"><i
          class="el-icon-custom-set-automatic-upgrade"></i>自动升级设置</a>
        <span class="upgrade-info" v-if="upgradeInfo.upgradeTime !== ''">
          下次班级自动升级时间为：{{formatTime(upgradeInfo.upgradeTime)}}
          <a type="link" @click="cancelUpgrade(2)">取消</a>
        </span>
        <el-button size="mini" type="custom" class="no-radius fr pl-delete-btn" v-if="!showSelection"
                   @click="clickBtnBatchUpdate">批量升级
        </el-button>
        <el-button size="mini" type="custom" class="no-radius fr pl-delete-btn" v-if="showSelection"
                   @click="batchUpdateSubmit">确认升级
        </el-button>
        <el-button size="mini" type="custom" class="no-radius fr pl-delete-btn" v-if="showSelection" @click="clickBtnCancle">取消操作</el-button>
      </div>
      <el-table
        :data="listData.list"
        row-class-name="table-body-default"
        header-row-class-name="table-header-default"
        stripe
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          v-if="showSelection"
          width="35">
        </el-table-column>
        <el-table-column
          prop="startYear"
          label="入学年份">
          <template slot-scope="scope">
            <span>{{entryYear(scope.row.startYear)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="gradeName"
          label="年级"
        >
        </el-table-column>
        <el-table-column
          prop="className"
          label="班级名称">
        </el-table-column>
        <el-table-column
          prop="headTeacherName"
          label="班主任">
        </el-table-column>
        <el-table-column
          prop="teachTeacherCnt"
          label="任课教师数">
          <template slot-scope="scope">
            <a type="link" @click="goTeacherMgt(scope.row.schoolClassId)">{{scope.row.teachTeacherCnt}}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="studentNum"
          label="学生数">
          <template slot-scope="scope">
            <a type="link" @click="goStudentMgt(scope.row.schoolClassId)">{{scope.row.studentNum}}</a>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <a type="btn" @click="clickBtnEdit(scope.row)">编辑</a>
            <a type="btn" @click="clickUpgrade(2,scope.row)">升级</a>
            <a type="btn" @click="clickBtnDismiss(2,scope.row)" color="danger">解散</a>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination-right"
        background layout="prev, pager, next, sizes, jumper,slot"
        :pager-count="5"
        @current-change="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
        :current-page.sync="queryParams.pageNum"
        :page-size="queryParams.pageSize"
        :page-sizes="[10, 20, 30]"
        :hide-on-single-page="true"
        :total="listData.total">
        <el-button type="primary">确定</el-button>
      </el-pagination>
    </div>
    <class-mgt-dialog
      ref="gradeMgtDialog"
      :dialog-title="dialogTitle"
      :visible.sync="visible"
      :rowInfo="rowInfo"
      :gradeList="gradeList"
      :getSearchList="getHeadTeacherList"
      :confirmDialogForm="confirmDialogForm"
    >
    </class-mgt-dialog>
    <setting-update-dialog
      dialog-title="自动升级设置"
      :confirmDialogForm="confirmAtuoUpdate"
      :upgradeInfo="upgradeInfo"
      :visible.sync="updateVisible">
    </setting-update-dialog>
  </div>
</template>

<script>
/*
* Description index
* Created By xuqingyu
* Created At 2019/10/15 13:38
*/
import PageHeader from '@/components/personal/PageHeader/index'
import TeaStuSelected from '@/components/personal/TeaStuSelected/index'
import SettingUpdateDialog from './SettingUpdateDialog'
import dayjs from 'dayjs'
import { getGradeClassList, getTeacherList } from '@/api/personal/userMgt'
import {
  getAutoUpgradeInfo,
  getGradeClassInfoList,
  submitAddOrEditClass,
  submitCancelAutoUpgrade,
  submitDismissClass,
  submitSetAutoUpgrade,
  submitUpgradeClass
} from '@/api/personal/basicSetting'
import ClassMgtDialog from './ClassMgtDialog'
import { mapGetters } from 'vuex'

export default {
  name: 'ClassMgt',
  components: { ClassMgtDialog, PageHeader, TeaStuSelected, SettingUpdateDialog },
  props: {},
  data () {
    return {
      showSelection: false, // 筛选列是否显示，默认开始不显示
      visible: false,
      updateVisible: false,
      dialogTitle: '',
      rowInfo: {},
      queryParams: {
        schoolId: '', // 选填，学校ID
        gradeId: '', // 非必填，年级Id，number
        className: '', // 非必填，登录名称，string
        headTeacherId: '', // 班主任id，number
        isHistory: 0, // 是否历史班级（0：不是。1.是）
        isPaging: true, // 是否分页，true/false
        pageNum: 1, // 必填，页码
        pageSize: 20, // 必填，页大小
      },
      gradeList: [],
      listData: {},
      multipleSelection: [],
      keyWords: ['老师'],
      upgradeInfo: {
        baseSchoolId: '',
        upgradeTime: '',
        upgradeType: ''
      },
    }
  },
  created () {
    this.initTableData()
    this.initGradeClassList()
    this.getUpgradeInfo()
  },
  computed: { // 在计算属性中获取state中的状态数据，数据改变后会自动更新
    ...mapGetters([
      'baseSchoolId', // 学校id
    ])
  },
  methods: {
    /**
     * @description: 跳转到历史班级
     * @param arguments 描述
     * @returns {}
     */
    goToHistoryClass () {
      this.$router.push({ name: 'ClassHistory' })
    },
    /**
     * @description: 点击取消升级更新按钮——取消升级
     * @param arguments 描述
     * @returns {}
     */
    async cancelUpgrade (style) {
      this.showConfirmBox({
        message: '确定取消自动升级吗？',
        title: '提示',
        style: style || 0
      }).then(async () => {
        const params = {
          baseSchoolId: this.baseSchoolId
        }
        console.log('确定取消升级parmas', params)
        await submitCancelAutoUpgrade(params)
        await this.getUpgradeInfo()
      }).catch(e => console.log('取消', e))
    },
    /**
     * @description: 基础设置-班级管理-获取自动升级信息
     * @param arguments 描述
     * @returns {}
     */
    async getUpgradeInfo () {
      const params = {
        baseSchoolId: this.baseSchoolId
      }
      this.upgradeInfo = await getAutoUpgradeInfo(params)
    },
    /**
     * @description: 基础设置-班级管理-设置自动升级,提交自动升级
     * @param arguments 描述
     * @returns {}
     */
    async confirmAtuoUpdate (obj) {
      const params = {
        baseSchoolId: this.baseSchoolId,
        upgradeTime: obj.upgradeTime,
        upgradeType: obj.upgradeType
      }
      console.log('设置自动升级params', params)
      await submitSetAutoUpgrade(params)
      await this.getUpgradeInfo()
      this.updateVisible = false
    },
    /**
     * @description: 点击设置自动升级设置——点击按钮
     * @param arguments 描述
     * @returns {}
     */
    clickAutoUpgrade () {
      this.updateVisible = true
    },
    /**
     * @description: 提交——新增/编辑班级里弹出层——确定按钮
     * @param arguments 描述
     * @returns {}
     */
    async confirmDialogForm (ruleForm) {
      // const params = { ...ruleForm }
      const params = ruleForm
      console.log('params', params)
      await submitAddOrEditClass(params)
      await this.initTableData()
      this.visible = false
    },
    /**
     * @description: 获取筛选框里班主任id
     * @param val 描述
     * @returns {}
     */
    getHeadTeacherId (val) {
      this.queryParams.headTeacherId = val
      console.log('this.queryParams.headTeacherId', this.queryParams.headTeacherId)
    },
    /**
     * @description: 班主任selected框，搜索班主任列表
     * @param arguments 描述
     * @returns {}
     */
    async getHeadTeacherList (val) {
      console.log('val', val)
      const params = {}
      params.schoolId = this.baseSchoolId
      params.gradeId = this.queryParams.gradeId
      params.userName = val
      if (val !== '老师') {
        const res = await getTeacherList(params)
        return res.list
      } else {
        const res = await getTeacherList(params)
        return res.list
      }
    },
    /**
     * @description: 点击编辑教师按钮——弹出弹出层
     * @param arguments 描述
     * @returns {}
     */
    clickBtnEdit (row) {
      this.rowInfo.classId = row.schoolClassId
      this.rowInfo.className = row.className
      this.rowInfo.gradeId = row.gradeId
      this.rowInfo.gradeName = row.gradeName
      this.rowInfo.joinYear = row.startYear
      this.rowInfo.gradeeYear = row.endYear
      this.rowInfo.headTeacherId = row.headTeacherId
      this.rowInfo.headTeacherLoginName = row.headTeacherLoginName
      this.dialogTitle = '编辑班级'
      this.visible = true
      this.$refs.gradeMgtDialog.viewContent(this.rowInfo)
    },
    /**
     * @description: 点击新增班级按钮，弹出新增弹出层
     * @param arguments 描述
     * @returns {}
     */
    clickAddBtn () {
      this.visible = true
      this.dialogTitle = '新增班级'
      this.rowInfo.classId = ''
      this.rowInfo.className = ''
      this.rowInfo.gradeId = ''
      this.rowInfo.gradeName = ''
      this.rowInfo.joinYear = ''
      this.rowInfo.gradeeYear = ''
      this.rowInfo.headTeacherId = ''
      this.rowInfo.headTeacherLoginName = ''
      this.$refs.gradeMgtDialog.viewContent(this.rowInfo)
    },
    /**
     * @description: 跳转学生管理——路径方法
     * @param arguments 描述
     * @returns {}
     */
    goStudentMgt (id) {
      this.$router.push({ name: 'ClassStudentMgt', params: { id } })
    },
    /**
     * @description: 跳转教师管理——路径方法
     * @param arguments 描述
     * @returns {}
     */
    goTeacherMgt (id) {
      this.$router.push({ name: 'ClassTeacherMgt', params: { id } })
      // 路由跳转不使用路径，用组件名name
      // this.$router.push({ path: `/basic_setting/class_mgt/class_teacher_mgt/${id}` })
    },
    /**
     * @description: 入学年份时间搓，格式化成年份
     * @param arguments 描述
     * @returns {}
     */
    entryYear (time) {
      return dayjs(time).format('YYYY')
    },
    /**
     * @description: 格式化时间搓
     * @param arguments 描述
     * @returns {}
     */
    formatTime (time) {
      return dayjs(time).format('YYYY-MM-DD hh:mm')
    },
    /**
     * @description: 监测selection筛选框的改变
     * @param arguments 描述
     * @returns {}
     */
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    /**
     * @description: 点击取消-批量升级按钮——取消操作
     * @param arguments 描述
     * @returns {}
     */
    clickBtnCancle () {
      this.showSelection = false
      this.initTableData() // 取消选中框
    },
    /**
     * @description: 点击批量升级确认升级按钮——提交批量升级
     * @param arguments 描述
     * @returns {}
     */
    async batchUpdateSubmit () {
      console.log('this.multipleSelection', this.multipleSelection)
      const params = {}
      params.schoolId = this.baseSchoolId
      params.classIds = this.multipleSelection.map((item) => item.schoolClassId)
      console.log('批量升级', params)
      if (params.classIds.length === 0) {
        // 请选择要升级的班级
        this.showConfirmBox({
          message: '请选择要升级的班级',
          title: '提示',
          style: 0
        }).then(() => {}).catch(e => console.log('取消', e))
      } else {
        this.showConfirmBox({
          message: '确定要对所选择的班级进行升级吗？',
          title: '提示',
          style: 0
        }).then(async () => {
          await submitUpgradeClass(params)
          await this.initTableData()
        }).catch(e => console.log('取消', e))
      }
    },
    /**
     * @description: 点击批量升级按钮——操作表格
     * @param arguments 描述
     * @returns {}
     */
    clickBtnBatchUpdate () {
      this.showSelection = true
    },
    /**
     * @description: 点击表格——解散按钮
     * @param row 描述
     * @returns {}
     */
    clickBtnDismiss (style, row) {
      this.showConfirmBox({
        message: '确定要解散此班级吗？',
        title: '提示',
        style: style || 0
      }).then(async () => {
        console.log('解散params', row.schoolClassId)
        await submitDismissClass(row.schoolClassId)
        await this.initTableData()
      }).catch(e => console.log('取消', e))
    },
    /**
     * @description: 点击表格——升级按钮
     * @param style 描述
     * @returns {}
     */
    clickUpgrade (style, row) {
      this.showConfirmBox({
        message: '确定要对所选择的班级进行升级吗？',
        title: '提示',
        style: style || 0
      }).then(async () => {
        const params = {}
        params.schoolId = this.baseSchoolId
        params.classIds = []
        params.classIds.push(row.schoolClassId)
        console.log('升级params', params)
        await submitUpgradeClass(params)
        await this.initTableData()
      }).catch(e => console.log('取消', e))
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
     * @description: 获取学校——年级班级列表
     * @param arguments 描述
     * @returns {}
     */
    async initGradeClassList () {
      const params = this.queryParams.schoolId
      this.gradeList = await getGradeClassList(params)
    },
    /**
     * @description: 初始化表格数据
     * @param arguments 描述
     * @returns {}
     */
    async initTableData () {
      const params = this.queryParams
      this.listData = await getGradeClassInfoList(params)
    },
    /**
     * @description: 分页切换查询条数
     * @param val 描述
     * @returns {}
     */
    handleSizeChange (val) {
      this.queryParams.pageSize = val
      this.initTableData()
    },
    /**
     * @description: 分页点击页数查询
     * @param val 描述
     * @returns {}
     */
    handleCurrentChange (val) {
      this.queryParams.pageNum = val
      this.initTableData()
    }
  }
}
</script>

<style scoped lang="scss">
  .class-mgt {
    .upgrade-info {
      color: #888;

      a {
        margin-left: 10px;
      }
    }

    .auto-upgrade-text {
      margin-left: 15px;
      font-size: 12px;
      margin-right: 20px;

      .el-icon-custom-set-automatic-upgrade {
        color: #ff6600;
        font-size: 14px;
        margin-right: 3px;
      }
    }
      /deep/ .el-cascader .el-input {
        width: 150px;
      }
      .margin-10{
        margin:auto 10px;
      }
      .fr{
        float:right;
      }
      .pl-delete-btn{
        margin-top:-12px;
        margin-left: 20px;
      }
      .table-total{
        font-size:12px;
        color:#666;
        margin-top:20px;
        margin-bottom:10px;
        .blue{
          color:#347eff;
        }
      }
      .search-area{
        @extend .margin-10;
        padding-top:20px;
        border-bottom:1px dashed #dcdcdc;
      }
      .table-area{
        @extend .margin-10;
        .export-text-btn{
          @extend .fr;
          font-size:14px;
          color:#666;
          cursor:pointer;
          .iconfont{
            font-size:14px;
            margin-right:5px;
            color:#999;
          }
        }
      }
      /deep/ .el-table__row{
        height:40px;
        .cell{
          /*white-space: nowrap;*/
        }
        .status-normal,.status-closed{
          position: relative;
          padding-left: 10px;
        }
        .status-normal::before,.status-closed::before{
          position: absolute;
          left:0;
          top:50%;
          display: inline-block;
          margin-top:-3px;
          width: 6px;
          height:6px;
          content: '';
          background-color: #61ca93;
          border-radius: 3px;
        }
        .status-closed::before{
          background-color: #BBB;
        }
        a[type=btn]{
          margin:0px 5px;
        }
      }
      .pagination-right{
        margin-top:40px;
        text-align: right;
      }
  }
</style>
