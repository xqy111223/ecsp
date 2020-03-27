<template>
  <div class="parent-mgt">
    <page-header>
      <el-button size="mini" type="custom" class="no-radius" @click="clickBtnAdd">新增家长</el-button>
      <el-button size="mini" type="custom" class="no-radius">批量新增</el-button>
    </page-header>
    <div class="search-area">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline" label-width="85px">
        <el-form-item label="用户名：">
          <el-input size="flat" v-model="queryParams.loginName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="家长姓名：">
          <el-input size="flat" v-model="queryParams.userName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="学生姓名：">
          <el-input size="flat" v-model="queryParams.stuName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="年级班级：">
          <el-cascader
            class="class-level-cascader"
            v-model="queryParams.gradeArr"
            placeholder="请选择"
            size="flat"
            :options="gradeList">
          </el-cascader>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select size="flat" v-model="queryParams.status" placeholder="请选择">
            <el-option label="开启" value="0"></el-option>
            <el-option label="关闭" value="1"></el-option>
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
      </div>
      <el-table
        :data="listData.list"
        row-class-name="table-body-default"
        header-row-class-name="table-header-default"
        stripe
        style="width: 100%">
        <el-table-column
          prop="loginName"
          label="用户名">
        </el-table-column>
        <el-table-column
          width="100"
          prop="userName"
          label="家长姓名"
        >
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
          width="150"
          prop=""
          label="学生姓名">
          <template slot-scope="scope">
            <p v-for="item in scope.row.gradeClassInfo" :key="item.stuId">
              {{ item.stuName }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          prop=""
          label="年级">
          <template slot-scope="scope">
            <p v-for="item in scope.row.gradeClassInfo" :key="item.schoolClassId">
              {{ item.gradeName }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          width="150"
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
    </div>
    <parent-mgt-dialog
      :visible.sync="visible"
      :dialog-title="dialogTitle"
      :row-info="rowInfo"
      :confirmDialogForm="confirmDialogForm"
    ></parent-mgt-dialog>
  </div>
</template>
<script>
/*
* Description index
* Created By xuqingyu
* Created At 2019/10/15 11:28
*/
import PageHeader from '@/components/personal/PageHeader/index'
import { mapGetters } from 'vuex'
import {
  getGradeClassList,
  getParentList,
  getUserDetailInfo,
  submitAddParent,
  submitDeleteParent,
  submitEditParent
} from '@/api/personal/userMgt'
import ParentMgtDialog from './ParentMgtDialog'

export default {
  name: 'ParentMgt',
  props: {},
  components: { ParentMgtDialog, PageHeader },
  data () {
    return {
      visible: false,
      dialogTitle: '',
      queryParams: {
        basePlatformId: '', // 平台Id
        classId: '', // 非必填，班级Id
        gradeId: '', // 非必填，年级Id
        loginName: '', // 非必填，登录名称
        userName: '', // 非必填，用户名
        stuName: '', // 学生姓名
        status: '', // 非必填，0：正常，1关闭
        isPaging: true, // 是否分页，true/false
        pageNum: 1, // 必填，页码
        pageSize: 20, // 必填，页大小
        userType: 5, // 用户类型,必填,1是区域管理员,2是校级管理员,3是教师,4是学生,5是家长,全部传空
        gradeArr: [], // 级联筛选框年级班级数组
      },
      gradeList: [],
      listData: {},
      rowInfo: {}
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
     * @description: 点击删除家长按钮
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
        submitDeleteParent(row.userId)
      }).catch(e => console.log('取消', e))
    },
    /**
     * @description: 家长管理-弹出层表单提交——添加家长Or编辑家长——确定按钮
     * @param arguments 描述
     * @returns {}
     */
    async confirmDialogForm (ruleForm) {
      const params = {}
      params.userType = 4
      params.platformId = this.basePlatformId
      params.userId = ruleForm.baseUserId
      if (ruleForm.baseUserId) {
        params.password = ruleForm.password
        // console.log('编辑', { ...params, ...ruleForm })
        await submitEditParent({ ...params, ...ruleForm })
      } else {
        params.password = ruleForm.password2
        // console.log('添加', { ...params, ...ruleForm })
        await submitAddParent({ ...ruleForm, ...params })
      }
      this.initTableData()
      this.visible = false
    },
    /**
     * @description: 点击——编辑家长——按钮
     * @param row 描述
     * @returns {}
     */
    async clickBtnEdit (row) {
      const res = await getUserDetailInfo(row.baseUserId)
      this.rowInfo = { ...this.rowInfo, ...res }
      this.dialogTitle = '编辑家长'
      this.visible = true
    },
    /**
     * @description: 点击——新增家长——按钮
     * @param arguments 描述
     * @returns {}
     */
    clickBtnAdd () {
      this.dialogTitle = '新增家长'
      this.visible = true
      this.rowInfo.baseUserId = ''
      this.rowInfo.loginName = ''
      this.rowInfo.userName = ''
      this.rowInfo.password = ''
      this.rowInfo.stuLoginName = []
      this.rowInfo.gradeClassInfo = []
      this.rowInfo.mobile = ''
      this.rowInfo.email = ''
      this.rowInfo.remark = ''
      this.rowInfo.status = ''
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
      const params = { ...this.queryParams }
      this.listData = await getParentList(params)
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
  .parent-mgt {
    /deep/ .el-cascader .el-input {
      width: 150px;
    }
    .margin-10{
      margin:auto 10px;
    }
    .fr{
      float:right;
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
