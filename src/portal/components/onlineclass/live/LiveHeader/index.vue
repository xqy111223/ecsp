<template>
  <div class="live-header">
    <div class="live-header__left auto-hide">
      {{areaPathName}} &nbsp;&nbsp;&nbsp;&nbsp; {{schoolName}} &nbsp;&nbsp;&nbsp;&nbsp; {{courseInfo}}
    </div>
    <div class="live-header__middle">
      <a type="btn" color="primary" @click="audienceDialogVisible=!courseDialogVisible">共{{audience.length}}人观看</a>
      <el-button v-if="haveReceive" class="no-radius" size="mini" type="custom" @click="changeLivePicture">{{livePictureType?'互动画面':'主讲画面'}}</el-button>
    </div>
    <div class="live-header__right">
      <span @click="courseDialogVisible=!courseDialogVisible"><i class="el-icon-custom-course-information"></i> 课程信息</span>
      <span v-if="full" @click="changeFullScreen"><i class="el-icon-custom-cancel-full-screen"></i>退出</span>
      <span v-else @click="changeFullScreen"><i class="el-icon-custom-full-screen"></i>全屏</span>
    </div>
    <live-course-dialog :visible.sync="courseDialogVisible" :course="course"></live-course-dialog>
    <audience-list-dialog :visible.sync="audienceDialogVisible" :audience="audience"></audience-list-dialog>
  </div>
</template>

<script>
/*
* Description LiveHeader
* Created By yinmeng@codyy.com
* Created At 2019/10/14 15:49
*/
import LiveCourseDialog from '../LiveCourseDialog/index'
import AudienceListDialog from '../AudienceListDialog/index'

export default {
  name: 'LiveHeader',
  components: { AudienceListDialog, LiveCourseDialog },
  props: {
    course: {
      type: Object,
      default () {
        return null
      }
    },
    audience: { // 直播观看人信息
      type: Array,
      default () {
        return []
      }
    },
    changeLive: { // 切换直播画面的函数
      type: Function
    },
    full: {
      type: Boolean
    },
  },
  data () {
    return {
      livePictureType: 0, // 直播画面类型 0 主讲画面 1 互动画面
      courseDialogVisible: false,
      audienceDialogVisible: false
    }
  },
  computed: {
    haveReceive () {
      return ((!this.course || this.course.courseAttendeeInfo.some(a => a.attendeeType === 'RECEIVE')) && true) || false
    },
    courseInfo () {
      if (!this.course) {
        return ''
      }
      return `${this.course.courseAttendeeInfo.filter(a => a.attendeeType === 'MASTER')[0].teacherInfo.userName}-${this.course.courseExtInfo.gradInfo.name}-${this.course.courseExtInfo.subjectInfo.name}`
    },
    schoolName () {
      if (!this.course) {
        return ''
      }
      return this.course.courseAttendeeInfo.filter(a => a.attendeeType === 'MASTER')[0].schoolInfo.name
    },
    areaPathName () {
      if (!this.course) {
        return ''
      }
      return this.course.courseAttendeeInfo.filter(a => a.attendeeType === 'MASTER')[0].areaInfo.areaNamePath
    },
  },
  methods: {
    changeLivePicture () {
      // 根据当前的画面类型进行切换，通知外部
      this.livePictureType = this.livePictureType ? 0 : 1
      this.changeLive && this.changeLive(this.livePictureType)
    },
    changeFullScreen () {
      this.$emit('update:full', !this.full)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./index.scss";
</style>
