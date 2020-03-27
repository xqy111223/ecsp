/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.11.13 14:40.
* @Author
* @Description  个人空间 - 应用管理 - 课表管理 - 课程状态-说明- 公共组件使用
**/
<template>
  <!-- 状态标志 -->
  <ul class="class-status">
    <li><i class="el-block orange"></i>今天</li>
    <li><i class="el-icon-custom-cross-region"></i>跨域</li>
    <li><i class="el-icon-custom-Independent-course"></i>自主开课</li>
    <li><i class="el-block light"></i>未开始</li>
    <li><i class="el-block green"></i>进行中</li>
    <li><i class="el-block gray"></i>已结束</li>
  </ul>
</template>
<script>

export default {
  name: 'ClassStatus',
  props: {},
  data () {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
  /* 状态标志 */
  .class-status {
    margin-top: 10px;
    text-align: right;
    overflow: hidden;
    font-size: 0;
    li {
      display: inline-block;
      margin-left: 20px;
      font-size: 14px;
      i {
        margin-right: 4px;
        vertical-align: middle;
      }
    }
    .el-icon-custom-cross-region {
      color: #13b0f9;
    }
    .el-icon-custom-Independent-course {
      color: #ff00ff;
    }
    .el-block {
      display: inline-block;
      width: 20px;
      height: 10px;
      border: 1px solid #dcdcdc;
    }
    .orange {
      background: #ffb400;
    }
    .light {
      background: #e1efff;
    }
    .green {
      background: #9ffbcd;
    }
    .gray {
      background: #eee;
    }
  }
</style>
