/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/8 14:10
 *   @Author xuqingyu (xuqingyu@codyy.com)
 *   @Description 门户配置——首页配置
 */
import URLS from '@/api/OCURL'
import {
  addBanner,
  addFamous,
  bannerList,
  deleteBanner,
  deleteFamous,
  editBanner,
  exchangeBanner,
  exchangeFamous,
  famousList,
  searchSchoolList,
  searchTeacherList,
  visitorsList
} from '../../data/personal/portalConfig'

/**
 * url type data mock(是否启用mock)
 */
export default [{
  url: URLS.setBannerConfig,
  type: 'post',
  data: '',
  mock: false
}, {
  url: URLS.getBannerConfig,
  type: 'get',
  data: '',
  mock: false
}, {
  url: URLS.getBannerList,
  type: 'get',
  data: bannerList,
  mock: false
}, {
  url: URLS.submitAddBanner,
  type: 'post',
  data: addBanner,
  mock: false
}, {
  url: URLS.submitEditBanner,
  type: 'post',
  data: editBanner,
  mock: false
}, {
  url: URLS.submitDeleteBanner,
  type: 'post',
  data: deleteBanner,
  mock: false
}, {
  url: URLS.submitExchangeBanner,
  type: 'post',
  data: exchangeBanner,
  mock: false
}, {
  url: URLS.getFamousList,
  type: 'get',
  data: famousList,
  mock: false
}, {
  url: URLS.submitAddFamous,
  type: 'post',
  data: addFamous,
  mock: false
}, {
  url: URLS.submitDeleteFamous,
  type: 'post',
  data: deleteFamous,
  mock: false
}, {
  url: URLS.submitExchangeFamous,
  type: 'post',
  data: exchangeFamous,
  mock: false
}, {
  url: URLS.queryUserInfoList,
  type: 'get',
  data: searchTeacherList,
  mock: false
}, {
  url: URLS.searchSchoolList,
  type: 'get',
  data: searchSchoolList,
  mock: false
}, {
  url: URLS.visitorsUrl, // 个人空间 - 首页 - 最近访客
  type: 'get',
  data: visitorsList,
  mock: false
}]
