/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/12/10 10:45
 *   @Author xuqingyu (xuqingyu@codyy.com)
 *   @Description
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

/**
 * @description: 个人空间，教师空间，教师班级查找
 * @param params 不包括历史班级,教师任课和班主任班级,只会有status为0的数据
 * @returns {}
 */
export function queryTeacherClass (params) {
  return request({
    url: URLS.queryTeacherClass,
    method: 'get',
    params
  })
}

/**
 * @description: 个人空间，获取——班级成员-班级信息
 * @param arguments 描述
 * @returns {}
 */
export function getClassMembers (params) {
  return request({
    url: URLS.getClassMembers,
    method: 'get',
    params
  })
}

/**
 * @description: 个人空间，学生空间，学生班级查找
 * @param params 描述
 * @returns {}
 */
export function queryStudentClass (params) {
  return request({
    url: URLS.queryStudentClass,
    method: 'get',
    params
  })
}

/**
 * @description: 个人空间,家长空间，家长的孩子班级查找
 * @param params 描述
 * @returns {}
 */
export function queryChildrenClass (params) {
  return request({
    url: URLS.queryChildrenClass,
    method: 'get',
    params
  })
}
