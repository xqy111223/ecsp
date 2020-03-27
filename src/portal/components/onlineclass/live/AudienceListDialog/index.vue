<template>
  <el-dialog :visible.sync="visibleDialog" class="audience-list-dialog" title="用户列表" width="940px">
    <div>
      <el-form :inline="true" label-width="60px">
        <el-form-item label="区域：">
          <select-region></select-region>
        </el-form-item>
      </el-form>
    </div>
    <div class="cy-driver"></div>
    <span class="table-pager">{{audience.length}}</span>
    <div class="audience-list-dialog__content">
      <audience-item v-for="item in audience" :item="item" :key="item.id"></audience-item>
    </div>
  </el-dialog>
</template>

<script>
/*
* Description AudienceListDialog
* Created By yinmeng@codyy.com
* Created At 2019/10/17 19:31
*/
import SelectRegion from '../../../../../components/common/SelectRegion/index'
import AudienceItem from './AudienceItem/index'

export default {
  name: 'AudienceListDialog',
  components: { AudienceItem, SelectRegion },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    audience: { // 直播观看人信息
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    visibleDialog: {
      get () {
        return this.visible
      },
      set (value) {
        this.$emit('update:visible', value)
      }
    },
  },
  methods: {}
}
</script>

<style scoped lang="scss">
  @import "./index.scss";
</style>
