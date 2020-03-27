<template>
  <div class="class-statistics">
    <page-header></page-header>
    <div class="search-area">
      <el-form :inline="true" :model="queryParams" class="form-inline" label-width="85px">
        <el-form-item label="日期范围：">
          <el-radio :label="1" v-if="platTermList.length > 0" v-model="queryParams.radio">按学期</el-radio>
          <el-radio :label="2" v-model="queryParams.radio">自定义</el-radio>
          <el-select
            :placeholder="platTermList[0].name"
            @change="changeTermTime"
            size="flat"
            v-if="platTermList.length > 0 && queryParams.radio === 1"
            v-model="queryParams.value">
            <el-option
              :key="item.baseTermId"
              :label="item.name"
              :value="item.baseTermId"
              v-for="item in platTermList">
            </el-option>
          </el-select>
          <el-date-picker
            align="right"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            range-separator="至"
            size="flat"
            start-placeholder="开始日期"
            type="daterange"
            unlink-panels
            v-if="queryParams.radio === 2"
            v-model="queryParams.timeValue"
            value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="queryTableData" class="ml20" size="mini" type="success">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-tabs @tab-click="handleClick" type="card" v-model="activeName">
      <el-tab-pane label="主讲" name="MASTER">
        <div class="table-area">
          <div class="table-total">
            共<span class="blue">{{total}}</span>条数据
            <span class="export-text-btn"><i class="el-icon-custom-export"></i>导出</span>
          </div>
          <el-table
            :data="tableData"
            :default-sort="{prop: 'realCnt', order: 'descending'}"
            :summary-method="getSummaries"
            header-row-class-name="table-header-default"
            row-class-name="table-body-default"
            show-summary
            stripe
            style="width: 100%"
            v-if="reloadTable"
          >
            <el-table-column
              prop="name"
              :label="theadName">
            </el-table-column>
            <el-table-column
              label="计划课时数"
              prop="planCnt"
              sortable>
            </el-table-column>
            <el-table-column
              label="实开课时数"
              prop="realCnt"
              sortable
            >
            </el-table-column>
            <el-table-column
              label="实开课时占比"
              prop="ratio"
              sortable
            >
              <template slot-scope="scope">
                {{scope.row.ratio + '%'}}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="受邀" name="RECEIVE">
        <div class="table-area">
          <div class="table-total">
            共<span class="blue">{{total}}</span>条数据
            <span class="export-text-btn"><i class="el-icon-custom-export"></i>导出</span>
          </div>
          <el-table
            :data="tableData"
            :default-sort="{prop: 'realCnt', order: 'descending'}"
            :summary-method="getSummaries"
            header-row-class-name="table-header-default"
            row-class-name="table-body-default"
            show-summary
            stripe
            style="width: 100%"
            v-if="reloadTable"
            v-loading="loading">
            <el-table-column
              prop="name"
              :label="theadName">
            </el-table-column>
            <el-table-column
              label="计划课时数"
              prop="planCnt"
              sortable>
            </el-table-column>
            <el-table-column
              label="实开课时数"
              prop="realCnt"
              sortable
            >
            </el-table-column>
            <el-table-column
              label="实开课时占比"
              prop="ratio"
              sortable
            >
              <template slot-scope="scope">
                {{scope.row.ratio + '%'}}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
/*
* Description index
* Created By xuqingyu
* Created At 2019/11/11 9:39
*/
import PageHeader from '@/components/personal/PageHeader/index'
import { getClassStatistics } from '@/api/personal/teachingStatistics'
import { mapGetters } from 'vuex'

export default {
  name: 'ClassStatistics',
  props: {},
  components: { PageHeader },
  data () {
    return {
      queryParams: {
        areaId: '',
        schoolId: '',
        value: '',
        radio: null,
        timeValue: [], // 开始时间,结束时间范围
        attendeeType: 'MASTER',
        isDirectSchool: 0,
        headerPath: [],
      },
      reloadTable: true,
      theadName: (this.baseSchoolName || this.baseAreaName) || '中国',
      activeName: 'MASTER',
      total: 0,
      tableData: [],
      loading: true
    }
  },
  computed: {
    ...mapGetters([
      'basePlatformId', // 平台id
      'platformType', // 0是区域,1是学校
      'baseAreaId', // 区域ID
      'baseSchoolId', // 学校ID
      'platTermList', // 平台学期列表
      // 'baseAreaName', // 区域名称
      // 'baseSchoolName', // 学校名称
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
     * @description: 表格最后一行的合计逻辑
     * @param arguments 描述
     * @returns {}
     */
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        if (index === 1 || index === 2) {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
          } else {
          }
        }
        if (index === 3) {
          sums[index] = Math.round((sums[2] / sums[1]) * 10000) / 100
          sums[index] += '%'
        }
      })
      return sums
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
     * @description: 初始化表格数据
     * @param arguments 描述
     * @returns {}
     */
    async initTableList () {
      console.log('this.platTermList.length', this.platTermList.length)
      // const params = {
      //   baseAreaId: this.queryParams.areaId || this.baseAreaId,
      //   basePlatformId: this.platformId,
      //   baseSchoolId: this.queryParams.schoolId || this.baseSchoolId,
      //   attendeeType: this.queryParams.attendeeType
      // }
      const params = {
        baseAreaId: 1571706549288,
        basePlatformId: 0,
        baseSchoolId: 0,
        attendeeType: this.queryParams.attendeeType || 'MASTER',
        isDirectSchool: this.queryParams.isDirectSchool
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
      try {
        this.tableData = await getClassStatistics(params)
        this.total = this.tableData.length
        this.loading = false
      } catch (e) {
        this.loading = false
      }
      console.log('this.tableData', this.tableData)
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
     * @description: 点击切换tab标签
     * @param arguments 描述
     * @returns {}
     */
    handleClick (tab, event) {
      // console.log('tab-click', tab)
      this.queryParams.attendeeType = tab.name
      this.initTableList()
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./index.scss";
</style>
