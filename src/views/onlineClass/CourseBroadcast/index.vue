<template>
  <!-- 课程点播 vue文件-->
  <div class="bro-area">
    <div class="bro-head-container">
      <broadcast-head></broadcast-head>
    </div>
    <div class="bro-body-container clearfix">
      <div class="bro-relative-container">
        <broadcast-course-info></broadcast-course-info>
        <broadcast-student-work></broadcast-student-work>
        <broadcast-teach-material></broadcast-teach-material>
      </div>
      <div class="bro-content-container">
        <broadcast-video></broadcast-video>
        <course-comment></course-comment>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
import BroadcastHead from '@/portal/components/onlineclass/course/BroadcastHead/index'
import BroadcastCourseInfo from '@/portal/components/onlineclass/course/BroadcastCourseInfo/index'
import BroadcastStudentWork from '@/portal/components/onlineclass/course/BroadcastStudentWork/index'
import BroadcastTeachMaterial from '@/portal/components/onlineclass/course/BroadcastTeachMaterial/index'
import BroadcastVideo from '@/portal/components/onlineclass/course/BroadcastVideo/index'
import CourseComment from '@/portal/components/onlineclass/course/CourseComment/index'

export default {
  name: 'OC_COURSE_BROADCAST',
  components: { CourseComment, BroadcastVideo, BroadcastTeachMaterial, BroadcastStudentWork, BroadcastCourseInfo, BroadcastHead },
  data () {
    return {
      id: null
    }
  },
  created () {
    this.id = this.$route.params.id
  },
  mounted () {
  },
  methods () {
  }
}
</script>

<style lang="scss" scoped>
  ·
  .bro-head-container {
    width: 100%;
    min-height: 90px;
    background: #fff;
  }
  .bro-body-container {
    width: 1200px;
    margin: 0 auto;
    position: relative;
  }
  .bro-area {
    height: 100%;
    background: #f7f6fb;
  }

  .bro-relative-container {
    margin-top: -94px;
    float: right;
  }
  .bro-content-container {
    float: left;
    width: 960px;
    margin-bottom: 60px;
  }

</style>
