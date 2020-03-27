<template>
  <el-dialog class="live-course-dialog" :visible.sync="visibleDialog" width="690px" title="课程信息">
    <div class="live-course-dialog__master">
      <div>
        <span>{{course.courseExtInfo.gradInfo.name}}</span>
        <span>{{course.courseExtInfo.subjectInfo.name}}</span>
        <span class="color-label font-normal">进入时间：{{time}}</span>
      </div>
      <div class="color-label">
        <span>{{master.schoolInfo.name}}</span>
        <span>{{master.roomInfo.name}}</span>
        <span>{{master.teacherInfo.userName}}（{{master.teacherInfo.phone}}）</span>
      </div>
    </div>
    <div class="cy-driver"></div>
    <div class="live-course-dialog__receive">
      <div>听课教室<a type="btn" color="primary">{{course.courseAttendeeInfo.length - 1}}</a>间</div>
      <div class="course-list">
        <simple-course-card v-for="(item,index) in receives" :attendee-info="item" :key="`receive_${index}`"></simple-course-card>
        <simple-course-card class="empty"></simple-course-card>
      </div>
    </div>
  </el-dialog>
</template>

<script>
/*
* Description LiveVideo
* Created By yinmeng@codyy.com
* Created At 2019/10/14 15:49
*/
import SimpleCourseCard from './SimpleCourseCard/index'
import dayjs from 'dayjs'

export default {
  name: 'LiveCourseDialog',
  components: { SimpleCourseCard },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    course: {
      type: Object,
      default () {
        return {
          courseExtInfo: {},
          courseAttendeeInfo: [{}]
        }
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    visibleDialog: {
      get () {
        return this.visible
      },
      set (value) {
        this.$emit('update:visible', value)
      }
    },
    master () {
      return this.course.courseAttendeeInfo.filter(c => c.attendeeType === 'MASTER')[0]
    },
    receives () {
      return this.course.courseAttendeeInfo.filter(c => c.attendeeType === 'RECEIVE')
    },
    time () {
      // 根据结束时间减去开始时间，并计算
      return this.master.joinTime ? dayjs(this.master.joinTime).format('HH:mm:ss') : '暂未进入'
    }
  },
  created () {
  },
  methods: {}
}
</script>

<style scoped lang="scss">
  @import "./index.scss";
</style>
