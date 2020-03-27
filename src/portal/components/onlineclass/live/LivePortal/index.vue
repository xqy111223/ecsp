<template>
  <div class="live-portal">
    <course-selection>
      <template>
        <span class="el-icon-custom-live"></span>
        <span class="title">校园直播</span>
      </template>
    </course-selection>
    <div class="live-portal__content">
      <live-list title="正在直播" :live-data="livingList"
                 @changePage="(index)=>{getCourseListData({status:0,pageNum:index},livingList)}"></live-list>
      <live-list title="未开始" :live-data="initList"
                 @changePage="(index)=>{getCourseListData({status:1,pageNum:index},livingList)}"></live-list>
      <live-list title="已结束" :live-data="endList"
                 @changePage="(index)=>{getCourseListData({status:2,pageNum:index},livingList)}"></live-list>
    </div>
  </div>
</template>

<script>
/*
* Description LivePortal
* Created By yinmeng@codyy.com
* Created At 2019/10/11 9:48
*/
import CourseSelection from '@/components/onlineclass/CourseSelection/index'
import { getCourseListData } from '@/api/onlineclass/course'
import LiveList from './LiveList/index'

export default {
  name: 'LivePortal',
  components: { LiveList, CourseSelection },
  props: {},
  data () {
    return {
      livingList: {}, // 存放直播中数据
      endList: {}, // 存放已结束数据
      initList: {}, // 存放未开始数据
      where: {} // 存放查询过滤条件
    }
  },
  created () {
    // 初始化数据加载，默认为无任何条件
    this.initData()
  },
  methods: {
    initData () {
      this.getCourseListData({ status: 0, pageNum: 1 })
      this.getCourseListData({ status: 1, pageNum: 1 })
      this.getCourseListData({ status: 2, pageNum: 1 })
    },
    async getCourseListData (query) {
      const result = await getCourseListData(query)
      if (query.status === 0) {
        this.initList = { ...result, list: result.list.filter(r => r.status === query.status) }
      } else if (query.status === 1) {
        this.livingList = { ...result, list: result.list.filter(r => r.status === query.status) }
      } else {
        this.endList = { ...result, list: result.list.filter(r => r.status === query.status) }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .live-portal {
    .live-portal__content {
      padding-bottom: 60px;

      > div {
        padding-top: 24px;
        width: 1200px;
        margin: 0 auto;
      }
    }
  }
</style>
