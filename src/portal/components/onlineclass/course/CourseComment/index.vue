<template>
  <!-- 课程点播-评论区域 -->
  <div class="comment-box">
    <replay-input :level="0" :add-comment="addCommentFunc"></replay-input>
    <!------------------- 评论内容列表区域 ------------------->
    <div class="list-comment">
      <div class="total" v-if="totalComment > 0">
        全部评论<span>{{totalComment}}</span>
      </div>
      <div class="no-data" v-if="totalComment == 0"></div>
      <ul v-else class="list-container">
        <li class="item" v-for="(item, index) in commentData" :key="index" :data-id="item.blogCommentId">
          <!-- 一级评论 -->
          <div class="com-level1">
            <div class="com-leve-item">
              <img :src="item.headPic" alt="" class="com-avator"/>
              <div class="com-content" @mouseenter="enterComment(item)" @mouseleave="leaveComment(item)">
                <div class="com-info">
                  <span class="name">{{item.realName}}</span>
                  <span class="time">{{createTime(item.createTime)}}</span>
                </div>
                <div class="com-handle">
                    <span class="com-deconste" @click="deconsteComment"
                          :class="{show: item.isShowDeconste && isLogin && isSelf}">删除</span>
                  <span class="com-replay" :class="{show: item.isShowReplay}"
                        @click="replayComment(item)">回复<span>({{item.secondComments.length}})</span></span>
                  <span class="com-close" @click="closeComment(item)" :class="{show: item.isShowClose}">收起</span>
                </div>
                <div class="content">
                  {{item.commentContent}}
                </div>
              </div>
              <!-- 二级评论区域 -->
              <div class="com-level2" level="2">
                <div class="com-level2-box" :class="{hide: !item.isShowSecondCom}">
                  <replay-input :level="1"></replay-input>
                  <div class="com-level-items" v-if="item.secondComments.length > 0">
                    <div class="com-leve-item" v-for="(itemLevel2, indexLevel2) in item.secondComments"
                         :key="indexLevel2"
                         :sec-data-id="itemLevel2.blogCommentId">
                      <img src="" alt="" class="com-avator"/>
                      <div class="com-content w740" @mouseenter="enterComment(itemLevel2)"
                           @mouseleave="leaveComment(itemLevel2)">
                        <div class="com-info">
                          <span class="name">{{itemLevel2.realName}}</span>
                          <span class="time">{{createTime(itemLevel2.createTime)}}</span>
                        </div>
                        <div class="com-handle">
                            <span class="com-deconste" :class="{show: itemLevel2.isShowDeconste && isLogin && isSelf}"
                                  @click="deconsteComment">删除</span>
                          <span class="com-replay" :class="{show: itemLevel2.isShowReplay}"
                                @click="replayComment(itemLevel2)">回复</span>
                          <span class="com-close" :class="{show: itemLevel2.isShowClose}"
                                @click="closeComment(itemLevel2)">收起</span>
                        </div>
                        <div class="content">
                          {{itemLevel2.commentContent}}
                        </div>
                      </div>
                      <div :class="{hide: !itemLevel2.isShowSecondCom}">
                        <replay-input :level="2"></replay-input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="more-comment">查看更多评论</div>

  </div>
</template>

<script>
import { getBroadCommentData } from '@/api/onlineclass/course'
import ReplayInput from './ReplayInput'

import Vue from 'vue'

export default {
  name: 'CourseComment',
  components: {
    ReplayInput
  },
  data () {
    return {
      commentData: [],
      totalComment: 0,
      inputTextNum: 0,
      isLogin: true, // 是否登录
      isSelf: true // 是否本人
    }
  },
  created () {
    this.initPage()
  },
  mounted () {

  },
  methods: {
    initPage () {
      this.getCommentData()
    },
    // 获取评论数据
    getCommentData () {
      getBroadCommentData().then((res) => {
        this.commentData = res
        this.totalComment = res.length
      })
    },
    addCommentFunc (level, value) {
      if (level === 0) {

      } else {

      }
    },
    // 删除评论
    deconsteComment (event) {

    },
    // 点击一级评论回复，展示二级评论区域
    replayComment (item) {
      item.isShowDeconste = false
      item.isShowReplay = false
      if (item.isShowClose === undefined) { // 改变收起按钮展示状态
        Vue.set(item, 'isShowClose', true)
      } else {
        item.isShowClose = true
      }

      if (item.isShowSecondCom === undefined) { // 改变二级评论展示状态
        Vue.set(item, 'isShowSecondCom', true)
      } else {
        item.isShowSecondCom = true
      }
    },
    // 收起二级评论
    closeComment (item) {
      item.isShowClose = false
      item.isShowSecondCom = false
    },
    // 鼠标移入评论项展示删除回复按钮
    enterComment (item) {
      if (item.isShowSecondCom !== true) { // 二级评论展开时，收起按钮一直展示
        if (item.isShowDeconste === undefined) { // 通过每一组数据手动添加是否展示删除按钮的状态来控制删除回复按钮的展示
          Vue.set(item, 'isShowDeconste', 'true')
        } else {
          item.isShowDeconste = true
        }

        if (item.isShowReplay === undefined) {
          Vue.set(item, 'isShowReplay', 'true')
        } else {
          item.isShowReplay = true
        }
      }
    },
    leaveComment (item) {
      item.isShowDeconste = false
      item.isShowReplay = false
    },
    // 将创建时间转换为文字
    createTime (time) {
      const currentDate = new Date()
      const currentTime = currentDate.getTime()
      const date = new Date(time)
      const currentDay = currentDate.getDay()
      const timeDay = date.getDay()
      const currentYear = currentDate.getFullYear()
      const timeYear = currentDate.getFullYear()

      const interval = currentTime - time
      let timeStr = ''
      if (interval < 60 * 1000) { // 小于一分钟
        timeStr = '刚刚'
      } else if (interval <= 60 * 60 * 1000) { // 一分钟到1个小时以内
        timeStr = Number(interval / 1000 / 60).toFixed() + '分钟前'
      } else if (currentDay === timeDay) { // 今天
        timeStr = '今天' + date.Format('HH:mm')
      } else if (currentYear === timeYear) { // 今年
        timeStr = date.Format('MM-dd')
      } else {
        timeStr = date.Format('yyyy-MM-dd')
      }
      return timeStr
    }

  }
}
</script>

<style lang="scss" scoped>
  @import 'index.scss';
</style>
