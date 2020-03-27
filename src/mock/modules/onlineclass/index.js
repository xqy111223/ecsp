/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/18 14:11
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description 门户mock数据集
 */

import portalMock from './portal'
import homeMock from './home'
import liveMock from './live'
import courseMock from './course'
import statisticsMock from './statistics'

/**
 * url type data mock(是否启用mock)
 */
export default [
  ...courseMock,
  ...homeMock,
  ...liveMock,
  ...portalMock,
  ...statisticsMock
]
