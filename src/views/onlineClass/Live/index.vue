<template>
  <div>
    <div v-for="portal in portalInfo.moduleLayoutBoxes" v-bind:key="portal.contentCode">
      <div :style="compStyle(portal)">
        <component v-bind:is="portal.contentCode"></component>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
import PortalInit from '../mixin/PortalInit'

export default {
  name: 'OC_LIVE',
  mixins: [PortalInit],
  data () {
    return {
      key: 'Live', // 当前页面的菜单key值，通过key来查询门户配置信息 供PortalInit使用
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {}
}
</script>

<style scoped>

</style>
