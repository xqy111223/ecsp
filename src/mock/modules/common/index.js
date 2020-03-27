/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/9 14:52
 *   @Author Waroom (yinmeng@codyy.com)
 *   @Description
 */
import URLS from '@/api/OCURL'
import { areaList, loginRes, logout, platformInfo } from '../../data/common'

export default [{
  url: URLS.platform,
  type: 'get',
  data: platformInfo,
  mock: false
}, {
  url: URLS.login,
  type: 'post',
  data: loginRes,
  mock: false
}, {
  url: URLS.logout,
  type: 'get',
  data: logout,
  mock: false
}, {
  url: URLS.getAreaList,
  type: 'get',
  data: areaList,
  mock: false
}, {
  url: URLS.getKnowledgeListNC,
  type: 'get',
  data: areaList,
  mock: false
}]
