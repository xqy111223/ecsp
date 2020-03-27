/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/11/19 15:29
 *   @Author xuqingyu (xuqingyu@codyy.com)
 *   @Description
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

export function setBannerConfig (params) {
  return request({
    url: URLS.setBannerConfig,
    method: 'post',
    data: params
  })
}

export function getBannerConfig (params) {
  return request({
    url: URLS.getBannerConfig,
    method: 'get',
    params
  })
}

export function getBannerList (params) {
  return request({
    url: URLS.getBannerList,
    method: 'get',
    params
  })
}

export function submitAddBanner (params) {
  return request({
    url: URLS.submitAddBanner,
    method: 'post',
    data: params
  })
}

export function submitEditBanner (params) {
  return request({
    url: URLS.submitEditBanner,
    method: 'post',
    data: params
  })
}

export function submitDeleteBanner (params) {
  return request({
    url: URLS.submitDeleteBanner,
    method: 'post',
    data: params
  })
}

export function submitExchangeBanner (params) {
  return request({
    url: URLS.submitExchangeBanner,
    method: 'post',
    data: params
  })
}

export function getFamousList (params) {
  return request({
    url: URLS.getFamousList,
    method: 'get',
    params
  })
}

export function submitAddFamous (params) {
  return request({
    url: URLS.submitAddFamous,
    method: 'post',
    data: params
  })
}

export function submitDeleteFamous (params) {
  return request({
    url: URLS.submitDeleteFamous,
    method: 'post',
    data: params
  })
}

export function submitExchangeFamous (params) {
  return request({
    url: URLS.submitExchangeFamous,
    method: 'post',
    data: params
  })
}

export function queryUserInfoList (params) {
  return request({
    url: URLS.queryUserInfoList,
    method: 'get',
    params
  })
}

export function searchSchoolList (params) {
  return request({
    url: URLS.searchSchoolList,
    method: 'get',
    params
  })
}

/**
 *@Description
 *@Param
 *@Return 个人空间 - 首页 - 最近访客.
 **/
export function visitorsData (params) {
  return request({
    url: URLS.visitorsUrl,
    method: 'get',
    params
  })
}
