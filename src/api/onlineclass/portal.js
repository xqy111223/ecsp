/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/4/30 17:11
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description  门户接口管理
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

/**
 * 获取门户配置信息
 * @param domain 域名
 * @param portalKey 门户菜单key
 */
export function getModel (domain, portalKey) {
  let url = URLS.getModel
  switch (portalKey) {
    case 'Home':
      break
    case 'Course':
      url = URLS.getCourseModel
      break
    case 'Live':
      url = URLS.getLiveModel
      break
    case 'Statistics':
      url = URLS.getStatisticsModel
  }
  return request({
    url: url,
    method: 'get',
    params: { domain: domain, portalKey: portalKey }
  })
}

/**
 * 获取平台的头部配置
 * @param platformId 平台Id ----------------------------- 排查是否 删除
 */
export function getHomeBannerData (platformId) {
  return request({
    url: URLS.getPortalSetting,
    method: 'get',
    params: { platformId: platformId }
  })
}

/**
 *@Description
 *@Param
 *@Return 获取home首页 的头部banner 图片.
 **/
export function bannerList (params) {
  return request({
    url: URLS.bannerUrl,
    method: 'get',
    params
  })
}
