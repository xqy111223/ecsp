/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.12.11 10:40.
* @Author yinmeng@codyy.com
* @Description  教学统计 - 学科占比、年级占比、教师开课 - 标题
**/
<template>
  <div class="chart-title">
    <span>{{title}}</span>
    <span class="font-small">{{subTitle}}</span>
  </div>
</template>

<script>
export default {
  name: 'ChartTitle',
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  @import "&/default/var.scss";
  .chart-title {
    font-size: 16px;
    line-height: 19px;
    position: relative;
    height: 19px;
    padding-left: 16px;
    &:before {
      position: absolute;
      top: 2px;
      left: 0px;
      display: inline-block;
      width: 7px;
      height: 15px;
      content: '';
      border-radius: 4px;
      background-color: $primary-color;
      background-color: var(--primary-color);
    }
  }
</style>
