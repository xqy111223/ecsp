<template>
  <div class="live-broadcast" style="border: 1px solid red">
    <live-header :course="course" :audience="audience" :changeLive="changeLive" :full.sync="fullScreen"></live-header>
    <div class="video">
      <live-video :options="options" :full-screen.sync="fullScreen" :source="source"></live-video>
    </div>
  </div>
</template>

<script>
/*
* Description LiveBroadcast
* Created By yinmeng@codyy.com
* Created At 2019/10/14 15:48
*/
import LiveHeader from '@/portal/components/onlineclass/live/LiveHeader/index'
import { getLivePeopleData } from '@/api/onlineclass/live'
import { getCourseData } from '@/api/onlineclass/course'
import LiveVideo from '@/components/onlineclass/LiveVideo/index'

export default {
  name: 'LiveBroadcast',
  components: { LiveVideo, LiveHeader },
  props: {},
  data () {
    return {
      id: '',
      course: null,
      audience: [],
      fullScreen: false,
      source: 'https://interactive-examples.mdn.mozilla.net/media/examples/flower.mp4',
      options: {
        liveui: true,
        loop: true,
        controls: false,
        autoplay: 'any'
      }
    }
  },
  created () {
    this.id = this.$route.params.id
    // 查询课程详情
    this.getCourseData()
    this.getLivePeopleData()
  },
  methods: {
    async getCourseData () {
      const result = await getCourseData(this.id)
      this.course = result
      // 模拟播放数据
    },
    async getLivePeopleData () {
      const result = await getLivePeopleData(this.id)
      this.audience = result
      // 每30S刷新一次人数
      setTimeout(this.getLivePeopleData, 30 * 1000)
    },
    changeLive (type) {
    }
  }
}
</script>

<style scoped lang="scss">
  .live-broadcast {
    padding-top: 30px;
    > div {
      width: 1366px;
      margin: 0 auto;
    }
    > .video {
      margin-bottom: 60px;
    }
  }
</style>
