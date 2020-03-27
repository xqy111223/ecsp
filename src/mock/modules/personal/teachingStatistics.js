/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/8 14:11
 *   @Author xuqingyu (xuqingyu@codyy.com)
 *   @Description 个人空间、门户入口 - 教学统计 —— 开课统计、学科统计、年级统计、教师统计
 */
import URLS from '@/api/OCURL'
import {
  getClassStatistics,
  getGradeClassStatistics,
  getSubjectClassStatistics,
  getTeacherClassStatistics,
  queryPlatformTerm,
  statisticsCourse,
  statisticsGrade,
  statisticsMonth,
  statisticsSubject,
  statisticsTea
} from '../../data/personal/teachingStatistics/'
import { areaList } from '../../data/common'
// import { searchSchoolList } from '../../data/personal/portalConfig'

/**
 * url type data mock(是否启用mock)
 */
export default [
  {
    url: URLS.queryPlatformTerm,
    type: 'get',
    data: queryPlatformTerm,
    mock: false
  },
  {
    url: URLS.getClassStatistics,
    type: 'get',
    data: getClassStatistics,
    mock: false
  },
  {
    url: URLS.getTeacherClassStatistics,
    type: 'get',
    data: getTeacherClassStatistics,
    mock: false
  },
  {
    url: URLS.getGradeClassStatistics,
    type: 'get',
    data: getGradeClassStatistics,
    mock: false
  },
  {
    url: URLS.getSubjectClassStatistics,
    type: 'get',
    data: getSubjectClassStatistics,
    mock: false
  },
  {
    url: URLS.getAreaList,
    type: 'get',
    data: areaList,
    mock: false
  }, {
    url: URLS.statisticsMonthUrl, // 门户入口 - 教学统计 - 近N月开课统计(区域/学校 )
    type: 'get',
    data: statisticsMonth,
    mock: false
  }, {
    url: URLS.statisticsSubjectUrl, // 门户入口 - 教学统计 - 学科占比分析-实开课(区域/学校 )
    type: 'get',
    data: statisticsSubject,
    mock: false
  }, {
    url: URLS.statisticsGradeUrl, // 门户入口 - 教学统计 - 年级占比分析-实开课(区域/学校 )
    type: 'get',
    data: statisticsGrade,
    mock: false
  }, {
    url: URLS.statisticsTeaUrl, // 门户入口 - 教学统计 - 教师开课排行-实开课（区域/学校）
    type: 'get',
    data: statisticsTea,
    mock: false
  }, {
    url: URLS.statisticsCourseUrl, // 门户入口 - 教学统计 -  区域开课分析
    type: 'get',
    data: statisticsCourse,
    mock: false
  }]
