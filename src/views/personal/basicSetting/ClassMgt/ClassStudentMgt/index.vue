<template>
  <div class="class-student-mgt">
    <div class="bread-crumb">
      <span class="mr5">
        <router-link to="/basic_setting/class_mgt">
        班级管理
        </router-link>
      </span>
      >
      <span class="c666 ml5">学生管理</span>
    </div>
    <p class="mt10 page-title-warp-2"><span class="color-label font-strong page-title-two">{{classDetail.gradeName + classDetail.className}}学生管理</span>
    </p>
    <div class="search-area">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline" label-width="85px">
        <el-form-item>
          <el-input size="flat-large" v-model="queryParams.userName" placeholder="学生/用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="success" @click="clickSearchBtn">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-area">
      <div class="table-total">
        共<span class="blue">{{listData.total}}</span>条数据
        <el-button v-if="classDetail.status===0" size="mini" type="custom" class="no-radius fr" @click="clickAddBtn">
          添加学生
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
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1" class="status-normal">开启</span>
            <span v-if="scope.row.status === 0" class="status-closed">关闭</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="classDetail.status===0"
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <a type="btn" v-if="scope.row.isClassMonitor===0" @click="clickSetClassMonitor(2,scope.row)">设为班长</a>
            <a type="btn" v-if="scope.row.isClassMonitor===1" @click="clickSetClassMonitor(2,scope.row)">取消班长</a>
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
    <class-stu-add-dialog
      ref="stuAddDialog"
      :dialog-title="dialogTitle"
      :visible.sync="visible"
      :classId="classId"
      :confirmDialogForm="confirmDialogForm">
    </class-stu-add-dialog>
  </div>
</template>

<script>
/*
* Description index
* Created By xuqingyu
* Created At 2019/10/15 11:55
*/
import ClassStuAddDialog from './ClassStuAddDialog'
import {
  getClassStudentList,
  queryClassDetail,
  submitAddClassStudent,
  submitSetClassMonitor
} from '@/api/personal/basicSetting'

export default {
  name: 'ClassStudentMgt',
  props: {},
  components: { ClassStuAddDialog },
  data () {
    return {
      visible: false,
      dialogTitle: '',
      queryParams: {
        userName: '',
        isPaging: true, // 是否分页，true/false
        pageNum: 1, // 必填，页码
        pageSize: 20, // 必填，页大小
      },
      listData: {},
      classDetail: {}
    }
  },
  computed: {
    classId: function () {
      return +this.$route.params.id
    }
  },
  created () {
    this.initClassDetail()
    this.initTableData()
  },
  methods: {
    async confirmDialogForm (params) {
      await submitAddClassStudent(params)
      await this.initTableData()
      this.visible = false
    },
    /**
     * @description: 点击添加学生按钮，弹出新增弹出层
     * @param arguments 描述
     * @returns {}
     */
    clickAddBtn () {
      this.visible = true
      this.dialogTitle = '添加学生'
    },
    /**
     * @description: 点击设为班长
     * @param style 描述
     * @returns {}
     */
    clickSetClassMonitor (style, row) {
      let msg = ''
      if (row.isClassMonitor === 1) {
        msg = '取消班长'
      } else {
        msg = '设为班长'
      }
      this.showConfirmBox({
        message: msg,
        title: '提示',
        style: style || 0
      }).then(async () => {
        const params = {}
        params.classId = this.classId
        params.isClassMonitor = row.isClassMonitor
        params.userId = row.userId
        console.log('设为班长', params)
        await submitSetClassMonitor(params)
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
     * @description: 初始化表格数据
     * @param arguments 描述
     * @returns {}
     */
    async initTableData () {
      const params = this.queryParams
      this.listData = await getClassStudentList(params)
    },
    async initClassDetail () {
      const params = []
      params.push(this.classId)
      this.classDetail = await queryClassDetail(params)
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
  @import "./index.scss";
</style>
