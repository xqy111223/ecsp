/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/4/30 15:58
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description  axios请求封装
 */

import axios from 'axios'
import { MessageBox } from 'element-ui'
import { getToken, removeToken } from '@/utils/auth'
import * as RESPONSE_STATUS from '@/constants/RESPONSE_CODE'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

const service = axios.create({
  baseURL: '/api', // api 的 base_url  最好采用nginx或者dev-server代理，这里不填
  timeout: 15 * 1000 // 请求超时时间
})

/**
 * 请求发送
 */
service.interceptors.request.use(
  config => {
    // if (getToken()) {
    config.headers.Authorization = getToken() || ''
    // }
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

/**
 * 请求响应
 */
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status === RESPONSE_STATUS.EXPIRED) {
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeToken()
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
      return Promise.reject(new Error('logout'))
    } else if (res.status !== RESPONSE_STATUS.SUCCESS) {
      return Promise.reject(res)
    } else {
      return res.result
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
