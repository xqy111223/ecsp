/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/4/3 16:34
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description  用户登录信息状态管理
 */
import { getLocalStorage, removeLocalStorage, removeToken, setLocalStorage, setToken } from '@/utils/auth'

const ROLE_TYPES = { 1: 'AREA_ADMIN', 2: 'SCHOOL_ADMIN', 3: 'TEACHER', 4: 'FAMILY', 5: 'STUDENT', 6: 'GUEST' } // 角色枚举 区域管理员、学校管理员、教师、家长、学生、游客
Object.freeze(ROLE_TYPES)
const defaultUserInfo = { baseUserId: '', userName: '', userType: 6, roleCode: 'GUEST', token: '' } // 默认用户信息 初始化信息
Object.freeze(defaultUserInfo) // 对象不可更改，想使用defaultUserInfo,请使用解构{ ...defaultUserInfo }
const userInfo = { ...defaultUserInfo, ...JSON.parse(getLocalStorage('userInfo') || '{}') } // 刷新获取cookie中的缓存信息,localStorage中的缓存信息
console.log('userInfo222', userInfo)
const user = {
  state: {
    userInfo: userInfo,
    baseUserId: userInfo.baseUserId,
    userName: userInfo.userName,
    userType: userInfo.userType,
    roleCode: ROLE_TYPES[userInfo.userType],
    token: userInfo.token,
  },
  getters: {
    userInfo: state => state.userInfo,
    baseUserId: state => state.baseUserId,
    userName: state => state.userName,
    token: state => state.token,
    userType: state => state.userType,
    roleCode: state => state.roleCode,
  },
  mutations: {
    SET_USER_INFO (state, userInfo) {
      state.baseUserId = userInfo.baseUserId
      state.userName = userInfo.userName
      state.token = userInfo.token
      state.userType = userInfo.userType
      state.roleCode = userInfo.roleCode
      state.userInfo = userInfo
    },
    SET_TOKEN (state, token) {
      state.token = token
    },
    LOGOUT (state) {
      debugger
      const userInfo = { ...defaultUserInfo }
      state = Object.assign(state, userInfo)
      state.userInfo = userInfo
    },
  },
  actions: {
    /**
     * cookie中插入token，刷新不失效 登录成功注入用户信息
     * @param commit
     * @param userInfo
     * @constructor
     */
    SET_USER_INFO ({ commit }, userInfo) {
      userInfo.roleCode = ROLE_TYPES[userInfo.userType] // 转换成角色code
      setToken(userInfo.token)
      setLocalStorage('userInfo', JSON.stringify(userInfo))
      commit('SET_USER_INFO', userInfo)
    },
    /**
     * 登出
     * @param commit
     * @constructor
     */
    LOGOUT ({ commit }) {
      debugger
      removeToken()
      removeLocalStorage('userInfo')
      commit('LOGOUT')
    },
    SET_TOKEN ({ commit }, token) {
      setToken(token)
      commit('SET_TOKEN', token)
    }
  }
}

export default user
