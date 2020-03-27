/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/30 16:13
 *   @Author xuqingyu (xuqingyu@codyy.com)
 *   @Description
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

/**
 * @description: 基础设置-教室管理-获取教室列表
 * @param arguments 描述
 * @returns {}
 */
export function getClassroomList (params) {
  return request({
    url: URLS.getClassroomList,
    method: 'get',
    params
  })
}

/**
 * @description: 基础设置-教室管理-教室详情
 * @param  描述
 * @returns {}
 */
export function getClassroomDetail (params) {
  return request({
    url: URLS.getClassroomDetail,
    method: 'get',
    params
  })
}

/**
 * @description: 基础设置-教室管理-编辑教室
 * @param params 描述
 * @returns {}
 */
export function submitEditClassroom (params) {
  return request({
    url: URLS.submitEditClassroom,
    method: 'get',
    params
  })
}

/**
 * @description: 基础设置-教室管理-绑定班级
 * @param params 描述
 * @returns {}
 */
export function submitBindClass (params) {
  return request({
    url: URLS.submitBindClass,
    method: 'get',
    params
  })
}

/**
 * @description: 基础设置-班级管理-获取班级列表
 * @param arguments 描述
 * @returns {}
 */

export function getGradeClassInfoList (params) {
  return request({
    url: URLS.getGradeClassInfoList,
    method: 'get',
    params
  })
}

/**
 * @description: 基础设置-班级管理-新增/编辑班级
 * @param params 描述
 * @returns {}
 */
export function submitAddOrEditClass (params) {
  return request({
    url: URLS.submitAddOrEditClass,
    method: 'get',
    params
  })
}

/**
 * @description: 基础设置-班级管理-删除班级
 * @param params 描述
 * @returns {}
 */
export function submitDeleteClass (params) {
  return request({
    url: URLS.submitDeleteClass,
    method: 'get',
    params
  })
}

/**
 * @description: 基础设置-班级管理-班级升级
 * @param arguments 描述
 * @returns {}
 */
export function submitUpgradeClass (params) {
  return request({
    url: URLS.submitUpgradeClass,
    method: 'post',
    data: params
  })
}

/**
 * @description: 基础设置-班级管理-班级解散
 * @param arguments 描述
 * @returns {}
 */
export function submitDismissClass (params) {
  return request({
    url: URLS.submitDismissClass,
    method: 'post',
    data: params
  })
}

/**
 * @description: 基础设置-班级管理-获取班级学生列表
 * @param params 描述
 * @returns {}
 */
export function getClassStudentList (params) {
  return request({
    url: URLS.getClassStudentList,
    method: 'get',
    params
  })
}

/**
 * @description: 基础设置-班级管理-设置班长
 * @param arguments 描述
 * @returns {}
 */
export function submitSetClassMonitor (params) {
  return request({
    url: URLS.submitSetClassMonitor,
    method: 'post',
    data: params
  })
}

/**
 * @description: 基础设置-班级管理-设置自动升级
 * @param params 描述
 * @returns {}
 */
export function submitSetAutoUpgrade (params) {
  return request({
    url: URLS.submitSetAutoUpgrade,
    method: 'post',
    data: params
  })
}

/**
 * @description: 基础设置-班级管理-获取自动升级信息
 * @param params 描述
 * @returns {}
 */
export function getAutoUpgradeInfo (params) {
  return request({
    url: URLS.getAutoUpgradeInfo,
    method: 'get',
    params
  })
}

/**
 * @description: 基础设置-班级管理-取消自动升级
 * @param arguments 描述
 * @returns {}
 */
export function submitCancelAutoUpgrade (params) {
  return request({
    url: URLS.submitCancelAutoUpgrade,
    method: 'post',
    data: params
  })
}

/**
 * @description: 基础设置-班级管理-获取班级任课老师列表
 * @param arguments 描述
 * @returns {}
 */
export function getClassTeacherList (params) {
  return request({
    url: URLS.getClassTeacherList,
    method: 'get',
    params
  })
}

/**
 * @description: 添加任课教师
 * @param arguments 教师选项中不包括已添加的教师，学科选项中不包括已添加的教师的学科
 * @returns {}
 */
export function submitAddClassTeacher (params) {
  return request({
    url: URLS.submitAddClassTeacher,
    method: 'post',
    data: params
  })
}

/**
 * @description: 选择学科
 * @param params 如果勾选的学科已有任课教师，则自动将原任课教师的该学科取消掉，如果原任课教师没有任何学科了，则自动将原任课教师从该班级移除
 * @returns {}
 */
export function submitSelectedClassSubject (params) {
  return request({
    url: URLS.submitSelectedClassSubject,
    method: 'post',
    data: params
  })
}

/**
 * @description: 任课老师移出班级
 * @param arguments 描述
 * @returns {}
 */
export function submitRemoveClassTeacher (params) {
  return request({
    url: URLS.submitRemoveClassTeacher,
    method: 'post',
    data: params
  })
}
/**
 * @description: 基础设置-班级管理-添加班级学生
 * @param arguments 描述
 * @returns {}
 */
export function submitAddClassStudent (params) {
  return request({
    url: URLS.submitAddClassStudent,
    method: 'post',
    data: params
  })
}
/**
 * @description: 基础设置-班级管理-查询不在此班级中的学生
 * @param params 描述
 * @returns {}
 */
export function getNotClassStudentList (params) {
  return request({
    url: URLS.getNotClassStudentList,
    method: 'get',
    params
  })
}

/**
 * @description: 查询教师和学生筛选框
 * @param arguments 描述
 * @returns {}
 */
export function queryUserOptions (params) {
  return request({
    url: URLS.queryUserOptions,
    method: 'get',
    params
  })
}

/**
 * @description:  基础设置——班级管理——根据Id查询班级详情
 * @param arguments 描述
 * @returns {}
 */
export function queryClassDetail (params) {
  return request({
    url: URLS.queryClassDetail,
    method: 'get',
    params
  })
}

/**
 * @description: 个人空间，根据学校，年级，查学科
 * @param params 描述
 * @returns {}
 */
export function querySubjectOptions (params) {
  return request({
    url: URLS.querySubjectOptions,
    method: 'get',
    params
  })
}
