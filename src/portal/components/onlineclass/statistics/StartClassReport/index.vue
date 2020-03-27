/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.12.11 10:40.
* @Author yinmeng@codyy.com
* @Description  StartClassReport -- 教学统计 - 近12月开课分析、行政区开课分析
**/
<template>
  <div class="start-class-report">
    <div class="start-class-report__header">
      <i class="el-icon-custom-census"></i>
      <span>教学统计</span>
    </div>
    <div class="start-class-report__content">
      <div class="chat-tab">
        <span :class="tabIndex===0 && 'selected'" @click="handleTabClick(0)">近12个月开课分析</span>
        <span :class="tabIndex===1 && 'selected'" @click="handleTabClick(1)">行政区开课分析</span>
      </div>
      <chart :options="options" autoresize ref="chart"></chart>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import { mapGetters } from 'vuex'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/dataZoom'
import { statisticsCourse, statisticsMonth } from '@/api/personal/teachingStatistics' // 门户入口 - 教学统计 - 近N月开课统计( 区域/学校 )、行政区开课分析

export default {
  name: 'StartClassReport',
  props: {},
  components: {
    chart: ECharts
  },
  data () {
    return {
      params: {}, // 加载近12月、区域开课分析参数
      tabIndex: 0,
      options: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          top: 10,
          right: 0,
          itemWidth: 16,
          itemHeight: 10,
          textStyle: {
            color: '#555',
          },
          data: ['计划课时数', '实开课时数', '实开课时占比']
        },
        dataZoom: [], // 设置滚动条
        grid: {
          left: '0%',
          right: '0%',
          bottom: '8px',
          top: '20%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisPointer: {
            type: 'shadow'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#dcdcdc'
            }
          },
          axisLabel: {
            interval: 0, // 设置间距
            color: '#999'
          },
        }],
        yAxis: [{
          type: 'value',
          name: '开课量',
          nameTextStyle: {
            color: '#999',
            align: 'right'
          },
          min: 0,
          max: 2500,
          interval: 500,
          axisLabel: {
            color: '#999',
            formatter: '{value}'
          },
          axisTick: {
            lineStyle: {
              color: '#f3f3f3'
            }
          },
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#f3f3f3'
            }
          }
        }, {
          type: 'value',
          name: '比例',
          nameTextStyle: {
            color: '#999',
            align: 'left'
          },
          min: 0,
          max: 100,
          interval: 20,
          axisLabel: {
            color: '#999',
            formatter: '{value}%'
          },
          axisTick: {
            lineStyle: {
              color: '#f3f3f3'
            }
          },
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#f3f3f3'
            }
          }
        }],
        series: [{
          name: '计划课时数',
          type: 'bar',
          color: '#00cfbe',
          barWidth: 8,
          label: {
            show: true,
            position: ['-15px', '-15px']
          },
          data: [2.0, 4.9, 700.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        }, {
          name: '实开课时数',
          type: 'bar',
          color: '#347eff',
          barWidth: 8,
          label: {
            show: true,
            position: ['0px', '-15px']
          },
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        }, {
          name: '实开课时占比',
          type: 'line',
          color: '#ffc000',
          yAxisIndex: 1,
          symbolSize: 8,
          label: {
            show: true,
            formatter: '{c}%'
          },
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }]
      }
    }
  },
  watch: {},
  computed: {
    ...mapGetters(['basePlatformId', 'baseAreaId', 'baseSchoolId']),
  },
  created () {
    const current = dayjs().valueOf() // 当前年月日
    const subtract = dayjs(current).subtract(11, 'month').valueOf() // 11个月之前的年月日
    this.params.endTime = current // 时间戳：结束查询的日期
    this.params.startTime = subtract // 时间戳：开始查询的日期
    this.params.baseAreaId = this.baseAreaId // 区域的ID，必填
    this.params.basePlatformId = this.basePlatformId // 平台的ID
    this.params.baseSchoolId = this.baseSchoolId // 学校的ID，非必填
    this.getChartData()
  },
  methods: {
    /**
     *@Description
     *@Param
     *@Return 近12个月开课分析 - 行政区开课分析 点击事件监听.
     **/
    handleTabClick (type) {
      if (type === 0) {
        this.tabIndex = 0
        this.getChartData()
      } else {
        this.tabIndex = 1
        this.getAreaData()
      }
    },
    /**
     *@Description
     *@Param
     *@Return 获取图表数据，近N月开课统计数据.
     **/
    getChartData () {
      statisticsMonth(this.params).then(res => {
        this.resultData('month', res)
      })
    },
    /**
     *@Description
     *@Param
     *@Return 获取图表数据，行政区 - 开课统计数据.
     **/
    getAreaData () {
      statisticsCourse(this.params).then(res => {
        this.resultData('area', res)
      })
    },
    /**
     *@Description
     *@Param
     *@Return 格式化 返回的数据.
     **/
    resultData (type, res) {
      const ratio = [] // 比例
      const planCnt = [] // 计划课时数
      const realCnt = [] // 实际开课数
      const monthOrArea = [] // x轴月份、或者区域
      res.forEach(val => {
        ratio.push(val.ratio)
        planCnt.push(val.planCnt)
        realCnt.push(val.realCnt)
        if (type === 'month') { // 月份
          const monthNo = val.monthNo
          monthOrArea.push(monthNo.toString().substr(0, 4) + '.' + monthNo.toString().substr(4, 6)) // x轴月份
        } else { // 区域
          monthOrArea.push(val.name) // x轴区域
        }
      })

      const len = monthOrArea.length
      const dataZoom = [{
        type: 'slider',
        show: true,
        realtime: true,
        height: 12,
        xAxisIndex: [0],
        bottom: -2,
        start: 0,
        end: 100 / (len / 12),
        textStyle: {
          color: '#666'
        }
      }]
      if (type === 'area' && len > 24) { // 区域
        dataZoom[0].show = true
        dataZoom[0].realtime = true
        this.options.dataZoom = dataZoom
      } else { // 月份
        dataZoom[0].show = false
        dataZoom[0].realtime = false
        this.options.dataZoom = dataZoom
      }
      const planMax = Math.max(...planCnt)
      const realMax = Math.max(...realCnt)
      const max = planMax > realMax ? planMax : realMax
      const interval = Math.ceil(max / 5)
      this.options.yAxis[0].interval = interval
      this.options.yAxis[0].max = interval * 5 // Y轴最大值

      this.options.xAxis[0].data = monthOrArea // x轴月份、区域
      this.options.series[0].data = planCnt // 计划课时数
      this.options.series[1].data = realCnt // 实开课时数
      this.options.series[2].data = ratio // 实开课时占比
    },
  },
  beforeDestroy () {
    this.$refs.chart.dispose()
  }
}
</script>
<style lang="scss" scoped>
  @import "./index.scss";
</style>
