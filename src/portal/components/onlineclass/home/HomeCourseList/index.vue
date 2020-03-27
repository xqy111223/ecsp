/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.12.31 10:18.
* @Author
* @Description 门户首页 - 课程点播 模块 - 入口
**/
<template>
  <!-- 首页-课程点播 -->
  <div class="home-course-demand">
    <div class="home-title">
      <i class="el-icon-custom-demand-courses"></i>课程点播<span @click="handleMoreClick" class="a-more">更多</span></div>
    <div :style="compStyle" class="cor-list-container">
      <course-card :course="item" :key="item.baseSubjectId" @click.native="playCourse(item)" v-for="item in courseListData"></course-card>
      <course-card class="empty"></course-card>
      <course-card class="empty"></course-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { courseMgt } from '@/api/personal/appMgt' // 通用接口 - 区域、学校、学生、教师、家长门户：首页课程点播；区域、学校门户：校园直播、课程中心；区域、学校、教师空间：课程管理、实时轮询
import CourseCard from '@/components/onlineclass/CourseCard'

export default {
  name: 'HomeCourseList',
  components: { CourseCard },
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    basePX: {
      type: Number,
      default: 40
    }
  },
  computed: {
    ...mapGetters(['userId', 'baseAreaId', 'baseSchoolId', 'basePlatformId']),
    compStyle () {
      return {
        height: this.options.sizey * this.basePX - (25 + 60 + 30) + 36 + 'px',
        overflowY: 'auto'
      }
    }
  },
  data () {
    return {
      courseListData: [] // 点播 课程查询数据
    }
  },
  created () {
    this.initCourseList()
  },
  mounted () {

  },
  methods: {
    /**
     *@Description
     *@Param
     *@Return 课程点播 - 列表初始化.
     **/
    async initCourseList () {
      const params = {
        status: 2, // 课程状态：0:未开始，1：进行中，2：已结束，-1：取消
        areaId: this.baseAreaId, // 区域ID
        platformId: this.basePlatformId, // 平台ID
        pageNum: 1, // 当前页码
        pageSize: 8, // 每页显示条数
        // schoolId: this.baseSchoolId, // 学校ID
        // bookGradeId: '', // 年级ID
        // classroomId: '', // 教室ID
        // bookSubjectId: '', // 学科ID
        // isSpaceDisplay: 1, // 是否空间展示：0：不展示，1：展示
      }
      const result = await courseMgt(params)
      this.courseListData = result.list.slice(0, 8)
    },
    /**
     *@Description
     *@Param
     *@Return 课程点播 - 更多跳转到课程中心.
     **/
    handleMoreClick () {
      this.$router.push({ name: 'Course' })
    },
    playCourse (course) {
      this.$router.push({ name: 'CourseBroadcast', params: { id: course.id } })
    }
  }
}
</script>

<style lang="scss" scoped>
  .home-course-demand {
    .home-title {
      font-size: 24px;
      font-weight: bold;
      line-height: 1;
      margin-top: 60px;
      margin-bottom: 30px;
      color: #8696ac;
      .a-more {
        font-size: 12px;
        font-weight: normal;
        line-height: 24px;
        float: right;
        cursor: pointer;
        text-decoration: none;
        color: #999;
      }
      i {
        font-size: 24px;
        font-weight: normal;
        margin-right: 10px;
        color: #2db9f4;
      }
    }
    .cor-list-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: -25px;
      > div {
        margin-top: 25px;
      }
    }
  }
</style>
