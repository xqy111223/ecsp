/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.12.11 10:40.
* @Author yinmeng@codyy.com
* @Description  SubjectReport -- 教学统计 - 学科占比分析
**/
<template>
  <div class="subject-report">
    <div class="subject-report__content">
      <chart-title sub-title="(实开课时数)" title="学科占比分析"></chart-title>
      <chart :options="options" autoresize="" ref="chart"></chart>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ChartTitle from '../ChartTitle/index'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/grid'
import { statisticsSub } from '@/api/personal/teachingStatistics' // 门户入口 - 教学统计 - 学科占比分析-实开课(区域/学校 )

export default {
  name: 'SubjectReport',
  components: { ChartTitle, chart: ECharts },
  props: {},
  data () {
    return {
      options: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [{
          name: '实时开课数',
          type: 'pie',
          radius: '70%',
          label: {
            // formatter: '{b}\n{d}%',
            formatter: '{b} \n {c}  {d}%',
          },
          center: ['50%', '50%'],
          data: [],
          color: this.color,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      },
      color: ['#F8B7F0', '#347EFF', '#40CDFF', '#F7BB42', '#00CFBE', '#AD93ED', '#FF3A00'],
    }
  },
  computed: {
    ...mapGetters(['basePlatformId', 'baseAreaId', 'baseSchoolId']),
  },
  created () {
    this.getStatisticsSub()
  },
  methods: {
    getStatisticsSub () {
      const params = {
        baseAreaId: this.baseAreaId, // 区域的ID，必填
        baseSchoolId: this.baseSchoolId, // 学校的ID，非必填
        basePlatformId: this.basePlatformId, // 平台的ID
      }
      statisticsSub(params).then(res => {
        const arr = []
        res.forEach((val, index) => {
          const num = index % 7
          const value = val.ratio
          const planCnt = val.planCnt
          const name = val.baseSubjectName
          arr.push({ name, value, planCnt, itemStyle: { color: this.color[num] } })
        })
        this.options.series[0].data = arr
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./index.scss";
</style>
