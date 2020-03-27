/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.12.25 13:55.
* @Author
* @Description  教师、家长、学生 个人空间 - 主页
**/
<template>
  <div class="personal-space">
    <!-- banner 区域 -->
    <space-header></space-header>
    <!-- main 区域 -->
    <div class="home-container ">
      <!-- 课程表 区域 -->
      <class-table></class-table>
      <!-- 课程点播 区域 -->
      <HomeCourseList></HomeCourseList>
      <div class="home-title"><i class="el-icon-custom-recent-visitors"></i>最近访客</div>
      <!-- 最近访客 列表 区域 -->
      <ul class="head-portrait">
        <li :key="item.id" :title="item.name" v-for="item in list">
          <img :src="item.url"/>
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ClassTable from './ClassTable/'
import SpaceHeader from './SpaceHeader/'
import HomeCourseList from './HomeCourseList'
import { visitorsData } from '@/api/personal/portalConfig' // 最近访客
// import PortalInit from '../mixin/PortalInit'

export default {
  name: 'PersonalSpace',
  // mixins: [PortalInit],
  components: { HomeCourseList, ClassTable, SpaceHeader },
  props: {},
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getVisitorsData()
  },
  methods: {
    /**
     *@Description
     *@Param
     *@Return 获取 - 个人空间 - 首页 - 最近访客.
     **/
    getVisitorsData () {
      const params = {}
      visitorsData(params).then(res => {
        this.list = res
        // console.log('最近访客*****', res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  /* 个人空间 主页 相关样式 */
  .personal-space {
    /* 最近访客 标题 */
    .home-title {
      font-size: 24px;
      font-weight: bold;
      line-height: 1;
      margin-top: 43px;
      margin-bottom: 30px;
      color: #8696ac;
      .el-icon-custom-recent-visitors {
        font-size: 22px;
        font-weight: normal;
        margin-right: 10px;
        color: #ffae3a;
      }
    }
    .home-container {
      width: 1200px;
      margin: auto;
    }
    /* 最近访客 样式区域 */
    .head-portrait {
      overflow: hidden;
      li {
        float: left;
        width: 50px;
        img {
          width: 100%;
          height: 50px;
        }
        p {
          overflow: hidden;
          width: 100%;
          margin-top: 10px;
          text-align: center;
          white-space: nowrap;
          text-overflow: ellipsis;
          word-break: keep-all;
        }
      }
      li:not(:last-child) {
        margin-right: 32px;
      }
    }
  }
</style>
