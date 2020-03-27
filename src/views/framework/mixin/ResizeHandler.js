import store from '@/store'

export default {
  data () {
    return {
      timer: null
    }
  },
  beforeMount () {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted () {
  },
  methods: {
    resizeHandler () {
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        const width = document.documentElement.clientWidth
        store.dispatch('SET_SCREEN_WIDTH', width > 1280 ? width : 1280)
      }, 30)
    }
  }
}
