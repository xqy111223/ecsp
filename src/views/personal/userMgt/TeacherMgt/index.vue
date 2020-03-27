<template>
  <div class="teacher-mgt">
    <page-header>
      <el-button size="mini" type="custom" class="no-radius" @click="clickBtnAddTeacher()">新增教师</el-button>
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
          <el-cascader @change="selectGradeClass" :clearable="true" size="flat" :options="gradeClassList"></el-cascader>
        </el-form-item>
        <el-form-item label="学科：">
          <el-select size="flat" clearable v-model="queryParams.subjectId" placeholder="请选择">
            <el-option v-for="item in subjectList" :label="item.subjectName" :value="item.subjectId"
                       :key="item.subjectId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名师：">
          <el-select size="flat" clearable v-model="queryParams.isFamous" placeholder="全部">
            <el-option label="普通教师" value="0"></el-option>
            <el-option label="名师" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select size="flat" clearable v-model="queryParams.status" placeholder="全部">
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
        共<span class="blue">{{listData.total}}</span>条数据
        <span class="export-text-btn"><i class="el-icon-custom-export"></i>导出</span>
        <el-button size="mini" type="custom" class="no-radius fr pl-delete-btn" v-if="!showSelection"
                   @click="clickBtnBatchDelete">批量删除
        </el-button>
        <el-button size="mini" type="custom" class="no-radius fr pl-delete-btn" v-if="showSelection"
                   @click="batchDeleteSubmit">删除
        </el-button>
        <el-button size="mini" type="custom" class="no-radius fr pl-delete-btn" v-if="showSelection"
                   @click="clickBtnCancle">取消操作
        </el-button>
      </div>
      <el-table
        ref="multipleTable"
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
          label="班主任">
          <template slot-scope="scope">
            <div v-for="item in scope.row.gradeClassInfo" :key="item.schoolClassId">
              <p>
                {{item.className + item. gradeName}}
                <el-tag v-if="item.status" :type="item.status === 2 ? 'danger' : 'primary'" class="round">
                  {{item.status === 2 ? '已解散' : '已毕业'}}
                </el-tag>
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="250"
          label="任课信息">
          <template slot-scope="scope">
            <div v-for="item in scope.row.headerSubjectInfo" :key="item.gradeId">
              <p>
                {{item.className + item. gradeName}}
                <el-tag v-if="item.status" :type="item.status === 2 ? 'danger' : 'primary'" class="round">
                  {{item.status === 2 ? '已解散' : '已毕业'}}
                </el-tag>
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="90"
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
          width="180">
          <template slot-scope="scope">
            <a type="btn" @click="clickBtnEdit(scope.row)">编辑</a>
            <a type="btn" @click="clickSetFamous(2,scope.row)">设为名师</a>
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
        :total="listData.total">
        <el-button type="primary">确定</el-button>
      </el-pagination>
      <teacher-mgt-dialog
        ref="roleDialog"
        :visible.sync="visible"
        :dialog-title="dialogTitle"
        :gradeList="gradeList"
        :gradeSubjectList="gradeSubjectList"
        :rowInfo="rowInfo"
        :confirmDialogForm="confirmDialogForm">
      </teacher-mgt-dialog>
    </div>
  </div>
</template>
<script>
/*
* Description index
* Created By xuqingyu
* Created At 2019/10/15 11:26
*/
import PageHeader from '@/components/personal/PageHeader/index'
import TeacherMgtDialog from './TeacherMgtDialog'
import { mapGetters } from 'vuex'
import {
  getGradeClassList,
  getKnowledgeList,
  getUserDetailInfo,
  getUserList,
  setFamousTeacher,
  submitAddUser,
  submitDeleteUser,
  submitEditUser
} from '@/api/personal/userMgt'
import { getKnowledgeListNC } from '@/api/common/index'

export default {
  name: 'TeacherMgt',
  components: { PageHeader, TeacherMgtDialog },
  data () {
    return {
      showSelection: false, // 筛选列是否显示，默认开始不显示
      visible: false,
      dialogTitle: '',
      queryParams: {
        basePlatformId: null,
        userType: 3, // 用户类型,1是区域管理员,2是校级管理员,3是教师,4是学生,5是家长
        classId: '', // 非必填，班级Id
        gradeId: '', // 非必填，年级Id
        loginName: '', // 非必填，用户名
        userName: '', // 非必填，姓名
        subjectId: '', // 非必填，学科ID
        status: null, // 非必填，0：正常，1关闭，全部传空
        isPaging: true, // 是否分页，true/false
        pageNum: 1, // 必填，页码
        pageSize: 20, // 必填，页大小
        isFamous: null, // 是否是名师--userType为3 ,教师时使用,0是普通教师,1是名师,全部传空
      },
      gradeList: [], // 年级列表
      gradeClassList: [], // 年级班级级联列表
      subjectList: [], // 学科列表
      gradeSubjectList: [], // 年级班级学科
      listData: {}, // 表格数据
      multipleSelection: [], // 多选框值
      rowInfo: {
        baseUserId: '',
        userName: '',
        loginName: '',
        password: '',
        mobile: '',
        email: '',
        isFamous: '',
        headerClassId: '',
        headerSubjectId: [],
        remark: '',
        status: '',
        checkFlag: '',
        passwordHolder: ''
      }, // 行信息
    }
  },
  created () {
    this.initTableData()
    this.initGradeClassList()
    this.initSubjectList()
    console.log('role', this.role)
    console.log('baseSchoolId', this.baseSchoolId)
    console.log('baseAreaId', this.baseAreaId)
  },
  computed: { // 在计算属性中获取state中的状态数据，数据改变后会自动更新
    ...mapGetters([
      'basePlatformId', // 平台id
      'baseAreaId', // 区域id
      'baseSchoolId', // 学校id
      'role' // 用户类型
    ])
  },
  methods: {
    /**
     * @description: 筛选年级学科，级联筛选框
     * @param arguments 描述
     * @returns {}
     */
    selectGradeClass (val) {
      this.queryParams.gradeId = val[0]
      this.queryParams.classId = val[1]
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
      await submitDeleteUser(params.join())
      this.initTableData()
    },
    /**
     * @description: 点击批量删除按钮——操作表格
     * @param arguments 描述
     * @returns {}
     */
    clickBtnBatchDelete () {
      this.showSelection = true
    },
    /**
     * @description: 教师管理-弹出层表单提交——添加教师Or编辑教师——确定按钮
     * @param arguments 描述
     * @returns {}
     */
    async confirmDialogForm (ruleForm) {
      debugger
      console.log('xinzhengruleForm', ruleForm)
      let params = {}
      if (!ruleForm.baseUserId) {
        console.log('add', params)
        await submitAddUser(ruleForm)
      } else {
        console.log('edit', params)
        params = { ...ruleForm, userId: ruleForm.baseUserId }
        await submitEditUser(params)
      }
      await this.initTableData()
      this.visible = false
    },
    /**
     * @description: 点击删除教师按钮
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
        await submitDeleteUser(row.baseUserId)
        await this.initTableData()
      }).catch(e => console.log('取消', e))
    },
    /**
     * @description: 点击设为名师按钮
     * @param style 描述
     * @returns {}
     */
    clickSetFamous (style, row) {
      this.showConfirmBox({
        message: '确定设为名师？',
        title: '设为名师',
        style: style || 0
      }).then((row) => {
        const params = {}
        params.userId = row.baseUserId
        params.isFamous = !row.isFamous
        setFamousTeacher(params)
      }).catch(e => console.log('取消', e))
    },
    /**
     * @description: 点击编辑教师按钮——弹出弹出层
     * @param arguments 描述
     * @returns {}
     */
    async clickBtnEdit (rowInfo) {
      this.dialogTitle = '编辑教师'
      this.visible = true
      const res = await getUserDetailInfo({ userIds: rowInfo.baseUserId })
      this.rowInfo = { ...this.rowInfo, ...res[0] }
      console.log('this.rowInfo', this.rowInfo)
    },
    /**
     * @description: 点击添加教师按钮——弹出弹出层
     * @param arguments 描述
     * @returns {}
     */
    clickBtnAddTeacher () {
      this.dialogTitle = '新增教师'
      this.visible = true
      this.rowInfo.baseUserId = ''
      this.rowInfo.userName = ''
      this.rowInfo.loginName = ''
      this.rowInfo.password = ''
      this.rowInfo.mobile = ''
      this.rowInfo.email = ''
      this.rowInfo.isFamous = ''
      this.rowInfo.headerClassId = ''
      this.rowInfo.headerSubjectId = []
      this.rowInfo.headerSubjectInfo = []
      this.rowInfo.gradeClassInfo = []
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
     * @description: 获取知识网络列表——学段、年级、学科、版本、分册列表--不级联
     * @param arguments 学段：SEMESTER 年级：GRADE 学科：SUBJECT 版本：EDITION 分册：VOLUME
     * @returns {}
     */
    async initKnowledgeListNC (type) {
      const params = {
        areaId: this.baseAreaId,
        schoolId: this.baseSchoolId,
        types: type
      }
      const res = await getKnowledgeListNC(params)
      return res
    },
    /**
     * @description: 获取学校——学科列表
     * @param arguments 描述
     * @returns {}
     */
    async initSubjectList () {
      const res = await this.initKnowledgeListNC('SUBJECT')
      this.subjectList = res
    },
    /**
     * @description: 获取知识网络列表——学段、年级、学科、版本、分册列表--级联
     * @param arguments 学段：SEMESTER 年级：GRADE 学科：SUBJECT 版本：EDITION 分册：VOLUME
     * @returns {}
     */
    async initKnowledgeList (type) {
      const params = {
        areaId: this.baseAreaId,
        schoolId: this.baseSchoolId,
        gradeId: null,
        type: type
      }
      const res = await getKnowledgeList(params)
      return res
    },
    /**
     * @description: 获取学校——年级班级列表
     * @param arguments 描述
     * @returns {}
     */
    async initGradeClassList () {
      const res = await this.initKnowledgeList('GRADE')
      for (let i = 0; i < res.length; i++) {
        const item = res[i]
        const classParams = {
          gradeId: item.gradeId,
          isHistory: 0,
          schoolId: this.baseSchoolId,
          status: ''
        }
        const res2 = await getGradeClassList(classParams)
        const classList = []
        for (let j = 0; j < res2.length; j++) {
          classList.push({ value: res2[j].schoolClassId, label: res2[j].className })
        }
        this.gradeClassList.push({
          value: item.gradeId,
          label: item.customName || item.name,
          children: classList,
        })
      }
    },
    /**
     * @description: 初始化表格数据
     * @param arguments 描述
     * @returns {}
     */
    async initTableData () {
      this.queryParams.basePlatformId = this.basePlatformId
      this.listData = await getUserList(this.queryParams)
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
  .teacher-mgt {
    /deep/ .el-cascader .el-input {
      width: 150px;
    }

    .margin-10 {
      margin: auto 10px;
    }

    .fr {
      float: right;
    }

    .pl-delete-btn {
      margin-top: -12px;
      margin-right: 20px;
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
        /*white-space: nowrap;*/
        p {
          margin: 5px 0px;
        }
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

      a[type=btn] {
        margin: 0px 5px;
      }
    }

    .pagination-right {
      margin-top: 40px;
      text-align: right;
    }
  }
</style>
