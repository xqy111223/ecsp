/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/23 14:25
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description
 */

import request from '@/utils/request'
import URLS from '@/api/OCURL'

/**
 * 获取登录后的路由信息
 */
export function getPersonalRouter (role) {
  let url
  switch (role) {
    case 'AREA_ADMIN':
      url = URLS.getPersonalRouter
      break
    case 'SCHOOL_ADMIN':
      url = URLS.getPersonalSchoolRouter
      break
    case 'TEACHER':
      url = URLS.getPersonalTeacherRouter
      break
    case 'FAMILY':
      url = URLS.getPersonalFamilyRouter
      break
    case 'STUDENT':
      url = URLS.getPersonalStudentRouter
      break
  }
  return request({
    url: url,
    method: 'get',
  })
}
