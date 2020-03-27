<template>
  <div class="role-management">
    <page-header>
      <el-button size="mini" type="custom" class="no-radius" @click="clickBtnAddRole">新增角色</el-button>
    </page-header>
    <el-col :span="24" class="demo-content">
      <div class="table-total">共<span class="blue">{{total}}</span>条数据</div>
      <el-table
        :data="tableData"
        row-class-name="table-body-default"
        header-row-class-name="table-header-default"
        stripe
        row-key="roleId"
        style="width: 100%">
        <el-table-column
          prop="roleName"
          label="角色名称">
        </el-table-column>
        <el-table-column
          width="120"
          prop="bindUserCnt"
          label="绑定用户数"
        >
          <template slot-scope="scope">
            <a type="link" @click="goToUserList(scope.row.frontRoleId)">{{scope.row.bindUserCnt}}</a>
          </template>
        </el-table-column>
        <el-table-column
          width="340"
          label="功能">
          <template slot-scope="scope">
            <span
              :title="permissionNewArray(scope.row.permissionArray)">
              {{permissionNewArray(scope.row.permissionArray)}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          width="250"
          prop="remark"
          label="备注">
          <template slot-scope="scope">
            <span :title="scope.row.remark">{{scope.row.remark}}</span>
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
    </el-col>
    <role-mgt-dialog
      ref="roleDialog"
      :visible.sync="visible"
      :dialog-title="dialogTitle"
      :dialogFunctions="platFunctions"
      @confirmDialogForm="confirmDialogForm">
    </role-mgt-dialog>
  </div>
</template>
<script>
/*
* Description index.vue
* Created By zhangbo and xuqingyu
* Created At 2019.09.24 10:11
*/
import PageHeader from '@/components/personal/PageHeader/index'
import { mapGetters } from 'vuex'
import RoleMgtDialog from './RoleMgtDialog'
import { getRoleFunctions, getRoleList, submitAddRole, submitDeleteRole, submitEditRole } from '@/api/personal/userMgt'

export default {
  name: 'RoleMgt',
  props: {},
  components: { PageHeader, RoleMgtDialog },
  data () {
    return {
      visible: false, // 弹框是否显示
      dialogTitle: '', // 弹框标题
      tableData: [], // 表格数据
      platFunctions: [], // 平台功能项
      pageNum: 1, // 当前页码
      isPaging: true, // 是否分页，true/false
      pageSize: 20, // 每页条数
      total: 0, // 总条数
      rowInfo: {
        roleId: '',
        roleName: '',
        remark: '',
        permissionArray: []
      }, // 行内容
    }
  },
  created () {
    this.initTableData()
    this.searchFunctions()
  },
  computed: { // 在计算属性中获取state中的状态数据，数据改变后会自动更新
    ...mapGetters([
      'basePlatformId', // 平台id
      'userType' // 用户类型
    ])
  },
  methods: {
    /**
     * @description: 跳转到绑定的用户列表
     * @param arguments 描述
     * @returns {}
     */
    goToUserList (id) {
      this.$router.push({ name: 'UserMgt', query: { roleId: id } })
    },
    /**
     * @description:  处理列表——功能列，功能项显示
     * @param value 描述
     * @returns {}
     */
    permissionNewArray (value) {
      const newArray = []
      value.forEach((item) => {
        newArray.push(item.permissionName)
      })
      return newArray.join('、')
    },
    /**
     * @description:  渲染table表格
     * @param arguments 描述
     * @returns {}
     */
    async initTableData () {
      const params = {
        pageNum: this.pageNum,
        basePlatformId: this.basePlatformId,
        pageSize: this.pageSize,
        isPaging: this.isPaging,
      }
      const res = await getRoleList(params)
      this.tableData = res.list
      this.total = res.total
    },
    /**
     * @description: 根据平台id,查询平台功能配置项，弹出层中显示
     * @param arguments 描述
     * @returns {}
     */
    searchFunctions () {
      const platformId = this.basePlatformId
      getRoleFunctions(platformId).then((res) => {
        this.platFunctions = res
      })
    },
    /**
     * @description: 点击新增角色按钮
     * @param arguments 描述
     * @returns {}
     */
    clickBtnAddRole () {
      this.dialogTitle = '新增角色'
      this.rowInfo = {
        roleId: '',
        roleName: '',
        remark: '',
        permissionArray: []
      }
      this.visible = true
      this.$refs.roleDialog.viewContent(this.rowInfo)
    },
    /**
     * @description: 点击编辑角色按钮
     * @param arguments 描述
     * @returns {}
     */
    clickBtnEdit (rowInfo) {
      this.dialogTitle = '编辑角色'
      this.visible = true
      this.$refs.roleDialog.viewContent(rowInfo)
    },
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
        await submitDeleteRole(row.frontRoleId)
        await this.initTableData()
      }).catch(e => console.log('取消', e))
    },
    /**
     * @description: 弹出层点击确定提交按钮--添加/编辑
     * @param ruleForm 描述
     * @returns {}
     */
    async confirmDialogForm (ruleForm) {
      const commonParams = {
        chosedPermission: ruleForm.permissionArray.join(), // 选中的功能，多个以英文逗号分隔
        remark: ruleForm.remark, // 备注
        roleName: ruleForm.roleName, // 角色名称
      }
      const addParams = {
        platformId: this.basePlatformId, // 平台ID
      }
      const editParams = {
        roleId: ruleForm.roleId
      }
      if (ruleForm.roleId) {
        try {
          await submitEditRole({ ...commonParams, ...editParams })
          this.visible = false
          await this.initTableData()
        } catch (e) {
          if (!e.result) {
            this.showMsgBox({
              message: `${e.message}`,
              type: 'warning',
            })
          }
        }
      } else {
        try {
          await submitAddRole({ ...commonParams, ...addParams })
          this.visible = false
          await this.initTableData()
        } catch (e) {
          if (!e.result) {
            this.showMsgBox({
              message: `${e.message}`,
              type: 'warning',
            })
          }
        }
      }
    },
    /**
     * @description: 分页点击页数查询
     * @param val 描述
     * @returns {}
     */
    handleCurrentChange (val) {
      this.pageNum = val
      this.initTableData()
    },
    /**
     * @description: 分页切换查询条数
     * @param val 描述
     * @returns {}
     */
    handleSizeChange (val) {
      this.pageSize = val
      this.initTableData()
    },
  }
}
</script>
<style scoped lang="scss">
  .role-management {
    .table-total {
      font-size: 12px;
      color: #666;
      margin-top: 20px;
      margin-bottom: 10px;
      .blue {
        color: #347eff;
      }
    }

    /deep/ .el-table__row {
      height: 40px;
      .cell {
        white-space: nowrap;
      }
    }

    .pagination-right {
      margin-top: 40px;
      text-align: right;
    }
  }
</style>
