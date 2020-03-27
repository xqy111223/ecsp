/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/9 14:37
 *   @Author qingyu (qingyu@codyy.com)
 *   @Description 登录
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

/**
 * 1.验证域名是否存在
 */
export function getPlatformData (params) {
  return request({
    url: URLS.platform,
    method: 'get',
    params
    // params: { domain: 'http://localhost:8088' }
  })
}

/**
 * 2.门户登录
 * 登录失败超过三次 传验证码validateCode
 * @param loginInfo = {loginName,password,validateCode}
 */
export function Login (loginInfo) {
  return request({
    url: URLS.login,
    method: 'post',
    data: loginInfo
  })
}

/**
 * 3.获取验证码  isVerify返回true调用
 */
export function getImageCode () {
  return request({
    url: URLS.getImageCode,
    method: 'get',
  })
}

/**
 * 4.获取用户信息
 */
export function getUserInfo () {
  return request({
    url: URLS.getUserInfo,
    method: 'get',
  })
}

/**
 * 5.登出
 * @constructor
 */
export function Logout () {
  return request({
    url: URLS.logout,
    method: 'get',
  })
}
