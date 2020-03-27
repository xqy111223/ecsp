<template>
  <div class="student-mgt">
    <page-header>
      <el-button size="mini" type="custom" class="no-radius" @click="clickBtnAdd">新增学生</el-button>
      <el-button size="mini" type="custom" class="no-radius">批量新增</el-button>
    </page-header>
    <div class="search-area">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline" label-width="85px">
        <el-form-item label="用户名：">
          <el-input size="flat" v-model="queryParams.loginName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input size="flat" v-model="queryParams.userName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="年级班级：">
          <el-cascader
            v-model="queryParams.gradeArr"
            placeholder="请选择"
            size="flat"
            clearable
            :options="gradeList">
          </el-cascader>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select size="flat" v-model="queryParams.status" clearable placeholder="请选择">
            <el-option label="关闭" value="0"></el-option>
            <el-option label="开启" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="success" @click="clickSearchBtn">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-area">
      <div class="table-total">
        共<span class="blue">{{listData.total}}</span>条数据
        <span class="export-text-btn"><i class="el-icon-custom-export"></i>导出</span>
        <el-button size="mini" type="custom" class="no-radius fr pl-delete-btn" v-if="!showSelection"  @click="clickBtnBatchDelete">批量删除</el-button>
        <el-button size="mini" type="custom" class="no-radius fr pl-delete-btn" v-if="showSelection" @click="batchDeleteSubmit">删除</el-button>
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
          prop="loginName"
          label="用户名">
        </el-table-column>
        <el-table-column
          width="100"
          prop="userName"
          label="姓名"
        >
        </el-table-column>
        <el-table-column
          width="180"
          prop=""
          label="年级">
          <template slot-scope="scope">
            <p v-for="item in scope.row.gradeClassInfo" :key="item.schoolClassId">
              {{ item.gradeName }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          width="250"
          prop=""
          label="班级">
          <template slot-scope="scope">
            <p v-for="item in scope.row.gradeClassInfo" :key="item.schoolClassId">
              {{ item.className }}
              <el-tag v-if="item.status" :type="item.status === 2 ? 'danger' : 'primary'" class="round">
                {{item.status === 2 ? '已解散' : '已毕业'}}
              </el-tag>
            </p>
          </template>
        </el-table-column>
        <el-table-column
          width="90"
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0" class="status-normal">正常</span>
            <span v-else class="status-closed">关闭</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <a type="btn" @click="clickBtnEdit(scope.row)">编辑</a>
            <a type="btn" @click="clickBtnDelete(2,scope.row)" color="danger">删除</a>
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
        :total="queryParams.total">
        <el-button type="primary">确定</el-button>
      </el-pagination>
      <student-mgt-dialog
        :visible.sync="visible"
        :dialog-title="dialogTitle"
        :gradeList="gradeList"
        :row-info="rowInfo"
        :confirmDialogForm="confirmDialogForm">
      </student-mgt-dialog>
    </div>
  </div>
</template>

<script>
/*
* Description index
* Created By xuqingyu
* Created At 2019/10/15 11:29
*/
import PageHeader from '@/components/personal/PageHeader/index'
import StudentMgtDialog from './StudentMgtDialog'
import { mapGetters } from 'vuex'
import {
  getGradeClassList,
  getStudentList,
  getUserDetailInfo,
  submitAddStudent,
  submitDeleteStudent,
  submitEditStudent
} from '@/api/personal/userMgt'

export default {
  name: 'StudentMgt',
  props: {},
  components: { PageHeader, StudentMgtDialog },
  data () {
    return {
      showSelection: false, // 筛选列是否显示，默认开始不显示
      visible: false,
      dialogTitle: '',
      queryParams: {
        basePlatformId: '', // 平台Id
        classId: '', // 非必填，班级Id
        gradeId: '', // 非必填，年级Id
        loginName: '', // 非必填，登录名称
        userName: '', // 非必填，用户名
        status: '', // 非必填，0：正常，1关闭
        isPaging: true, // 是否分页，true/false
        pageNum: 1, // 必填，页码
        pageSize: 20, // 必填，页大小
        gradeArr: [], // 级联筛选框年级班级数组
        userType: '', // 用户类型,必填,1是区域管理员,2是校级管理员,3是教师,4是学生,5是家长,全部传空
      },
      gradeList: [],
      listData: {},
      rowInfo: {},
      multipleSelection: []
    }
  },
  created () {
    this.initTableData()
    this.initGradeClassList()
  },
  computed: { // 在计算属性中获取state中的状态数据，数据改变后会自动更新
    ...mapGetters([
      'basePlatformId', // 平台id
      'role' // 用户类型
    ])
  },
  methods: {
    /**
     * @description: 监测selection筛选框的改变
     * @param arguments 描述
     * @returns {}
     */
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    /**
     * @description: 点击取消-批量删除按钮——取消操作
     * @param arguments 描述
     * @returns {}
     */
    clickBtnCancle () {
      this.showSelection = false
      this.$refs.multipleTable.clearSelection()
    },
    /**
     * @description: 点击批量删除确认删除按钮——提交批量删除
     * @param arguments 描述
     * @returns {}
     */
    async batchDeleteSubmit () {
      const params = this.multipleSelection.map((item) => item.baseUserId)
      await submitDeleteStudent(params.join())
      this.initTableData()
    },
    /**
     * @description: 点击批量删除按钮——操作表格——出现筛选框
     * @param arguments 描述
     * @returns {}
     */
    clickBtnBatchDelete () {
      this.showSelection = true
    },
    /**
     * @description: 学生管理-弹出层表单提交——添加学生Or编辑学生——确定按钮
     * @param arguments 描述
     * @returns {}
     */
    async confirmDialogForm (ruleForm) {
      const params = {}
      params.userType = 4
      params.platformId = this.basePlatformId
      params.userId = ruleForm.baseUserId
      if (ruleForm.baseUserId) {
        params.password = ruleForm.password2
        await submitEditStudent({ ...params, ...ruleForm })
      } else {
        params.password = ruleForm.password
        // console.log("新增", { ...ruleForm, ...params })
        await submitAddStudent({ ...ruleForm, ...params })
      }
      this.initTableData()
      this.visible = false
    },
    /**
     * @description: 点击删除学生按钮
     * @param row 描述 roleId
     * @returns {}
     */
    clickBtnDelete (style, row) {
      this.showConfirmBox({
        message: '是否确定删除？',
        title: '删除',
        type: 'warning',
        style: style || 0
      }).then((row) => {
        submitDeleteStudent(row.userId)
      }).catch(e => console.log('取消', e))
    },
    /**
     * @description: 点击编辑学生按钮——弹出弹出层
     * @param arguments 描述
     * @returns {}
     */
    async clickBtnEdit (row) {
      this.dialogTitle = '编辑学生'
      this.visible = true
      this.rowInfo.checkFlag = false
      const res = await getUserDetailInfo(row.baseUserId)
      this.rowInfo = { ...this.rowInfo, ...res }
    },
    /**
     * @description: 点击添加学生按钮——弹出弹出层
     * @param arguments 描述
     * @returns {}
     */
    async clickBtnAdd () {
      this.dialogTitle = '新增学生'
      this.visible = true
      this.rowInfo.baseUserId = ''
      this.rowInfo.loginName = ''
      this.rowInfo.userName = ''
      this.rowInfo.password = ''
      this.rowInfo.stuNo = ''
      this.rowInfo.entranceYear = ''
      this.rowInfo.stuSchoolClassId = ''
      this.rowInfo.mobile = ''
      this.rowInfo.email = ''
      this.rowInfo.remark = ''
      this.rowInfo.status = ''
      this.rowInfo.checkFlag = true
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
      const params = this.basePlatformId
      this.gradeList = await getGradeClassList(params)
    },
    /**
     * @description: 初始化表格数据
     * @param arguments 描述
     * @returns {}
     */
    async initTableData () {
      this.queryParams.basePlatformId = this.basePlatformId
      this.queryParams.classId = this.queryParams.gradeArr[0] || ''
      this.queryParams.gradeId = this.queryParams.gradeArr[1] || ''
      // 查学生
      this.queryParams.userType = 4
      const params = { ...this.queryParams }
      this.listData = await getStudentList(params)
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
  .student-mgt {
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
      margin-right:20px;
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
