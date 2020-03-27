<template>
  <div class="user-management">
    <page-header>
      <el-button size="mini" type="custom" class="no-radius" @click="AddUserBtn">新增用户</el-button>
      <el-button size="mini" type="custom" class="no-radius">批量新增</el-button>
    </page-header>
    <div class="search-area">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="70px">
        <el-form-item label="用户名：">
          <el-input size="flat" v-model="formInline.loginName" placeholder="" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input size="flat" v-model="formInline.userName" placeholder="" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色：">
          <el-select size="flat" v-model.number="formInline.roleId" placeholder="请选择" clearable>
            <el-option
              v-for="item in platRoleList"
              :key="item.frontRoleId"
              :label="item.roleName"
              :value="item.frontRoleId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select size="flat" v-model="formInline.status" placeholder="请选择" clearable>
            <el-option label="开启" value="1"></el-option>
            <el-option label="关闭" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="success" @click="clickSearchBtn">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-area">
      <div class="table-total">
        共<span class="blue">{{total}}</span>条数据
        <span class="export-text-btn"><i class="el-icon-custom-export"></i>导出</span>
      </div>
      <el-table
        :data="tableData"
        row-class-name="table-body-default"
        header-row-class-name="table-header-default"
        stripe
        style="width: 100%">
        <el-table-column
          prop="loginName"
          label="用户名">
        </el-table-column>
        <el-table-column
          width="120"
          prop="userName"
          label="姓名"
        >
        </el-table-column>
        <el-table-column
          width="340"
          prop="userRole"
          label="角色">
          <template slot-scope="scope">
            <span :title="tableRoleListArray(scope.row.roleList)">{{tableRoleListArray(scope.row.roleList)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="250"
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1" class="status-normal">正常</span>
            <span v-else class="status-closed">关闭</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="90">
          <template slot-scope="scope">
            <a type="btn" color="primary" @click="clickBtnEdit(scope.row)">编辑</a>
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
        :current-page.sync="pageNum"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        :hide-on-single-page="true"
        :total="total">
        <el-button type="primary">确定</el-button>
      </el-pagination>
    </div>
    <user-mgt-dialog
      ref="userDialog"
      :dialog-title="DialogTitle"
      :visible.sync="visible"
      :platRoleList="platRoleList"
      :rowInfo="rowInfo"
      :confirmDialogForm="confirmDialogForm">
    </user-mgt-dialog>
  </div>
</template>
<script>
/*
* Description index.vue
* Created By zhangbo && xuqingyu
* Created At 2019.09.24 10:10
*/
import PageHeader from '@/components/personal/PageHeader/index'
import UserMgtDialog from './UserMgtDialog'
import { getRoleList, getUserList, submitAddUser, submitDeleteUser, submitEditUser } from '@/api/personal/userMgt'
import { mapGetters } from 'vuex'

export default {
  name: 'UserMgt',
  props: { UserMgtDialog },
  components: { UserMgtDialog, PageHeader },
  data () {
    return {
      visible: false,
      DialogTitle: '', // 弹出层标题
      pageNum: 1, // 页码当前页
      pageSize: 20, // 页行数
      total: 0, // 数据总数
      statusNormal: '', // 正常状态类名
      statusClosed: '', // 关闭状态类名
      formInline: {
        loginName: '', // 登录名
        status: '', // 状态（0正常，1禁用）
        userName: '', // 用户名
        roleId: '', // 查询的角色ID
      },
      tableData: [], // 表格数据
      platRoleList: [], // 平台用户列表
      rowInfo: {}, // 当前行信息
    }
  },
  async created () {
    await this.initPlatRoleList()
    await this.initTableData()
  },
  mounted () {
  },
  computed: {
    ...mapGetters(['userType', 'baseAreaId', 'baseSchoolId', 'basePlatformId']),
  },
  methods: {
    /**
     * @description: 点击删除角色按钮
     * @param row 描述 roleId
     * @returns {}
     */
    clickBtnDelete (style, row) {
      this.showConfirmBox({
        message: '是否确定删除？',
        title: '删除',
        type: 'warning',
        style: style || 0
      }).then(async () => {
        const params = {
          userIds: row.baseUserId
        }
        await submitDeleteUser(params)
        await this.initTableData()
      }).catch(e => console.log('取消', e))
    },
    /**
     * @description: 点击编辑用户——行信息
     * @param rowInfo 行信息
     * @returns {}
     */
    // async clickBtnEdit (row) {
    //   const res = await getUserDetailInfo(row.baseUserId)
    //   this.rowInfo = { ...this.rowInfo, ...res }
    //   this.dialogTitle = '编辑用户'
    //   this.visible = true
    // },
    clickBtnEdit (rowInfo) {
      this.DialogTitle = '编辑用户'
      this.visible = true
      this.rowInfo = { ...this.rowInfo, ...rowInfo }
      console.log('this.rowInfo', this.rowInfo)
      this.$refs.userDialog.viewContent(this.rowInfo)
    },
    /**
     * @description: 弹出层确认提交按钮
     * @param arguments 描述
     * @returns {}
     */
    async confirmDialogForm (ruleForm) {
      const commonParams = {
        roleList: ruleForm.roleList, // 选中的功能，多个以英文逗号分隔
        loginName: ruleForm.loginName, // 用户名
        userName: ruleForm.userName, // 用户姓名
        phone: ruleForm.phone,
        mobile: ruleForm.mobile,
        email: ruleForm.email,
        status: ruleForm.status || 1,
        remark: ruleForm.remark, // 备注
        userType: this.userType,
        platformId: this.basePlatformId
      }
      const addParams = {
        password: ruleForm.password,
      }
      const editParams = {
        userId: ruleForm.baseUserId,
        password: ruleForm.password2,
      }
      if (ruleForm.baseUserId) {
        // console.log("编辑", { ...commonParams, ...editParams } )
        await submitEditUser({ ...commonParams, ...editParams })
        this.visible = false
        await this.initTableData()
      } else {
        debugger
        console.log('新增', { ...commonParams, ...editParams })
        await submitAddUser({ ...commonParams, ...addParams })
        this.visible = false
        await this.initTableData()
      }
    },
    /**
     * @description: 点击新增用户按钮
     * @param arguments 描述
     * @returns {}
     */
    AddUserBtn () {
      this.DialogTitle = '新增用户'
      this.rowInfo = {}
      this.rowInfo.userName = ''
      this.rowInfo.loginName = ''
      this.rowInfo.baseUserId = ''
      this.rowInfo.status = ''
      this.rowInfo.email = ''
      this.rowInfo.phone = ''
      this.rowInfo.mobile = ''
      this.rowInfo.remark = ''
      this.rowInfo.roleList = []
      this.visible = true
      this.$refs.userDialog.viewContent(this.rowInfo)
    },
    /**
     * @description: 点击分页切换查询行数
     * @param arguments 描述
     * @returns {}
     */
    handleSizeChange (val) {
      this.pageSize = val
      this.initTableData()
    },
    /**
     * @description: 点击分页查询按钮
     * @param arguments 描述
     * @returns {}
     */
    handleCurrentChange (val) {
      this.pageNum = val
      this.initTableData()
    },
    /**
     * @description: 点击用户管理搜索区域的查询按钮
     * @param  描述
     * @returns {}
     */
    clickSearchBtn () {
      this.initTableData()
    },
    /**
     * @description: 处理table中角色列——文字的展示
     * @param value 描述
     * @returns {}
     */
    tableRoleListArray (value) {
      const roleListArray = []
      value && value.forEach((item) => {
        roleListArray.push(item.roleName)
      })
      return roleListArray.join('、')
    },
    /**
     * @description: 查询表格数据
     * @param arguments 描述
     * @returns {}
     */
    async initTableData () {
      const params = {
        isPaging: true,
        loginName: this.formInline.loginName,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        roleId: this.formInline.roleId,
        status: this.formInline.status,
        userName: this.formInline.userName,
        userType: this.userType,
        basePlatformId: this.basePlatformId,
      }
      console.log('initTableData-params', params)
      const res = await getUserList(params)
      this.tableData = res.list
      this.total = res.total
    },
    /**
     * @description: 根据平台id,查询角色列表
     * @param arguments 描述
     * @returns {}
     */
    async initPlatRoleList () {
      const params = {
        basePlatformId: this.basePlatformId,
        isPaging: false,
        pageNum: 0,
        pageSize: 0
      }
      const result = await getRoleList(params)
      this.platRoleList = result.list
      if (this.$route.query.roleId) {
        this.formInline.roleId = Number(this.$route.query.roleId)
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .user-management {
    .margin-10 {
      margin: auto 10px;
    }

    .fr {
      float: right;
    }

    .table-total {
      font-size: 12px;
      color: #666;
      margin-top: 20px;
      margin-bottom: 10px;

      .blue {
        color: #347eff;
      }
    }

    .search-area {
      @extend .margin-10;
      padding-top: 20px;
      border-bottom: 1px dashed #dcdcdc;
    }

    .table-area {
      @extend .margin-10;

      .export-text-btn {
        @extend .fr;
        font-size: 14px;
        color: #666;
        cursor: pointer;

        .iconfont {
          font-size: 14px;
          margin-right: 5px;
          color: #999;
        }
      }
    }

    /deep/ .el-table__row {
      height: 40px;

      .cell {
        white-space: nowrap;
      }

      .status-normal, .status-closed {
        position: relative;
        padding-left: 10px;
      }

      .status-normal::before, .status-closed::before {
        position: absolute;
        left: 0;
        top: 50%;
        display: inline-block;
        margin-top: -3px;
        width: 6px;
        height: 6px;
        content: '';
        background-color: #61ca93;
        border-radius: 3px;
      }

      .status-closed::before {
        background-color: #BBB;
      }
    }

    .pagination-right {
      margin-top: 40px;
      text-align: right;
    }
  }
</style>
