/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.12.11 10:40.
* @Author yinmeng@codyy.com
* @Description  TeacherRankReport -- 教学统计 - 教师开课排行
**/
<template>
  <div class="teacher-rank-report">
    <chart-title title="教师开课排行"></chart-title>
    <chart :options="options" autoresize ref="chart"></chart>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChartTitle from '../ChartTitle/index'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/dataZoom'
import { statisticsTea } from '@/api/personal/teachingStatistics' // 门户入口 - 教学统计 - 教师开课排行-实开课（区域/学校)
export default {
  name: 'TeacherRankReport',
  components: { ChartTitle, chart: ECharts },
  props: {},
  data () {
    return {
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
          top: 0,
          right: 0,
          itemWidth: 16,
          itemHeight: 10,
          textStyle: {
            color: '#555',
          },
          data: ['实开课时数', '实开课时占比']
        },
        dataZoom: [{
          type: 'slider',
          show: false,
          height: 8,
          xAxisIndex: [0],
          start: 0,
          end: 100,
          bottom: 0,
          textStyle: {
            color: '#666'
          }
        }],
        grid: {
          left: '0%',
          right: '0%',
          bottom: '8px',
          top: '20%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['张三丰', '刘跃民', '李华坤', '詹二龙', '易道师', '阴阳师', '匡敏', '赵宏', '李白', '宋茜', '宋朝', '易经经'],
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
            color: '#333'
          }
        }, {
          position: 'bottom',
          type: 'category',
          offset: 15,
          data: ['星海小学', '星海小学', '星海小学', '星海小学', '星海小学', '星海小学', '星海小学', '星海小学', '星海小学', '星海小学', '星海小学', '星海小学'],
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
            color: '#999'
          }
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
          interval: 600,
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
  computed: {
    ...mapGetters(['basePlatformId', 'baseAreaId', 'baseSchoolId']),
  },
  created () {
    this.getStatisticsTea()
  },
  methods: {
    getStatisticsTea () {
      const params = {
        pageNum: 1, //
        pageSize: 10, //
        orderDesc: 'desc', // 升序: asc、降序:desc
        orderAttr: 'realCnt', // 排序字段：planCnt:计划课程数 realCnt:实开课数 ratio:比例 invalid:无效课程数量
        baseAreaId: this.baseAreaId, // 区域的ID，必填
        baseSchoolId: this.baseSchoolId, // 学校的ID，非必填
        basePlatformId: this.basePlatformId, // 平台的ID
      }
      statisticsTea(params).then(res => {
        const teaArr = []
        const schoolArr = []
        const realCntArr = []
        const ratioArr = []
        res.list.forEach(val => {
          teaArr.push(val.teacherName)
          schoolArr.push(val.schoolName)
          realCntArr.push(val.realCnt)
          ratioArr.push(val.ratio)
        })
        const max = Math.max(...realCntArr)
        const interval = Math.ceil(max / 5)
        this.options.yAxis[0].interval = interval
        this.options.yAxis[0].max = interval * 5
        this.options.xAxis[0].data = teaArr // 老师数据
        this.options.xAxis[1].data = schoolArr // 学校数据
        this.options.series[1].data = ratioArr // 实际开课占比
        this.options.series[0].data = realCntArr // 实际开课数
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./index.scss";
</style>
