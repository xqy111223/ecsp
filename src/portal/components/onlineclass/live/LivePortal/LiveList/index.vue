<template>
  <div class="live-list">
    <div class="live-list__header">
      <span class="font-normal">{{title}}</span>
      <el-pagination small v-if="liveData.total > 8" layout="prev,slot, next" :current-page.sync="liveData.pageNum"
                     :total="liveData.total">
        <template v-slot>
          <span>{{`${liveData.pageNum}/${liveData.pageCount}`}}</span>
        </template>
      </el-pagination>
    </div>
    <div class="live-list__content">
      <live-card v-for="item in list" :key="item.id" :course="item"></live-card>
      <live-card class="empty"></live-card>
      <live-card class="empty"></live-card>
    </div>
  </div>
</template>

<script>
/*
* Description LiveList
* Created By yinmeng@codyy.com
* Created At 2019/10/11 14:44
*/
import LiveCard from '@/components/onlineclass/LiveCard/index'

export default {
  name: 'LiveList',
  components: { LiveCard },
  props: {
    title: {
      type: String,
      default: ''
    },
    liveData: {
      type: Object,
      default () {
        return { list: [], pageNum: 1, pageSize: 8, total: 0, pageCount: 1 }
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    list () {
      if (this.liveData.list) {
        return this.liveData.list.filter((l, i) => i < 8)
      } else {
        return []
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
  @import "./index.scss";
</style>
