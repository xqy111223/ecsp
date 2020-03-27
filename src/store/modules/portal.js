/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/4/30 17:20
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description  门户布局配置信息
 */
const clientWidth = document.documentElement.clientWidth
const portal = {
  state: {
    screenWidth: clientWidth <= 1280 ? 1280 : clientWidth, // 屏幕宽度
    mainHeight: null // 门户内容高度
  },
  getters: {
    screenWidth: state => state.screenWidth,
    mainHeight: state => state.mainHeight
  },
  mutations: {
    SET_SCREEN_WIDTH: (state, screenWidth) => {
      state.screenWidth = screenWidth
    },
    SET_MAIN_HEIGHT: (state, mainHeight) => {
      state.mainHeight = mainHeight
    }
  },

  actions: {
    SET_SCREEN_WIDTH: ({ commit }, screenWidth) => {
      commit('SET_SCREEN_WIDTH', screenWidth)
    },
    SET_MAIN_HEIGHT: ({ commit }, mainHeight) => {
      commit('SET_MAIN_HEIGHT', mainHeight)
    }
  }
}

export default portal
