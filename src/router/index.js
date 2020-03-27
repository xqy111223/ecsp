/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/4/1 14:55
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description
 */
import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import constantRouter from './constantRouter'

// vue-router 重复路由有点击报错BUG修复
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouter,
  dynamicPersonalRoutes: false // 加载个人空间路由菜单
})

// /**
//  * 判断是否要登录
//  * @param path
//  * @returns {boolean}
//  */
// const blackList = ['/personal']// 访问黑名单(需要登录)
// const isAccess = function (path) {
//   let access = true
//   for (const i in blackList) {
//     if (path.indexOf(blackList[i]) > -1) {
//       access = false
//       break
//     }
//   }
//   return access
// }

/**
 * 路由切换 刷新当前页的基础信息
 * @param to
 */
const refreshPageInfo = (to) => {
  store.dispatch('CHANGE_NAV_INDEX', to.path)
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = '互动课堂平台'
  }
}

router.beforeEach((to, from, next) => {
  // console.log(to, from, next, store.getters.checkingPlatform, store.getters.checkAuthorization)
  if (!store.getters.checkingPlatform && store.getters.checkAuthorization) { // 判断平台是否检测通过
    refreshPageInfo(to)
    if (store.getters.baseUserId) {
      if (!router.options.dynamicPersonalRoutes || !store.getters.personalMenus.length) { // 登录 获取个人空间路由信息
        // 个人空间路由加载
        store.dispatch('PERSONAL_ROUTERS').then((routes) => {
          router.options.dynamicPersonalRoutes = true
          router.addRoutes(routes)
          next({ path: to.redirectedFrom || to.path, replace: true })
        })
      } else {
        to.name === 'forbidden' ? next('/') : next() // 刷新当前页若是forbidden页面跳转首页
        // next()
      }
    } else {
      if (router.options.dynamicPersonalRoutes) { // 登出后 个人空间路由还原未加载状态
        router.options.dynamicPersonalRoutes = false
      } else {
        to.name === 'forbidden' ? next('/') : next() // 刷新当前页若是forbidden页面跳转首页
      }
    }
  } else {
    if (store.getters.checkingPlatform) {
      store.dispatch('CHANGE_NAV_INDEX', to.redirectedFrom || to.path) // 记录初始刷新页面路径
      next(false)
    } else {
      // 通过认证直接访问当前路由页面 否则直接停止使用跳转forbidden
      document.title = '互动课堂平台-未认证'
      to.name === 'forbidden' ? next() : next('/forbidden')
    }
  }
})

export default router
