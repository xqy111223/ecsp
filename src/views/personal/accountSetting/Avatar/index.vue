<template>
  <div class="account-setting--avatar">
    <head-cropper></head-cropper>
  </div>
</template>

<script>
/*
* Description 修改头像
* Created By Chasen
* Created At 2019/9/19 18:23
*/
import HeadCropper from '@/components/personal/HeadCropper'
export default {
  name: 'Avatar',
  data () {
    return {}
  },
  props: {},
  components: {
    HeadCropper
  },
  methods: {}
}
</script>
<style scoped lang="scss">
  .account-setting--avatar {
  }
</style>
