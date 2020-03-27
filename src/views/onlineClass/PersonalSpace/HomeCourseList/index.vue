/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.12.26 09:47.
* @Author
* @Description 个人空间 - 首页 - 课程点播 组件
**/
<template>
  <div class="home-course-demand">
    <div class="home-title">
      <!-- 标题 课程数量 -->
      <i class="el-icon-custom-demand-courses"></i>课程点播
      <span class="font-normal ml20">共<span class="color-primary"> {{ pagination.total }} </span>节课程</span>
      <!-- 分页 -->
      <el-pagination :current-page.sync="pagination.pageNum" :total="pagination.total" class="fr" layout="prev,slot, next">
        <template v-slot>
          <span>{{`${pagination.pageNum} / ${pagination.pageCount}`}}</span>
        </template>
      </el-pagination>
    </div>
    <!-- 课程列表 -->
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
import CourseCard from '@/components/onlineclass/CourseCard/'

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
  data () {
    return {
      pagination: {
        total: 0, // 总数
        pageNum: 1, // 当前页数
        pageSize: 8, // 每页条数
        pageCount: 0, // 总页数
        isPaging: true // 是否分页
      },
      courseListData: []
    }
  },
  created () {
    this.initCourseList() // 课程列表初始化
  },
  mounted () {

  },
  computed: {
    ...mapGetters(['userId', 'basePlatformId', 'baseAreaId', 'baseSchoolId']),
    compStyle () {
      return {
        height: this.options.sizey * this.basePX - (25 + 60 + 30) + 36 + 'px',
        overflowY: 'auto'
      }
    }
  },
  methods: {
    /**
     *@Description
     *@Param
     *@Return 课程列表初始化.
     **/
    async initCourseList () {
      const params = {
        status: 2, // 课程状态：0:未开始，1：进行中，2：已结束，-1：取消
        areaId: this.baseAreaId, // 区域ID
        schoolId: this.baseSchoolId, // 学校ID
        platformId: this.basePlatformId, // 平台ID
        bookGradeId: '', // 年级ID
        classroomId: '', // 教室ID
        bookSubjectId: '', // 学科ID
        isSpaceDisplay: 1, // 是否空间展示：0：不展示，1：展示
      }
      const result = await courseMgt({ ...params, ...this.pagination })
      // console.log('课程点播***', result)
      this.pagination.total = result.total
      this.pagination.pageCount = result.pageCount
      this.courseListData = result.list
    },
    /**
     *@Description
     *@Param
     *@Return 课程点播 - 点击课程跳转到 详情页.
     **/
    playCourse (course) {
      this.$router.push({ name: 'CourseBroadcast', params: { id: course.courseId } })
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
      height: 40px;
      margin-top: 60px;
      margin-bottom: 30px;
      color: #8696ac;
      > span {
        font-weight: normal;
        margin-left: 20px;
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
