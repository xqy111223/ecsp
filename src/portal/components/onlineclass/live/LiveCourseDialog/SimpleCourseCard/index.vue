<template>
  <div class="simple-card-card">
    <div class="auto-hide">
      {{attendeeInfo.schoolInfo.name}}
    </div>
    <div class="color-label auto-hide">
      {{attendeeInfo.roomInfo.name}}
    </div>
    <div class="color-label auto-hide">
      {{attendeeInfo.teacherInfo.userName}}（{{attendeeInfo.teacherInfo.phone}}）
    </div>
    <div class="color-label">
      进入时间：{{time}}
    </div>
  </div>
</template>

<script>
/*
* Description SimpleCourseCard
* Created By yinmeng@codyy.com
* Created At 2019/10/17 16:49
*/
import dayjs from 'dayjs'

export default {
  name: 'SimpleCourseCard',
  props: {
    attendeeInfo: {
      type: Object,
      default () {
        return {
          schoolInfo: {},
          roomInfo: {},
          teacherInfo: {}
        }
      }
    }
  },
  computed: {
    time () {
      return this.attendeeInfo.joinTime ? dayjs(this.attendeeInfo.joinTime).format('HH:mm:ss') : '暂未进入'
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="scss">
  @import "./index.scss";
</style>
