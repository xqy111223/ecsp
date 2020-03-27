<template>
  <div class="home-container home-bg">
    <div v-for="portal in portalInfo.moduleLayoutBoxes" :key="portal.index">
      <div :style="compStyle(portal)">
        <component v-bind:is="portal.contentCode" :options="portal.boxContent" :basePX="basePX"></component>
      </div>
    </div>
  </div>
</template>

<script>
import PortalInit from '../mixin/PortalInit'

export default {
  name: 'OC_HOME',
  mixins: [PortalInit],
  data () {
    return {
      key: 'Home', // 当前页面的菜单key值，通过key来查询门户配置信息 供PortalInit使用
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
  .home-container {
    height: 100%;

    &.home-bg {
      background: url("~@/assets/images/home_bg.png") no-repeat 0 480px;
      background-size: contain;
    }
  }
</style>
