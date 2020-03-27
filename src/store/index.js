/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/4/1 14:55
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description 状态管理层 （久化状态插件，若需要则考虑，vuex-persistedstate）
 */

import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import createLogger from 'vuex/dist/logger'
import platform from './modules/platform'
import portal from './modules/portal'
import router from './modules/router'
import user from './modules/user'
import course from './modules/course'

Vue.use(Vuex)

// 判断环境 vuex提示log 生产环境中不使用
const debug = process.env.NODE_ENV !== 'prod'

const store = new Vuex.Store({
  getters,
  actions,
  modules: {
    platform,
    portal,
    router,
    user,
    course
  },
  plugins: debug ? [createLogger] : []
})

export default store
