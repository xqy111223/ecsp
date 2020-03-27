/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.11.04 09:22.
* @Author
* @Description 个人空间 - 页头部份 - 公共组件
**/
<template>
  <div :style="`height:${height}px;margin-top:-${offset}px`" class="page-header">
    <!--取路由作为页头-->
    <div :style="`line-height:${height}px`" class="page-header__title">
      <span v-text="title || route && route.title"></span>
    </div>
    <!--右侧浮动按钮类操作-->
    <div :style="`line-height:${height}px`" class="page-header__slot">
      <slot v-bind:route="route"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      default: null
    },
    height: {
      type: Number,
      default: 55
    },
    offset: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      route: null
    }
  },
  created () {
    if (!this.title) { // 未传递，那么自动取用
      this.route = { ...this.$route, title: (this.$route.meta && this.$route.meta.title) || '路由未配置Title' }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  @import "~&/default/var.scss";
  .page-header {
    width: 100%;
    border-bottom: 1px solid #f2f2f2;
    overflow: hidden;
    > .page-header__title {
      box-sizing: border-box;
      display: inline-block;
      height: 100%;
      margin-left: 10px;
      color: $primary-color;
      font-size: 16px;
      padding: 0px 2px;
      border-bottom: 2px solid $primary-color;
    }
    > .page-header__slot {
      height: 100%;
      float: right;
      box-sizing: border-box;
    }
  }
</style>
