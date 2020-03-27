/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/8 10:43
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description
 */
import URLS from '@/api/OCURL'
import model from '../../data/onlineclass/portal/model'
import courseModel from '../../data/onlineclass/portal/courseModel'
import liveModel from '../../data/onlineclass/portal/liveModel'
import statisticsModel from '../../data/onlineclass/portal/statisticsModel'

export default [{
  url: URLS.getModel,
  type: 'get',
  data: model,
  mock: true
}, {
  url: URLS.getCourseModel,
  type: 'get',
  data: courseModel,
  mock: true
}, {
  url: URLS.getLiveModel,
  type: 'get',
  data: liveModel,
  mock: true
}, {
  url: URLS.getStatisticsModel,
  type: 'get',
  data: statisticsModel,
  mock: true
}]
