/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/9 14:50
 *   @Author Waroom (yinmeng@codyy.com)
 *   @Description
 */
/**
 * 获取区域数据
 * */
import Mock from 'mockjs'

export const areaList = Mock.mock(
  {
    result: {
      'list|4-9': [
        {
          'areaCode|+1': 100000,
          areaName: '@province',
          'hasChild|1': false,
          'areaId|+1': 100000
        }
      ]
    },
    status: '000000000'
  })

/**
 * 登录成功返回数据
 */
export const loginRes = Mock.mock(
  {
    result: {
      userId: '@id',
      token: '@id',
      role: 1,
      username: '@cname',
    },
    status: '000000000'
  })

/**
 * 登出
 */
export const logout = Mock.mock(
  {
    status: '000000000'
  })

/**
 * 根据域名获取平台信息
 */
export const platformInfo = Mock.mock({
  result: {
    baseAreaId: 1571706549288,
    basePlatformId: 3,
    baseSchoolId: 1571706548888,
    domain: 'www.baidu.com',
    status: 1,
    'type|0-1': 1,
    token: '@string(32)'
  },
  status: '000000000'
})

/**
 * 获取平台的配置信息
 */
export const platformSettingInfo = Mock.mock({
  result: {
    navConfigs: [
      {
        display: true,
        navCustomName: '',
        navKey: 'HOME',
        navName: '首页',
        navSort: 1
      },
      {
        display: true,
        navCustomName: '',
        navKey: 'LIVE',
        navName: '校园直播',
        navSort: 2
      },
      {
        display: true,
        navCustomName: '',
        navKey: 'Course',
        navName: '课程中心',
        navSort: 3
      },
      {
        display: true,
        navCustomName: '',
        navKey: 'REPORT',
        navName: '教学统计',
        navSort: 4
      }
    ],
    portalConfigs: {
      platformName: '互动课堂平台',
      logo: '',
      icon: ''
    }
  },
  status: '000000000'
})
