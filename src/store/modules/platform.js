/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/10 16:04
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description 当前域名平台状态信息
 */

const platform = {
  state: {
    checkingPlatform: true, // 正在检测平台中...
    checkAuthorization: false, // 判断平台是否已经检测通过认证
    basePlatformId: null, // 平台ID
    platformName: 'XXXX平台',
    baseSchoolId: null, // 学校ID
    baseAreaId: null, // 区域ID
    platformType: 0, // 平台类型（0：区域平台，1：校级平台）
    status: 0, // 平台状态 1 开启 0 关闭
    platTermList: [], // 平台学期策略，学期列表
  },
  getters: {
    checkingPlatform: state => state.checkingPlatform,
    checkAuthorization: state => state.checkAuthorization,
    basePlatformId: state => state.basePlatformId,
    platformName: state => state.platformName,
    baseSchoolId: state => state.baseSchoolId,
    baseAreaId: state => state.baseAreaId,
    platformType: state => state.platformType,
    platTermList: state => state.platTermList
  },
  mutations: {
    OVER_AUTHORIZATION: (state) => {
      state.checkingPlatform = false
    },
    PASS_AUTHORIZATION: (state, platformInfo) => {
      state.checkAuthorization = true
      Object.assign(state, platformInfo)
    },
    FAIL_AUTHORIZATION: (state) => {
      state.checkAuthorization = false
    },
    SEARCH_PLATTERMLIST: (state, list) => {
      state.platTermList = list
    }
  },
  actions: {
    OVER_AUTHORIZATION: ({ commit }) => {
      commit('OVER_AUTHORIZATION')
    },
    PASS_AUTHORIZATION: ({ commit }, platformInfo) => {
      const _platformInfo = {
        basePlatformId: platformInfo.basePlatformId,
        baseSchoolId: platformInfo.baseSchoolId,
        baseAreaId: platformInfo.baseAreaId,
        platformType: platformInfo.type,
      }
      commit('PASS_AUTHORIZATION', _platformInfo)
    },
    FAIL_AUTHORIZATION: ({ commit }) => {
      commit('FAIL_AUTHORIZATION')
    },
    SEARCH_PLATTERMLIST: ({ commit }, list) => {
      commit('SEARCH_PLATTERMLIST', list)
    },
  }
}

export default platform
