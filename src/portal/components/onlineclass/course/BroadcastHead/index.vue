<template>
  <!-- 课程点播title区域组件 -->
  <div class="w1200 auto pt20 pb20">
    <!------------ 面包屑 ---------------->
    <div class="crumbs" :class="{hide:hasTitle}">
      <a href="">课程中心</a>
      >
      <a href="">语文</a>
      >
      <span>作文写作技巧</span>
    </div>
    <!------------ 面包屑 ---------------->
    <div class="title-text" :class="{hide:hasTitle}">作文写作技巧分析</div>
    <div class="head-info">
      <div>
        <img src="" alt=""/>
        <span class="c33 ml10">刘永清</span>
      </div>
      <div class="c99 ml40">
        <span class="inblock mr15">三年级</span> |
        <span class="inblock ml15 mr15">语文</span> |
        <span class="inblock ml15 mr15">人教版</span> |
        <span class="inblock ml15 mr15">上册</span> |
        <span class="inblock ml15 mr15">1小时25分</span> |
        <span class="inblock ml15">播放254次</span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'BroadcastHead',
  data () {
    return {
      hasTitle: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "index.scss";
</style>
