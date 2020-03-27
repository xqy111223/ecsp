/**
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.09.11 11:06.
* @Author
* @Description eChart 图表组件
**/
<template>
  <div class="AppChart">
    <div class="analyzeSystem">
      <div :class="className" :id="id" :style="{height: height, width: width}" ref="eChart"></div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'

export default {
  name: 'EChart',
  props: {
    className: {
      type: String,
      default: 'ec-chart'
    },
    id: {
      type: String,
      default: 'id'
    },
    width: {
      type: String,
      default: '700px'
    },
    height: {
      type: String,
      default: '600px'
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$refs.eChart)
      // 参数配置、数据
      this.chart.setOption({
        title: {
          text: '时时开课数据',
          subtext: '副标题',
          left: 'center',
          top: 20,
          textStyle: {
            color: 'red'
          }
        },
        tooltip: { // 配置后提示框组件才有效
          trigger: 'item', // 提示框显示位置
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: { // 组件图列
          orient: 'vertical',
          left: 'left',
          data: ['数学', '政治', '美术', '英语', '物理', '其它']
        },
        // roseType: 'area', // 图形展示方式 radius、area
        series: [{
          type: 'pie', // 图表类型
          name: '数据提示-tips', // 提示框标题
          radius: '70%', // 图大小 占父级宽高比
          center: ['50%', '50%'], // 相对父级位置
          data: [{
            value: 60, name: '语文'
          }, {
            value: 101, name: '数学'
          }, {
            value: 162, name: '政治'
          }, {
            value: 163, name: '美术'
          }, {
            value: 264, name: '英语'
          }, {
            value: 435, name: '物理'
          }, {
            value: 530, name: '其它'
          }].sort(function (a, b) {
            return a.value - b.value
          }),
          label: {
            normal: {
              textStyle: {
                // color: 'rgba(255, 255, 255, 0.3)'
              }
            }
          },
          labelLine: { // 导引线
            normal: {
              show: true, // 是否显示导引线
              lineStyle: {
                // color: 'rgba(255, 255, 255, 1)'
              },
              smooth: 0.2, // 导引线平滑度
              length: 10, // 导引线第一、二段长度
              length2: 20
            }
          },
          itemStyle: { // 图形样式
            normal: {
              label: {
                // show: true
              },
              shadowBlur: 0, // 图形阴影
              shadowColor: 'rgba(52, 126, 255, 1)', // 阴影颜色
              borderWidth: '2', // 描边系列
              borderType: 'solid',
              borderColor: '#fff'
            }
          },

          animationType: 'scale', // 初始化动画 类型
          animationEasing: 'elasticOut', // 初始化缓存动画
          animationDelay: function (idx) { // 初始化动画延迟
            return Math.random() * 200
          }
        }],
        visualMap: { // 视觉组件 相当于缩略图
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        color: ['#ff3a00', '#f8b7f0', '#347eff', '#40cdff', '#f7bb42', '#00cfbe', '#ad93ed', '#e062ae', '#37a2da', '#ffdb5c', '#67e0e3'], // 自定义的颜色
        backgroundColor: '#fff' // 背景色
      }) // 初始化方法结束
    }
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  }
}
</script>
<style scoped lang="scss">
  .AppChart {
    border: 1px solid blue;
    padding: 30px 20px;
  }

  .ec-chart {
    padding: 10px;
    border: 1px solid red;
  }
</style>
