<template>
  <!-- 课程点播-视屏区域 -->
  <div class="bro-video-area">
    <ul class="tab">
      <li type="MAIN" id="tab_main"
          :class="{on:currentIndex == 0}"
          :key="0"
          @mouseenter="enter($event, 0)"
          @click="changeVideoArea"
      >主讲教室
      </li>
      <li v-if="hasInter" type="ACTIVE" id="tab_active"
          :class="{on:currentIndex == 1}"
          :key="1"
          @mouseenter="enter($event, 1)"
          @click="changeVideoArea"
      >互动画面
      </li>
    </ul>
    <div class="video-box">
      <div class="video-main" :class="{hide:!isMainOn}">
        <live-video :options="options"></live-video>
        <div class="video-pieces">
          视频片段
          <span>1
            <i class="video-on"></i>
          </span>
          <span>2</span>
          <span>3</span>
        </div>
      </div>
      <div class="video-avtive" :class="{hide:!isActiveOn}">
        <live-video :options="options"></live-video>
        <div class="video-pieces">
          <div class="video-pieces">
            视频片段
            <span>1
            <i class="video-on"></i>
          </span>
            <span>2</span>
            <span>3</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import LiveVideo from '@/components/onlineclass/LiveVideo/index'

export default {
  name: 'BroadcastVideo',
  components: {
    LiveVideo
  },
  data () {
    return {
      hasInter: true,
      currentIndex: 0,
      isMainOn: true,
      isActiveOn: false,
      mainVideoUrl: 'assets/video/test.mp4',
      options: {
        controls: true,
        loop: true
      }
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    // 鼠标移入视屏区域tab样式
    enter (event, index) {
      // var type = event.target.getAttribute('type')
      this.currentIndex = index
    },
    // 切换视频区域
    changeVideoArea () {
      var type = event.target.getAttribute('type')
      if (type === 'MAIN') { // 切换到主讲教室
        this.currentIndex = 0
        this.isMainOn = true
        this.isActiveOn = false
      } else { // 切换到互动课堂
        this.currentIndex = 1
        this.isMainOn = false
        this.isActiveOn = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "index.scss";
</style>
