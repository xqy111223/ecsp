<template>
  <section class="app-main">
    <!--<keep-alive :include="cachedViews">-->
    <router-view :key="key"/>
    <!--</keep-alive>-->
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews () {
      return []
    },
    key () {
      return this.$route.fullPath
    }
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
  .app-main {
    /*199 = navbar + footer = 60 +139 */
    min-height: calc(100vh - 199px);
    width: 100%;
    position: relative;
    overflow: hidden;
    background: #f6f7fb;
  }
</style>
