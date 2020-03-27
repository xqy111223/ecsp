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
  name: 'OC_STATISTICS',
  mixins: [PortalInit],
  data () {
    return {
      key: 'Statistics'
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {}
}
</script>

<style scoped lang="scss">
</style>
