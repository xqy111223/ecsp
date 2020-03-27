/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/8 10:10
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description 课程中心接口层
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

/**
 * 获取课程列表数据 ------------------------------ 排查 是否 废弃
 * @param classLevelId  年级id
 * @param subjectId 学科
 * @param courseType 上课模式
 * @param searchText  查询条件
 *  学校id
 */
export function getCourseListData () {
  return request({
    url: URLS.getCourseListData,
    method: 'get',
    params: {}
  })
}

/**
 * 获取指定的课程信息
 * @param id  课程Id
 */
export function getCourseData (id) {
  return request({
    url: URLS.getCourseData,
    method: 'get',
    params: { id: id }
  })
}

/***
 * 获取评论数据
 */
export function getBroadCommentData () {
  return request({
    url: URLS.getBroadCommentData,
    method: 'get',
    params: {}
  })
}
