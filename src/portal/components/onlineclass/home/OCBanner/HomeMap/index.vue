/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2020.01.07 09:02.
* @Author
* @Description 门户首页 - banner 模块 - 地图
**/
<template>
  <!-- 通栏 -->
  <div class="portal-container">
    <!-- 居中 -->
    <div class="warp">
      <el-row :gutter="20">
        <!-- 左侧地图 展示 -->
        <el-col :span="14">
          <map-area :area-code='areaCode' :color-set="colorSet" :map-svg-data='svgMapData' @clickmap="handleMapClick" ref="map"/>
        </el-col>
        <!-- 右侧数据 展示 -->
        <el-col :span="10">
          <map-data :map-data-info='mapDataInfo'/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import MapData from './MapComponents/MapData'
import MapArea from './MapComponents/MapArea'
import { getMapData, getMapSvg } from '@/api/onlineclass/home'

export default {
  components: { MapData, MapArea },
  name: 'OCMap',
  props: {
    option: {
      type: Object
    }
  },
  data () {
    return {
      areaCode: '000000', // 当前地图区域的code
      mapDataInfo: {}, // 地图右侧区域数据信息
      svgMapData: {}, // 左侧地图svg数据
      colorSet: { color: '#adeaff', hover: '#2fc3ff', empty: '#ffffff' } // 左侧地图颜色配置信息,从后台读取三个颜色设置
    }
  },
  watch: {
    option: {
      deep: true,
      immediate: true,
      handler () {
        if (this.option) {
          this.svgMapData = this.option.svgMapData
        }
      }
    }
  },
  created () {
    this.initMapData() // 右侧 - 地图数据加载
    // this.initMapSvgData() // 左侧 - 地图绘制
  },
  methods: {
    /**
     *@Description
     *@Param
     *@Return 地图 点击事件 监听.
     **/
    handleMapClick (areaCode, path) {
      this.areaCode = areaCode
      this.initMapData()
      this.initMapSvgData(areaCode, path)
    },
    /**
     *@Description
     *@Param
     *@Return 地图 数据 加载.
     **/
    async initMapData (areaCode) {
      const mapData = await getMapData(areaCode)
      this.mapDataInfo = mapData
    },
    /**
     *@Description
     *@Param
     *@Return 默认进入页面，请求地图svg接口 绘制地图.
     **/
    async initMapSvgData (areaCode, path = null) {
      const svgData = await getMapSvg(areaCode)
      if (svgData && svgData.svgMapData) {
        this.svgMapData = svgData.svgMapData
      } else if (path) { // 未加载到子级，那么触发active
        this.$refs.map.setActive(path)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .portal-container {
    position: relative;
    width: 100%;
    height: 100%;
    color: #FFFFFF;
    background: #002dd8;

    .warp {
      width: 1280px;
      margin: auto;
    }
  }
</style>
