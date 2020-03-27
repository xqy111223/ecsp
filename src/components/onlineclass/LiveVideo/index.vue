<template>
  <div class="live-video">
    <video ref="video" class="video-js vjs-default-skin vjs-big-play-centered">
    </video>
  </div>
</template>

<script>
/*
* Description index
* Created By yinmeng@codyy.com
* Created At 2019/10/15 19:33
*/
import 'video.js/dist/video-js.min.css'
import videojs from 'video.js'

export default {
  name: 'LiveVideo',
  props: {
    fullScreen: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    source: {
      type: String,
      default () {
        return 'https://interactive-examples.mdn.mozilla.net/media/examples/flower.mp4'
      }
    }
  },
  watch: {
    fullScreen: {
      immediate: true,
      handler () {
        if (this.fullScreen) {
          this.player && this.player.requestFullscreen()
        } else {
          this.player && this.player.exitFullscreen()
        }
      }
    },
    source: {
      handler () {
        if (this.source) {
          this.player.src(this.source)
        }
      }
    }
  },
  data () {
    return {
      lastTime: null,
      player: null
    }
  },
  created () {
  },
  mounted () {
    this.player = videojs(this.$refs.video, {
      ...{
        autoplay: false,
        fluid: true,
        preload: 'auto',
        controls: true,
        poster: require('@/assets/images/bg_video.png'),
        loop: false,
        controlBar: {
          remainingTimeDisplay: false, // 剩余时间
          currentTimeDisplay: true, // 当前时间
          durationDisplay: true, // 总时间
        },
        errorDisplay: false
      },
      ...this.options,
      height: Math.floor(this.$refs.video.offsetWidth / 16 * 9) + 'px'
    }, () => {
      console.log('onPlayerReady')
    })
    if (this.source) {
      this.player.src(this.source)
    }
    this.player.on('fullscreenchange', () => {
      this.$emit('update:fullScreen', (document.fullscreenElement && true) || false)
    })
  },
  methods: {},
  beforeDestroy () {
    this.player.dispose()
  }
}
</script>

<style scoped lang="scss">
  @import './index.scss';
</style>
