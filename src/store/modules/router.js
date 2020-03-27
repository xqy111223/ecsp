/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/12 13:54
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description 路由层（静态路由、动态路由---权限）
 */

import { getSession, removeSession, setSession } from '@/utils/auth'
import portal from '../../router/portal'
import Layout from '@/views/framework/Layout'
import PersonalCenter from '@/views/personal'
import { getPersonalRouter } from '@/api/onlineclass/permission'

// 个人空间根路由
const personalFilePath = 'personal'
const personalRoot = {
  path: '',
  component: Layout,
  name: 'personalRoot',
  title: '互动课堂平台-个人空间',
  children: [{
    path: '/personal',
    name: 'personal',
    component: PersonalCenter,
    children: [],
  }]
}

/**
 * 个人空间动态路由递归方法 暂时不考虑门户动态路由
 * @param menuList
 * @param routes
 * @returns {{path: string, component, name: string, title: string, children: {path: string, name: string, component, children: Array}[]}}
 */
const dynamicPersonalRoutes = function (menuList = [], routes = []) {
  let personalRoutes = []
  menuList.forEach(menu => {
    if (menu.list && menu.list.length >= 1) {
      personalRoutes = personalRoutes.concat(menu.list)
    }
    if (menu.url) {
      const filePath = '/' + menu.url.replace(/^\//, '')
      const routerUrl = '/' + menu.alias.replace(/^\//, '')
      const route = {
        path: routerUrl,
        component: () => import(/* webpackChunkName: "[request]" */ `@/views/${personalFilePath}${filePath}`) || null,
        name: menu.name,
        meta: {
          title: menu.title,
          menuId: menu.menuId,
          isDynamic: true
        }
      }
      routes.push(route)
    }
  })
  if (personalRoutes.length) {
    dynamicPersonalRoutes(personalRoutes, routes)
  } else {
    personalRoot.children[0].children = routes
  }
  return personalRoot
}

const router = {
  state: {
    activeNavIndex: '/', // 导航高亮 默认首页
    personalMenus: [], // 个人空间动态菜单
    defaultPersonalNav: '', // 默认个人空间路由位置
  },
  getters: {
    activeNavIndex: state => state.activeNavIndex,
    personalMenus: state => state.personalMenus,
    defaultPersonalNav: state => state.defaultPersonalNav,
  },
  mutations: {
    CHANGE_NAV_INDEX (state, activeNavIndex) {
      state.activeNavIndex = activeNavIndex
    },
    PERSONAL_MENUS: (state, menuList) => {
      state.defaultPersonalNav = menuList.length ? menuList[0].list[0].name : '' // 以第一个菜单路由为默认路由
      state.personalMenus = menuList
    },
    REMOVE_PERSONAL_MENUS: (state) => {
      state.personalMenus = []
    },
  },
  actions: {
    CHANGE_NAV_INDEX ({ commit }, activeNavIndex) {
      commit('CHANGE_NAV_INDEX', activeNavIndex)
    },
    /**
     * 用户登录更新动态路由
     * @param commit
     * @returns {Promise<any>}
     */
    PERSONAL_ROUTERS ({ commit, getters }) {
      return new Promise(resolve => {
        let accessedRouters
        console.log('--------------开始加载个人空间动态路由-----------')
        if (getSession('PERSONAL_MENUS')) {
          const menuList = JSON.parse(getSession('PERSONAL_MENUS'))
          commit('PERSONAL_MENUS', menuList)
          accessedRouters = dynamicPersonalRoutes(menuList)
          console.log('--------------从缓存中加载个人空间动路由完毕-----------')
          resolve([portal, accessedRouters, { path: '*', redirect: '/' }])
        } else {
          getPersonalRouter(getters.roleCode).then(menuList => {
            commit('PERSONAL_MENUS', menuList)
            setSession('PERSONAL_MENUS', JSON.stringify(menuList))
            accessedRouters = dynamicPersonalRoutes(menuList)
            console.log('--------------动态个人空间路由加载完毕-----------')
            resolve([portal, accessedRouters, { path: '*', redirect: '/' }])
          })
        }
      })
    },
    /**
     * 清除个人空间动态路由以及缓存数据
     * @param commit
     * @returns {Promise<unknown>}
     * @constructor
     */
    REMOVE_PERSONAL_ROUTERS ({ commit }) {
      return new Promise(resolve => {
        removeSession('PERSONAL_MENUS')
        commit('REMOVE_PERSONAL_MENUS')
        resolve([portal, { path: '*', redirect: '/' }])
      })
    }
  }
}

export default router
