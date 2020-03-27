<template>
  <div id="app">
    <router-view :key="getKey"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getPlatformSetting, queryPlatformTerm } from '@/api/common'
import { getPlatformData } from '@/api/common/login'

export default {
  name: 'App',
  data () {
    return {
      loading: true,
    }
  },
  computed: {
    ...mapGetters(['baseUserId', 'activeNavIndex', 'baseAreaId', 'baseSchoolId']),
    getKey () {
      return this.$router.path
    }
  },
  created () {
    this.loading = this.$loading({
      lock: true,
      text: '平台正在认证加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(255,255,255,0.1)'
    })
  },
  mounted () {
    this.checkPlatform()
  },
  methods: {
    ...mapActions(['SET_TOKEN', 'OVER_AUTHORIZATION', 'PASS_AUTHORIZATION', 'SEARCH_PLATTERMLIST', 'FAIL_AUTHORIZATION', 'LOGOUT']),
    /**
     * 获取平台信息 判断平台是否被注册
     * @returns {Promise<void>}
     */
    async checkPlatform () {
      try {
        const domain = window.location.host
        const res = await getPlatformData(domain)
        // this.SET_TOKEN(res.token)
        this.loading.close()
        this.OVER_AUTHORIZATION() // 结束认证
        if (res.status) { // 认证成功
          this.PASS_AUTHORIZATION(res)
          !this.baseUserId && this.SET_TOKEN(res.token) // 用户若是没登陆采用游客token
          if (this.activeNavIndex !== '/') {
            await this.initPlatformInfo() // await判断是否是首页，若不是当获取基础数据后再访问
            this.$router.push({ path: this.activeNavIndex, query: { _t: new Date().getTime() } })
          } else {
            this.$router.push({ path: this.activeNavIndex, query: { _t: new Date().getTime() } })
            this.initPlatformInfo()
          }
        } else {
          this.FAIL_AUTHORIZATION()
          this.LOGOUT() // 认证失败 清除登录信息
          this.$router.push('/forbidden')
        }
      } catch (e) {
        this.loading.close()
        this.FAIL_AUTHORIZATION()
        this.LOGOUT() // 认证失败 清除登录信息
        this.$router.push('/forbidden')
      }
    },
    /**
     * 获取平台基础数据
     */
    initPlatformInfo () {
      return Promise.all([this.gradeInitData(),
        this.subjectInitData(),
        this.getTermList()])
    },
    /**
     *@Description
     *@Param
     *@Return 获取平台年级数据
     **/
    gradeInitData () {
      const params = {
        areaId: this.baseAreaId,
        schoolId: this.baseSchoolId,
        preIds: '', // 除了type为SEMESTER，其他请求必传
        type: '', // 学段：SEMESTER、年级：GRADE、学科：SUBJECT、版本：EDITION、分册：VOLUME
      }
      console.log('年级', params)
    },
    /**
     * @description: 获取平台学科信息列表
     * @param
     * @returns {}
     */
    subjectInitData () {
      console.log('学科')
    },
    /**
     * 获取平台学期列表
     */
    async getTermList () {
      const params = {
        areaId: this.baseAreaId
      }
      const res = await queryPlatformTerm(params)
      this.SEARCH_PLATTERMLIST(res)
    },
    /**
     * 获取平台配置
     */
    async getPlatSetting () {
      getPlatformSetting()
    }
  }
}
</script>

<style scoped>

</style>
