/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2020.01.07 11:36.
* @Author
* @Description 首页 门户banner - 左侧地图 绘制 - 组件
**/
<template>
  <div class='area-map'>
    <div @click="back" class="map-back" v-show="backShow"></div>
    <div class="map-wrap" ref="map"></div>
  </div>
</template>

<script>
export default {
  name: 'AreaMap',
  props: {
    mapSvgData: {
      type: [String, Object],
      default () {
        return []
      }
    },
    areaCode: [Number, String],
    colorSet: {
      type: Object,
      default () {
        return {
          color: '#adeaff',
          hover: '#2fc3ff',
          empty: '#ffffff'
        }
      }
    }
  },
  data () {
    return {
      backShow: false, // 控制返回按钮是否显示
      areaCodeMap: []
    }
  },
  mounted () {
    this.paper() // 绘制地图
  },
  watch: {
    /**
     *@Description
     *@Param
     *@Return 如果 `mapSvgData` 发生改变，这个函数就会运行.
     **/
    mapSvgData () {
      this.paper()
    }
  },
  methods: {
    /**
     * @description: 生成svg函数
     * @returns {}
     */
    paper () {
      if (this.mapSvgData) {
        // console.log('渲染地图 数据 接收****', this.mapSvgData)
        const fragment = document.createDocumentFragment() // 插入元素
        const div = document.createElement('div')
        div.innerHTML = this.mapSvgData
        fragment.appendChild(div)
        this.setStyle(fragment) // 地图相关样式、属性
        this.$refs.map.innerHTML = ''
        this.$refs.map.appendChild(fragment)
        this.activePath = null
        this.areaCodeMap.push(this.areaCode)
      }
      this.showBack()
    },
    /**
     * @description: 处理返回按钮是否显示
     * @returns {}
     */
    showBack () {
      if (this.areaCodeMap.length > 1) {
        this.backShow = true
      } else {
        this.backShow = false
      }
    },
    /**
     * @description: 设置SVG的样式
     * @param fragment 虚拟dom容器
     * @returns {}
     */
    setStyle (fragment) {
      const svg = fragment.querySelector('svg')
      svg.setAttribute('width', '480')
      svg.setAttribute('height', '480')
      svg.setAttribute('viewBox', '0 -40 600 600')
      // 开始处理样式
      const rects = Array.from(fragment.querySelectorAll('rect'))
      const texts = Array.from(fragment.querySelectorAll('text'))
      // .forEach(t => t.setAttribute('style', 'display:none'))
      Array.from(fragment.querySelectorAll('path')).forEach(path => {
        // 判断当前的path是否有学校信息（此处依赖数据结构）
        const text = path.getAttribute('areacode') ? texts.filter(r => r.getAttribute('areacode') === path.getAttribute('areacode')) : []
        if (path.getAttribute('areacode') && rects.some(r => r.getAttribute('areacode') === path.getAttribute('areacode'))) {
          // 存在学校
          path.setAttribute('style', `fill:${this.colorSet.color};`)
          path.setAttribute('data-hasSchool', 'true')
        } else { // 不存在学校
          path.setAttribute('style', `fill:${this.colorSet.empty};`)
          path.setAttribute('data-hasSchool', 'false')
        }
        const eventElem = [path]
        text.length && eventElem.push(text[0])
        this.addEvent(eventElem, 'mouseover', () => { // 移入事件
          path.setAttribute('style', `fill:${this.colorSet.hover};`)
        })
        this.addEvent(eventElem, 'mouseout', () => { // 移除事件
          if (path.getAttribute('data-hasSchool') === 'true') {
            path.setAttribute('style', `fill:${this.colorSet.color};`)
          } else {
            if (path.getAttribute('data-active') === 'true') {
              path.setAttribute('style', `fill:${this.colorSet.hover};`)
            } else {
              path.setAttribute('style', `fill:${this.colorSet.empty};`)
            }
          }
        })
        this.addEvent(eventElem, 'click', () => {
          this.$emit('clickmap', path.getAttribute('areacode'), path)
        })
      })
    },
    /**
     * @description: 设置为激活状态的元素
     * @param path 需要设置的元素
     * @returns {}
     */
    setActive (path) {
      if (this.activePath) {
        this.activePath.removeAttribute('data-active')
        this.activePath.setAttribute('style', `fill:${this.activePath.getAttribute('data-hasSchool') === 'true' ? this.colorSet.hover : this.colorSet.empty};`)
      }
      // 设置新节点
      path.setAttribute('data-active', 'true')
      path.setAttribute('style', `fill:${this.colorSet.hover}`)
      this.activePath = path
    },
    /**
     * @description: 方法说明
     * @param ele 事件元素
     * @param event 事件名称
     * @param callback 事件回调
     * @returns {}
     */
    addEvent (ele, event, callback) {
      ele.forEach(e => {
        e.addEventListener(event, callback)
      })
    },
    back () {
      // 返回上一级
      this.areaCode.pop() // 移除当前层级
      this.$emit('clickmap', this.areaCodeMap.pop(), null)
    }
  }
}
</script>

<style lang="scss" scoped>
  .area-map {
    min-height: 480px;
    .map-wrap {
      position: relative;
      text-align: center;
      /deep/ svg path {
        cursor: pointer;
        stroke: #5c81e9;
      }
      /deep/ svg text {
        cursor: pointer;
      }
    }
    .map-back {
      position: absolute;
      z-index: 99;
      top: 20px;
      left: 0px;
      width: 50px;
      height: 50px;
      background: url('~@/assets/map/back_icon1.png') no-repeat center center;
      background-size: contain;
    }
  }
</style>
