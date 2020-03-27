/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.12.31 10:24.
* @Author
* @Description 门户首页 - banner 模块 - 入口
**/
<template>
  <div class="oc-banner">
    <component :is="componentName" :option="option"></component>
  </div>
</template>

<script>
import HomeMap from './HomeMap' // banner - 地图
import { mapGetters } from 'vuex'
import HomeBanner from './HomeBanner' // banner - 图片
import { bannerList, getHomeBannerData } from '@/api/onlineclass/portal' // 图片 banner

export default {
  name: 'OCBanner',
  props: {},
  components: { HomeBanner, HomeMap },
  data () {
    return {
      option: null,
      bannerData: [], // 重载banner 图片
      componentName: 'HomeBanner', // 模板加载 名称
    }
  },
  computed: {
    ...mapGetters(['baseAreaId', 'baseSchoolId', 'basePlatformId']),
  },
  created () {
    this.getHomeBannerData() // 获取首页配置，如果是校级平台，或者是区域平台配置图片则加载HomeBanner，否则加载HomeMap
  },
  methods: {
    /**
     *@Description
     *@Param
     *@Return 获取 banner 区域配置信息 是地图还是图片.
     **/
    async getHomeBannerData () {
      const result = await getHomeBannerData()
      if (result.type === 'banner') {
        this.componentName = 'HomeBanner'
        this.option = result.banner
      } else {
        this.componentName = 'HomeMap'
        this.option = result.map
      }
    },
    /**
     *@Description
     *@Param
     *@Return 获取 图片 数据信息.
     **/
    getBannerList () {
      bannerList({ basePlatformId: this.basePlatformId }).then(res => {
        this.bannerData = res
        console.log('banner获取*****', res)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .oc-banner {
    width: 100%;
    height: 100%;
  }
</style>
