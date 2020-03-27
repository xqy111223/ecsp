/**
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2020.01.08 14:10.
* @Author
* @Description HomeBanner - 门户首页 - banner 模块 - 图片
* Created By yinmeng@codyy.com
* Created At 2019/10/18 9:50
**/
<template>
  <div class="home-banner">
    <el-carousel :arrow="list.length > 1 ?'hover':'never'" height="480px" trigger="click">
      <el-carousel-item :key="item.id" v-for="item in list">
        <a :href="item.jumpUrl ? item.jumpUrl : 'javascript:;'" target="_blank">
          <img :pointer="item.picUrl && true" :src="item.picUrl" :url="item.picUrl">
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<!--id banner的Id -->
<!--jumpUrl 链接地址 -->
<!--mobileUrl banner手机图片的url -->
<!--picUrl banner地址 -->
<!--sort 序号 序号1-5 -->

<script>
export default {
  name: 'HomeBanner',
  props: {
    option: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    list () {
      if (this.option && this.option.length) {
        return this.option
      } else if (this.option && !this.option.length) {
        return [{ src: require('@/assets/images/banner.jpg'), url: '' }]
      }
      return []
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  .home-banner {
    width: 100%;
    height: 480px;
    img {
      width: 100%;
      height: 100%;
    }
    img[pointer] {
      cursor: pointer;
    }
    /deep/ .el-carousel__button {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
    /deep/ .el-carousel__indicator.is-active button {
      width: 24px;
      border-radius: 4px;
    }
    /deep/ .el-carousel__arrow--left {
      left: 16%;
    }
    /deep/ .el-carousel__arrow--right {
      right: 16%;
    }
    /deep/ .el-carousel__arrow {
      font-size: 25px;
      width: 64px;
      height: 64px;
      background-color: rgba(0, 0, 0, .4);
      &:hover {
        background-color: rgba(0, 0, 0, .45);
      }
    }
  }
</style>
