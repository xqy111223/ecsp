/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.12.31 10:16.
* @Author
* @Description 门户首页 - 名师推荐 模块 - 入口
**/
<template>
  <div class="recommend-famous-teachers" v-if="teacherList && teacherList.length > 4">
    <div class="home-title"><i class="el-icon-custom-recommend-teachers"></i>名师推荐</div>
    <div class="teacher-list">
      <teacher-card :key='item.id' :teacher="item" v-for='item in teacherList'></teacher-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TeacherCard from './TeacherCard'
import { famousData } from '@/api/onlineclass/home' // 名师推荐

export default {
  name: 'HomeTeacherList',
  components: { TeacherCard },
  data () {
    return {
      teacherList: []
    }
  },
  computed: {
    ...mapGetters(['basePlatformId', 'platformType']) // 平台id'、 0是区域,1是学校
  },
  created () {
    this.initTeacherList() // 名师推荐 - 数据
  },
  mounted () {

  },
  methods: {
    /**
     *@Description
     *@Param
     *@Return 门户首页 - 名师推荐.
     **/
    initTeacherList: function () {
      famousData({ basePlatformId: this.basePlatformId }).then((res) => {
        this.teacherList = res
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .recommend-famous-teachers {
    .teacher-list {
      display: flex;
      justify-content: space-between;
    }
    .home-title {
      font-size: 24px;
      font-weight: bold;
      line-height: 1;
      margin-top: 60px;
      margin-bottom: 30px;
      color: #8696ac;
      i {
        font-weight: normal;
        margin-right: 10px;
        color: #e2bf7e;
      }
    }
  }
</style>
