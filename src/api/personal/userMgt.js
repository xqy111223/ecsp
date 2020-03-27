/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/30 8:57
 *   @Author xuqingyu (xuqingyu@codyy.com)
 *   @Description
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

/**
 * @description: 用户管理-角色管理-获取角色列表
 * @param arguments 描述
 * @returns {}
 */
export function getRoleList (params) {
  return request({
    url: URLS.getRoleList,
    method: 'get',
    params
  })
}

/**
 * @description: 用户管理-角色管理-新增/编辑角色中的平台功能项
 * @param  描述
 * @returns { 'permissionId':权限ID,'permissionName':权限名称 }
 */
export function getRoleFunctions (platformId) {
  return request({
    url: URLS.getRoleFunctions,
    method: 'get',
    params: {
      platformId // 平台id
    }
  })
}

/**
 * @description: 用户管理-角色管理-新增角色-提交
 * @param  描述
 * @returns {}
 */
export function submitAddRole (params) {
  return request({
    url: URLS.submitAddRole,
    method: 'post',
    data: params
  })
}

/**
 * @description: 用户管理-角色管理-编辑角色-提交
 * @param  描述
 * @returns {}
 */
export function submitEditRole (params) {
  return request({
    url: URLS.submitEditRole,
    method: 'post',
    data: params
  })
}

/**
 * @description: 用户管理-角色管理-删除角色-提交
 * @param  描述
 * @returns {}
 */
export function submitDeleteRole (roleId) {
  return request({
    url: URLS.submitDeleteRole,
    method: 'post',
    data: {
      roleId
    }
  })
}

/**
 * @description: 用户管理-用户管理-获取用户列表
 * @param
 * @returns {}
 */
export function getUserList (params) {
  return request({
    url: URLS.getUserList,
    method: 'get',
    params
  })
}

/**
 * @description: 用户管理-用户管理-新增用户-提交
 * @param  描述
 * @returns {}
 */
export function submitAddUser (params) {
  return request({
    url: URLS.submitAddUser,
    method: 'post',
    data: params
  })
}

/**
 * @description: 用户管理-用户管理-编辑用户-提交
 * @param  描述
 * @returns {}
 */
export function submitEditUser (params) {
  return request({
    url: URLS.submitEditUser,
    method: 'post',
    data: params
  })
}

/**
 * @description: 用户管理-角色管理-删除角色-提交
 * @param  描述
 * @returns {}
 */
export function submitDeleteUser (params) {
  return request({
    url: URLS.submitDeleteUser,
    method: 'post',
    data: params
  })
}

/**
 * @description： 用户管理-教师管理-列表查询
 * @param params
 */
export function getTeacherList (params) {
  return request({
    url: URLS.getTeacherList,
    method: 'get',
    params
  })
}
/**
 * 用户管理——教师管理——根据年级——获取该学校的班级
 * @param params
 */
export function getGradeClassList (params) {
  return request({
    url: URLS.getGradeClassList,
    method: 'get',
    params
  })
}

/**
 * 前台获取本地区、学校知识网络（级联查询）
 * @param params
 */
export function getKnowledgeList (params) {
  return request({
    url: URLS.getKnowledgeList,
    method: 'get',
    params
  })
}

/**
 * 用户管理——教师管理——获取该学校的学科信息
 * @param params
 */
export function getSubjectList (params) {
  return request({
    url: URLS.getSubjectList,
    method: 'get',
    params
  })
}

/**
 * 用户管理——教师管理——设置或取消名师
 * @param params
 */
export function setFamousTeacher (params) {
  return request({
    url: URLS.setFamousTeacher,
    method: 'post',
    data: params
  })
}

/**
 * 用户管理——教师管理——用户详情
 * @param params
 */
export function getUserDetailInfo (params) {
  return request({
    url: URLS.getUserDetailInfo,
    method: 'get',
    params
  })
}

/**
 * @description： 用户管理-学生管理-列表查询
 * @param params
 */
export function getStudentList (params) {
  return request({
    url: URLS.getTeacherList,
    method: 'get',
    params
  })
}

/**
 * 用户管理——学生管理——添加学生确定按钮——提交
 * @param params
 */
export function submitAddStudent (params) {
  return request({
    url: URLS.submitAddTeacher,
    method: 'get',
    params
  })
}

/**
 * 用户管理——学生管理——编辑学生确定按钮——提交
 * @param params
 */
export function submitEditStudent (params) {
  return request({
    url: URLS.submitEditTeacher,
    method: 'get',
    params
  })
}

/**
 * 用户管理——学生管理——删除学生确定按钮——提交
 * @param params
 */
export function submitDeleteStudent (params) {
  return request({
    url: URLS.submitDeleteTeacher,
    method: 'get',
    params
  })
}

/**
 * @description： 用户管理-家长管理-列表查询
 * @param params
 */
export function getParentList (params) {
  return request({
    url: URLS.getTeacherList,
    method: 'get',
    params
  })
}

/**
 * 用户管理——家长管理——添加家长确定按钮——提交
 * @param params
 */
export function submitAddParent (params) {
  return request({
    url: URLS.submitAddTeacher,
    method: 'get',
    params
  })
}

/**
 * 用户管理——家长管理——编辑家长确定按钮——提交
 * @param params
 */
export function submitEditParent (params) {
  return request({
    url: URLS.submitEditTeacher,
    method: 'get',
    params
  })
}

/**
 * 用户管理——家长管理——删除家长确定按钮——提交
 * @param params
 */
export function submitDeleteParent (params) {
  return request({
    url: URLS.submitDeleteTeacher,
    method: 'get',
    params
  })
}
