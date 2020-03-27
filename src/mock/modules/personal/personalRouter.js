/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/11 14:02
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description 个人空间路由
 */
import URLS from '@/api/OCURL'
import personalRouter from '../../data/personal/personalRouter/personalRouter'
import personalSchoolRouter from '../../data/personal/personalRouter/personalSchoolRouter'
import personalTeacherRouter from '../../data/personal/personalRouter/personalTeacherRouter'
import personalFamilyRouter from '../../data/personal/personalRouter/personalFamilyRouter'
import personalStudentRouter from '../../data/personal/personalRouter/personalStudentRouter'

/**
 * url type data mock(是否启用mock)
 */
export default [{
  url: URLS.getPersonalRouter,
  type: 'get',
  data: personalRouter,
  mock: true
}, {
  url: URLS.getPersonalSchoolRouter,
  type: 'get',
  data: personalSchoolRouter,
  mock: true
}, {
  url: URLS.getPersonalTeacherRouter,
  type: 'get',
  data: personalTeacherRouter,
  mock: true
}, {
  url: URLS.getPersonalFamilyRouter,
  type: 'get',
  data: personalFamilyRouter,
  mock: true
}, {
  url: URLS.getPersonalStudentRouter,
  type: 'get',
  data: personalStudentRouter,
  mock: true
}]
