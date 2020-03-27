/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/18 14:11
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description 个人空间mock数据集
 */
import personalRouter from './personalRouter'
import userMgt from './userMgt'
import accountSetting from './accountSetting'
import appMgt from './appMgt'
import portalConfig from './portalConfig'
import teachingStatistics from './teachingStatistics'
import basicSetting from './basicSetting'
import classGroup from './classGroup'

/**
 * url type data mock(是否启用mock)
 */
export default [...personalRouter, ...userMgt, ...accountSetting, ...basicSetting, ...appMgt, ...portalConfig, ...teachingStatistics, ...classGroup]
