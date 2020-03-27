<template>
  <div class="live-card" :style="`height:${course && course.status===1?274:250}px`">
    <div>
      <span class="live-card__status font-small" :status="course && status.type">{{course &&status.text}}</span>
    </div>
    <div>
      <div class="live-card__title auto-hide">{{course && title}}</div>
      <div class="live-card__region font-small color-label auto-hide">{{course && areaPathName}}</div>
      <div class="live-card__school font-small color-label auto-hide">{{course && schoolName}}</div>
      <div class="live-card__datetime font-small color-label auto-hide" v-if="course && course.status!==1">
        {{course && startTime}}
      </div>
      <div class="live-card__teacher">
        <img :src="course && teacher.headPic">
        <span class="font-small color-label">{{course && teacher.userName}}</span>
      </div>
    </div>
    <div v-if="course && course.status===1" class="live-card__button">
      <el-button size="mini" type="primary" @click="playLiveCourse">观看直播</el-button>
      <span><i class="el-icon-custom-live-time"></i>&nbsp;<span>{{course && realTime}}</span></span>
    </div>
  </div>
</template>

<script>
/*
* Description LiveCard
* Created By yinmeng@codyy.com
* Created At 2019/10/11 14:35
*/
import dayjs from 'dayjs'

export default {
  name: 'LiveCard',
  props: {
    course: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      diffTime: 0,
      startTimer: true
    }
  },
  computed: {
    status () {
      if (this.course.status === 0) {
        const second = new Date(this.course.startTime).getTime() - new Date().getTime()
        if (second < (30 * 60 * 1000)) { // 时间小于30分钟
          return { type: 'COMING', text: '即将开始' }
        } else {
          return { type: 'INIT', text: '未开始' }
        }
      } else if (this.course.status === 1) {
        return { type: 'PROCESS', text: '直播中' }
      } else {
        return { type: 'END', text: '已结束' }
      }
    },
    startTime () {
      return dayjs(this.course.startTime).format('YYYY-MM-DD HH:mm')
    },
    areaPathName () {
      return this.course.attentdeeList.filter(a => a.attendeeType === 'MASTER')[0].areaInfo.areaNamePath
    },
    schoolName () {
      return this.course.attentdeeList.filter(a => a.attendeeType === 'MASTER')[0].schoolInfo.schoolName
    },
    teacher () {
      return this.course.attentdeeList.filter(a => a.attendeeType === 'MASTER')[0].teacherInfo
    },
    title () {
      return this.course.courseExt.gradInfo.name + '  ' + this.course.courseExt.subjectInfo.name
    },
    realTime () {
      // 计算实时时间
      return dayjs(946656000000 + this.diffTime).format('HH:mm:ss')
    }
  },
  mounted () {
    if (this.course && this.course.status === 1) {
      this.calcTime()
    }
  },
  methods: {
    calcTime () {
      this.diffTime = (new Date().getTime() - dayjs(this.course.realStartTime).valueOf())
      // 继续循环
      setTimeout(() => {
        this.startTimer && this.calcTime()
      }, 800)
    },
    playLiveCourse () {
      this.$router.push({ name: 'LiveBroadcast', params: { id: this.course.id } })
    }
  },
  beforeDestroy () {
    // 销毁时间计算
    this.startTimer = false
  }
}
</script>

<style scoped lang="scss">
  @import "./index.scss";
</style>
