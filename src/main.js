/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/4/1 11:52
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description  全国教育云主入口
 */
import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import { errorHandle } from './utils/error'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import './styles/normalize.css' // css reset
import '../theme/default/css/index.css' // element-ui 自定义主题入口
import '../theme/default/globalVars.scss' // 主题变量库
import './assets/iconfont/iconfont.css'

import PortalComponents from './portal/components' // 门户组件库
import store from './store'
import router from './router'
import App from './App.vue'
import MessageMixin from './components/common/mixins/message'
import { clearSession } from '@/utils/auth'
import config from './config/config'

Vue.config.errorHandler = errorHandle
clearSession() // 刷新清除session缓存
// 在开发环境中开启，在生产环境中关闭
if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true
} else {
  Vue.config.devtools = false
}
if (process.env.NODE_ENV === 'development') { // 开发环境下
// if (true) { // 开发环境下
  require('./mock')
}

try {
  Sentry.init({
    dsn: config.sentryDNS,
    integrations: [new Integrations.Vue({ Vue, attachProps: true })],
  })
} catch (e) {
  console.error(e)
}

Vue.use(ElementUI)
Vue.use(PortalComponents)
Vue.mixin(MessageMixin)

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

