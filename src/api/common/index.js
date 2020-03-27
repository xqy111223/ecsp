/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/9 14:37
 *   @Author Waroom (yinmeng@codyy.com)
 *   @Description
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

/**
 * 获取区域信息（当前子级）
 * @param areaId
 * @param areaCode
 */
export function getAreaData ({ areaId, areaCode }) {
  const params = {}
  if (areaId) {
    params.pid = areaId
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
 * 获取所有年级数据
 * @param baseAreaId  区域id
 * @param clsSchoolId 学校id
 */
export function getClassLevelData (baseAreaId, clsSchoolId) {
  return request({
    url: URLS.getClassLevelData,
    method: 'get',
    params: { areaId: baseAreaId, schoolId: clsSchoolId, types: 'GRADE' }
  })
}

/**
 * 获取所有学科数据
 * @param baseAreaId  区域id
 * @param clsSchoolId 学校id
 */
export function getSubjectData (baseAreaId, clsSchoolId) {
  return request({
    url: URLS.getSubjectData,
    method: 'get',
    params: { baseAreaId: baseAreaId, clsSchoolId: clsSchoolId }
  })
}

/**
 * 前台获取本地区、学校知识网络（不级联查询）
 * @param params 传入type类型——学段：SEMESTER 年级：GRADE 学科：SUBJECT 版本：EDITION 分册：VOLUME
 */
export function getKnowledgeListNC (params) {
  return request({
    url: URLS.getKnowledgeListNC,
    method: 'get',
    params
  })
}

/**
 * @description: 查询学校列表
 * @param params baseAreaId 区域id
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
 * @description: 个人空间，教学统计,——查询平台学期
 * @param params 描述
 * @returns {}
 */
export function queryPlatformTerm (params) {
  return request({
    url: URLS.queryPlatformTerm,
    method: 'get',
    params
  })
}

/**
 * 获取平台配置(图标、菜单配置、底部配置等)
 * @param platformId 平台ID
 */
export function getPlatformSetting (platformId) {
  return request({
    url: URLS.getPlatformSetting,
    method: 'get',
  })
}
