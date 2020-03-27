<template>
  <div class="course-portal">
    <course-selection @change="initCourseList" :subject-id="subjectId">
      <template>
        <span class="el-icon-custom-course"></span>
        <span class="title">课程中心</span>
      </template>
    </course-selection>
    <div class="course-portal_layout">
      <span class="table-pager">{{courseInfo.total}}</span>
    </div>
    <div class="course-portal__list">
      <course-card v-for="item in courseInfo.list" :course="item" :key="item.id" @click.native="playCourse(item)"></course-card>
      <course-card class="empty"></course-card>
      <course-card class="empty"></course-card>
    </div>
    <div class="course-portal_pager">
      <el-pagination background layout="prev, pager, next, jumper,slot" :pager-count="5" :total="1000">
        <el-button type="primary">确定</el-button>
      </el-pagination>
    </div>
  </div>
</template>

<script>
/*
* Description 课程中心门户组件
* Created By Chasen (caoxin@codyy.com))
* Created At 2019/10/9 16:35
*/
import { getCourseListData } from '@/api/onlineclass/course'
import CourseSelection from '@/components/onlineclass/CourseSelection'
import CourseCard from '@/components/onlineclass/CourseCard/index'

export default {
  name: 'CoursePortal',
  props: {
    subjectId: {
      type: String
    }
  },
  components: { CourseCard, CourseSelection },
  data () {
    return {
      courseInfo: {
        list: [],
        total: 0
      },
    }
  },
  created () {
    this.initCourseList()
  },
  methods: {
    async initCourseList (query) {
      // 此处需要处理查询条件(默认 + subjectId + 用户过滤)
      const result = await getCourseListData(query)
      this.courseInfo = result
    },
    playCourse (item) {
      this.$router.push({ name: 'CourseBroadcast', params: { id: item.id } })
    }
  }
}
</script>

<style scoped lang="scss">
  .course-portal {
    .course-portal_layout {
      width: 1200px;
      margin: 32px auto 0px auto;
    }

    .course-portal__list {
      width: 1200px;
      margin: -14px auto 40px auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      > div {
        margin-top: 36px;
      }
    }

    .course-portal_pager {
      text-align: center;
    }
  }
</style>
