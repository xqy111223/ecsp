<template>
  <div class="teacher-statistics">
    <page-header></page-header>
    <div class="search-area">
      <el-form :inline="true" :model="queryParams" class="form-inline" label-width="85px">
        <div>
          <el-form-item v-if="platformType===0" label="区域：">
            <select-region
              :area-id="this.baseAreaId"
              v-model="queryParams.areaId"
              @change="handleAreaChange">
            </select-region>
          </el-form-item>
          <el-form-item v-if="platformType===0" label="学校：">
            <select-school :area-id="queryParams.areaId" @change="handleSchoolChange">
            </select-school>
          </el-form-item>
        </div>
        <el-form-item label="日期范围：">
          <el-radio v-model="queryParams.radio" :label="1">按学期</el-radio>
          <el-radio v-model="queryParams.radio" :label="2">自定义</el-radio>
          <el-select
            v-if="platTermList.length > 0 && queryParams.radio === 1"
            v-model="queryParams.value"
            size="flat"
            @change="changeTermTime"
            :placeholder="platTermList[0].name">
            <el-option
              v-for="item in platTermList"
              :key="item.baseTermId"
              :label="item.name"
              :value="item.baseTermId">
            </el-option>
          </el-select>
          <el-date-picker
            v-if="queryParams.radio === 2"
            v-model="queryParams.timeValue"
            type="daterange"
            align="right"
            size="flat"
            unlink-panels
            format="yyyy-MM-dd"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="success" class="ml20" @click="queryTableData">查询</el-button>
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
        :default-sort="{prop: 'realCnt', order: 'descending'}"
        style="width: 100%">
        <el-table-column
          prop="teacherName"
          label="主讲教师"
          width="140">
        </el-table-column>
        <el-table-column
          prop="areaName"
          label="区域"
          width="140">
        </el-table-column>
        <el-table-column
          prop="schoolName"
          label="学校"
          width="140">
        </el-table-column>
        <el-table-column
          prop="planCnt"
          label="计划课时数"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="realCnt"
          label="实开课时数"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="ratio"
          label="实开课时占比"
          sortable
        >
          <template slot-scope="scope">
            {{scope.row.ratio + '%'}}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination-right"
        background
        :hide-on-single-page="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.pageNum"
        :page-sizes="[10, 20, 30]"
        :page-size="queryParams.pageSize"
        layout="prev, pager, next, jumper,slot"
        :pager-count="5"
        :total="this.total">
        <el-button type="primary">确定</el-button>
      </el-pagination>
    </div>
  </div>
</template>

<script>
/*
* Description index
* Created By xuqingyu
* Created At 2019/11/11 9:39
*/
import PageHeader from '@/components/personal/PageHeader/index'
import SelectRegion from '../../../../components/common/SelectRegion/index'
import SelectSchool from '../../../../components/common/SelectSchool'
import { getTeacherClassStatistics } from '@/api/personal/teachingStatistics'
import { mapGetters } from 'vuex'

export default {
  name: 'TeacherStatistics',
  props: {},
  components: { PageHeader, SelectRegion, SelectSchool },
  data () {
    return {
      queryParams: {
        areaId: null,
        schoolId: null,
        value: '',
        radio: null,
        timeValue: [],
        attendeeType: 'MASTER',
        pageNum: 1,
        pageSize: 20,
      },
      radio: 2,
      total: 0,
      tableData: [],
    }
  },
  computed: {
    ...mapGetters([
      'platformId', // 平台id
      'platformType', // 0是区域,1是学校
      'baseAreaId', // 区域ID
      'baseSchoolId', // 学校ID
      'platTermList', // 平台学期列表
    ])
  },
  async created () {
    // 选中日期查询按钮
    this.checkedRadio()
    // 加载最近一年的时间
    this.getRecentlyTime()
    // 初始化表格
    await this.initTableList()
  },
  methods: {
    /**
     * @description: 选中日期查询按钮——按学期or自定义
     * @param arguments 描述
     * @returns {}
     */
    checkedRadio () {
      if (this.platTermList.length > 0) {
        this.queryParams.radio = 1
      } else {
        this.queryParams.radio = 2
      }
    },
    /**
     * @description: 切换学期selected,修改时间查询范围
     * @param arguments 描述
     * @returns {}
     */
    changeTermTime (val) {
      const termObj = this.platTermList.filter(item => item.baseTermId === val)
      this.queryParams.timeValue[0] = termObj[0].startDate
      this.queryParams.timeValue[1] = termObj[0].endDate
    },
    /**
     * @description: 初始化表格数据
     * @param arguments 描述
     * @returns {}
     */
    async initTableList () {
      const params = {
        baseAreaId: this.queryParams.areaId || this.baseAreaId,
        basePlatformId: this.basePlatformId,
        baseSchoolId: this.queryParams.schoolId || this.baseSchoolId,
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        orderAttr: 'realCnt',
        orderDesc: 'desc'
      }
      if (this.queryParams.radio === 1) {
        params.endTime = this.platTermList[0].endDate
        params.startTime = this.platTermList[0].startDate
      } else {
        params.endTime = this.queryParams.timeValue[1]
        params.startTime = this.queryParams.timeValue[0]
      }
      console.log('timeValue', this.queryParams.timeValue)
      console.log('查询params', params)
      const res = await getTeacherClassStatistics(params)
      this.tableData = res.list
      this.total = res.total
      console.log('this.tableData', this.tableData)
    },
    /**
     * @description: 学校选择器切换，改变值
     * @param arguments 描述
     * @returns {}
     */
    handleSchoolChange (val) {
      this.queryParams.schoolId = val
    },
    /**
     * @description: 点击查询按钮查询表格数据
     * @param arguments 描述
     * @returns {}
     */
    queryTableData () {
      this.initTableList()
    },
    /**
     *@Description
     *@Param
     *@Return 查询条件 - 区域事件监听.
     **/
    handleAreaChange (val) {
      this.queryParams.areaId = val
      console.log('this.queryParams.areaId0000', this.queryParams.areaId)
    },
    /**
     * @description: 加载最近一年的时间
     * @param  描述
     * @returns {}
     */
    getRecentlyTime () {
      const nowDate = new Date().getTime()
      const currentdate = nowDate
      const date = new Date(nowDate)
      date.setFullYear(date.getFullYear() - 1)
      const recentlyYeardate = date.getTime()
      this.queryParams.timeValue = [recentlyYeardate, currentdate]
    },
    /**
     * @description: 点击分页切换查询行数
     * @param arguments 描述
     * @returns {}
     */
    handleSizeChange (val) {
      this.queryParams.pageSize = val
      this.initTableData()
    },
    /**
     * @description: 点击分页查询按钮
     * @param arguments 描述
     * @returns {}
     */
    handleCurrentChange (val) {
      this.queryParams.pageNum = val
      this.initTableData()
    },
  }
}
</script>

<style scoped lang="scss">
  @import "./index.scss";
</style>
