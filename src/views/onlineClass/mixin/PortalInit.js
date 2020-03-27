import { mapActions, mapGetters } from 'vuex'
import { getSession, setSession } from '@/utils/auth'
import { getModel } from '@/api/onlineclass/portal'

export default {
  data () {
    return {
      portalInfo: { // 门户配置信息
        moduleLayoutBoxes: [], // 组件位置信息
        themeUrl: '', // 主题远程路径
        themeName: '', // 主题名称
        dpi: 1280 // 门户最小宽度
      },
      basePX: 40
    }
  },
  computed: {
    ...mapGetters([
      'screenWidth'
    ])
  },
  created () {
    this.initPortal()
  },
  beforeMount () {
  },
  mounted () {
  },
  beforeDestroy () {
    const css = document.querySelector('link[name="' + this.portalInfo.themeName + '"]')
    css && document.head.removeChild(css)
  },
  methods: {
    ...mapActions(['SET_MAIN_HEIGHT']),
    async initPortal () {
      const menuName = this.$route.name
      if (getSession(menuName)) {
        const res = getSession(menuName)
        this.handlePortalRes(JSON.parse(res))
      } else {
        const res = await getModel(window.location.host, this.key)
        setSession(menuName, JSON.stringify(res))
        this.handlePortalRes(res)
      }
    },
    handlePortalRes (res) {
      let mainY = 0
      let top = 0
      res.moduleLayoutBoxes.map((item) => {
        item.boxContent = JSON.parse(item.boxContent)
        if (mainY < item.boxContent.y) {
          mainY = item.boxContent.y
          top = (item.boxContent.y - 1) * 40 + item.boxContent.sizey * 40
        }
      })
      this.portalInfo = { ...this.portalInfo, ...res }
      if (this.portalInfo.themeUrl) {
        const css = document.createElement('link')
        css.href = this.portalInfo.themeUrl
        css.rel = 'stylesheet'
        css.type = 'text/css'
        css.setAttribute('name', this.portalInfo.themeName)
        document.head.appendChild(css)
      }
      this.SET_MAIN_HEIGHT(top)
    },
    compStyle (portal) {
      const dpi = parseInt(this.portalInfo.dpi) || 1280
      const minWidth = dpi - 80
      const style = {
        height: portal.boxContent.sizey * this.basePX + 'px',
        maxHeight: portal.boxContent.sizey * this.basePX + 'px',
        position: 'absolute',
        top: (portal.boxContent.y - 1) * this.basePX + 'px',
        overflow: 'hidden'
      }
      if (this.screenWidth <= minWidth && portal.boxContent.sizex !== 24) { // 组件最小宽度 当小于浏览器窗口的时候固定宽度
        style.left = 40 + 'px'
        style.right = 40 + 'px'
        style.width = minWidth + 'px'
      } else {
        if (portal.boxContent.sizex === 24) {
          style.left = 0
          style.right = 0
          style.width = this.screenWidth + 'px'
        } else {
          let width = portal.boxContent.sizex * (this.screenWidth / 24)
          if (width <= minWidth && (portal.boxContent.sizex + ((portal.boxContent.x - 1) * 2)) === 24) {
            width = minWidth
            const diff = (this.screenWidth - minWidth) / 2
            style.left = diff + 'px'
            style.width = width + 'px'
          } else {
            style.left = (portal.boxContent.x - 1) * (this.screenWidth / 24) + 'px'
            style.width = width + 'px'
          }
        }
      }
      // 如果只有一个组件，并且设置了实际高度
      if (this.portalInfo.moduleLayoutBoxes.length === 1 && portal.boxContent.heightType === 3) {
        style.position = 'relative'
        delete style.height
        delete style.maxHeight
        this.SET_MAIN_HEIGHT(null)
      }
      return style
    }
  },
  watch: {
    'screenWidth' (o, n) {
      this.initPortal()
    }
  }
}
