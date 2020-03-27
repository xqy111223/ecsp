<template>
  <div class="audience-item">
    <div class="auto-hide">
      <img :src="item.headPic" class="logo">
      <a type="link">{{item.userName}}</a>
    </div>
    <div class="auto-hide color-label">{{item.areaInfo.areaNamePath}}</div>
    <div class="auto-hide color-label">{{schoolName}}</div>
    <div class="auto-hide color-label">{{item.roleInfo.roleName}}</div>
    <div class="auto-hide color-label">{{className}}</div>
  </div>
</template>

<script>
/*
* Description AudienceItem
* Created By yinmeng@codyy.com
* Created At 2019/10/17 19:35
*/
export default {
  name: 'AudienceItem',
  props: {
    item: {
      type: Object
    }
  },
  data () {
    return {}
  },
  computed: {
    className () {
      return this.item.studentExt ? this.item.studentExt.classInfo.className : ''
    },
    schoolName () {
      return this.schoolInfo ? this.item.schoolInfo.name : '-'
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
  @import "./index.scss";
</style>
