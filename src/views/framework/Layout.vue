<template>
  <div class="app-wrapper">
    <div class="main-container">
      <el-scrollbar style="height: 100%">
        <app-nav/>
        <app-main :style="{height:getMainHeight}"/>
        <app-footer/>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { AppFooter, AppMain, AppNav } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    AppNav,
    AppMain,
    AppFooter
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters([
      'mainHeight'
    ]),
    getMainHeight () {
      return this.mainHeight ? (this.mainHeight + 'px') : 'initial'
    },
  }
}
</script>

<style scoped lang="scss">
  .main-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    min-width: 1280px;
  }

  /*样式穿透 采用deep*/
  /deep/ .el-scrollbar__wrap {
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>
