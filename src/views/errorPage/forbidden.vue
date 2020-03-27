<template>
  <div class="portal-forbidden">
  </div>
</template>

<script>
/*
* Description 门户禁用页面
* Created By Chasen (caoxin@codyy.com))
* Created At 2019/10/21 16:58
*/
export default {
  name: 'forbidden',
  props: {},
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="scss">
  .portal-forbidden {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 999;
    background: url("~@/assets/images/platform_forbidden.png") no-repeat center center;
    background-size: contain;
  }
</style>
