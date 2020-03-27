<template>
  <div class="class-history">
    <div class="bread-crumb">
      <span class="mr5">
        <router-link to="/basic_setting/class_mgt">
        班级管理
        </router-link>
      </span>
      >
      <span class="c666 ml5">历史班级</span>
    </div>
    <p class="mt10 page-title-warp-2"><span class="color-label font-strong page-title-two">历史班级</span></p>
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
        <el-form-item label="状态：">
          <el-select size="flat" v-model="queryParams.status" clearable placeholder="请选择">
            <el-option label="毕业" value="1"></el-option>
            <el-option label="解散" value="2"></el-option>
          </el-select>
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
      </div>
      <el-table
        :data="listData.list"
        row-class-name="table-body-default"
        header-row-class-name="table-header-default"
        style="width: 100%">
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
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===1">毕业</span>
            <span v-if="scope.row.status===2">解散</span>
          </template>
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
          label="操作">
          <template slot-scope="scope">
            <a type="btn" @click="clickBtnDelete(2,scope.row)">删除</a>
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
  </div>
</template>

<script>
/*
* Description ClassHistory
* Created By xuqingyu
* Created At 2019/10/15 11:54
*/
import TeaStuSelected from '@/components/personal/TeaStuSelected/index'
import dayjs from 'dayjs'
import { getGradeClassList, getTeacherList } from '@/api/personal/userMgt'
import { getGradeClassInfoList, submitDeleteClass } from '@/api/personal/basicSetting'
import { mapGetters } from 'vuex'

export default {
  name: 'ClassHistory',
  components: { TeaStuSelected },
  props: {},
  data () {
    return {
      visible: false,
      rowInfo: {},
      queryParams: {
        schoolId: '', // 选填，学校ID
        gradeId: '', // 非必填，年级Id，number
        className: '', // 非必填，登录名称，string
        headTeacherId: '', // 班主任id，number
        isHistory: 1, // 是否历史班级（0：不是。1.是）
        status: '', // isHistrory为1必填,1已毕业,2已解散,传空为全部
        isPaging: true, // 是否分页，true/false
        pageNum: 1, // 必填，页码
        pageSize: 20, // 必填，页大小
      },
      gradeList: [],
      listData: {},
    }
  },
  created () {
    this.initTableData()
    this.initGradeClassList()
  },
  computed: { // 在计算属性中获取state中的状态数据，数据改变后会自动更新
    ...mapGetters([
      'baseSchoolId', // 学校id
    ])
  },
  methods: {
    /**
     * @description: 入学年份时间搓，格式化成年份
     * @param arguments 描述
     * @returns {}
     */
    entryYear (time) {
      return dayjs(time).format('YYYY')
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
      const res = await getTeacherList(params)
      return res.list
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
    },
    /**
     * @description: 点击删除按钮
     * @param row 描述
     * @returns {}
     */
    clickBtnDelete (style, row) {
      this.showConfirmBox({
        message: '是否确定删除？',
        title: '删除',
        type: 'warning',
        style: style || 0
      }).then(async () => {
        await submitDeleteClass(row.schoolClassId)
        this.initTableData()
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
     * @description: 处理table中状态列——内容展示
     * @param  描述
     * @returns {}
     */
    tableStatusView (val) {
      if (val === 1) {
        return '<span class="status-normal">毕业</span>'
      } else if (val === 2) {
        return '<span class="status-closed">解散</span>'
      }
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
  .class-history {
    .mr5{
      margin-right:5px;
    }
    .ml5{
      margin-left:5px;
    }
    .c666{
      color:#888;
    }
    .bread-crumb{
      background-color:#f6f7fb;
      margin:-10px;
      padding-bottom:20px;
    }
    .page-title-warp-2{
      border-bottom:1px solid #eee;
      padding:10px;
    }
    .page-title-two:before{
      display: inline-block;
      height: 4px;
      width: 4px;
      background:#444;
      content: '';
      float:left;
      margin-top:8px;
      margin-right:5px;
    }
    .mt10{
      margin-top:10px;
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
