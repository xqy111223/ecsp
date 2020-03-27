/**
 * 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 * Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 * @Date: 2019/10/8 14:11
 * @Author xuqingyu (xuqingyu@codyy.com)
 * @Description  教学统计（个人空间、门户入口两部分） —— 开课统计、学科统计、年级统计、教师统计
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

/**
 * @description: 个人空间，教学统计,——查询区域开课分析
 * @param params 描述
 * @returns {}
 */
export function getClassStatistics (params) {
  return request({
    url: URLS.getClassStatistics,
    method: 'get',
    params
  })
}

/**
 * @description: 个人空间，教学统计,——查询教师开课统计
 * @param arguments 描述
 * @returns {}
 */
export function getTeacherClassStatistics (params) {
  return request({
    url: URLS.getTeacherClassStatistics,
    method: 'get',
    params
  })
}

/**
 * @description: 个人空间，教学统计,——查询年级开课统计
 * @param arguments 描述
 * @returns {}
 */
export function getGradeClassStatistics (params) {
  return request({
    url: URLS.getGradeClassStatistics,
    method: 'get',
    params
  })
}

/**
 * @description: 个人空间，教学统计,——查询学科开课统计
 * @param arguments 描述
 * @returns {}
 */
export function getSubjectClassStatistics (params) {
  return request({
    url: URLS.getSubjectClassStatistics,
    method: 'get',
    params
  })
}

/**
 * 获取区域信息（当前子级）
 * @param areaId
 * @param areaCode
 */
export function getAreaData ({ areaId, areaCode }) {
  const params = {}
  if (areaId) {
    params.pId = areaId
  } else if (areaCode) {
    params.pAreaCode = areaCode
  }
  return request({
    url: URLS.getAreaList,
    method: 'get',
    params: params
  })
}

/**
 * @description: 教学统计查询学校列表
 * @param params 描述
 * @returns {}
 */
export function searchSchoolList (params) {
  return request({
    url: URLS.searchSchoolList,
    method: 'get',
    params
  })
}

/**
 *@Description
 *@Param  门户入口 - 教学统计 - 近N月开课统计( 区域/学校 )
 *@Return .
 **/
export function statisticsMonth (params) {
  return request({
    url: URLS.statisticsMonthUrl,
    method: 'get',
    params
  })
}

/**
 *@Description
 *@Param  门户入口 - 教学统计 - 学科占比分析-实开课(区域/学校 )
 *@Return .
 **/
export function statisticsSub (params) {
  return request({
    url: URLS.statisticsSubjectUrl,
    method: 'get',
    params
  })
}

/**
 *@Description
 *@Param  门户入口 - 教学统计 - 年级占比分析-实开课(区域/学校 )
 *@Return .
 **/
export function statisticsGrade (params) {
  return request({
    url: URLS.statisticsGradeUrl,
    method: 'get',
    params
  })
}

/**
 *@Description
 *@Param  门户入口 - 教学统计 - 教师开课排行-实开课（区域/学校）
 *@Return .
 **/
export function statisticsTea (params) {
  return request({
    url: URLS.statisticsTeaUrl,
    method: 'get',
    params
  })
}

/**
 *@Description
 *@Param  门户入口 - 教学统计 - 区域开课分析
 *@Return .
 **/
export function statisticsCourse (params) {
  return request({
    url: URLS.statisticsCourseUrl,
    method: 'get',
    params
  })
}
