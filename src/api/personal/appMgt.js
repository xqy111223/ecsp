/*
* 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
* Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
* @Date: 2019.11.14 14:08.
* @Author
* @Description 个人空间 - 应用管理 - 接口地址
**/
import request from '@/utils/request'
import URLS from '@/api/OCURL'

/**
 * @description: 获取 学校数据 接口
 * @param arguments 描述
 * @returns {}
 */
export function getSchoolData (params) {
  return request({
    url: URLS.schoolUrl,
    method: 'get',
    params
  })
}

/**
 * @description: 获取年级、学科、版本、分册 - 数据 接口
 * @param arguments 描述
 * @returns {}
 */
export function gradeData (params) {
  return request({
    url: URLS.gradeUrl,
    method: 'get',
    params
  })
}

/**
 * @description: 获取知识点 - 数据 接口
 * @param arguments 描述
 * @returns {}
 */
export function pointData (params) {
  return request({
    url: URLS.pointUrl,
    method: 'get',
    params
  })
}

/**
 * @description: 获取 教室数据 接口
 * @param arguments 描述
 * @returns {}
 */
export function getClassroom (params) {
  return request({
    url: URLS.classroomUrl,
    method: 'get',
    params
  })
}

/**
 * @description: 获取 教师数据 接口
 * @param arguments 描述
 * @returns {}
 */
export function teacherData (params) {
  return request({
    url: URLS.teacherUrl,
    method: 'get',
    params
  })
}

/**
 *@Description
 *@Param
 *@Return 课表管理 - 设置上课时间.
 **/
export function setTime (params) {
  return request({
    url: URLS.setTimeUrl,
    method: 'POST',
    data: params
  })
}

/**
 *@Description
 *@Param
 *@Return 获取 课表管理 - 节次、上课时间数据 - 教室级别.
 **/
export function getRoomTime (params) {
  return request({
    url: URLS.roomTimeUrl,
    method: 'get',
    params
  })
}

/**
 *@Description
 *@Param
 *@Return 获取 课表管理 - 节次数据 - 区域、学校级别.
 **/
export function getLesson (params) {
  return request({
    url: URLS.lessonUrl,
    method: 'get',
    params
  })
}

/**
 * @description: 获取 课表数据 接口
 * @param arguments 描述
 * @returns {}
 */
export function getCursor (params) {
  return request({
    url: URLS.cursorUrl,
    method: 'get',
    params
  })
}

/**
 * @description: 获取 学期 接口
 * @param arguments 描述
 * @returns {}
 */
export function semester (params) {
  return request({
    url: URLS.semesterUrl,
    method: 'get',
    params
  })
}

/**
 * @description: 获取 日期是否是假期 接口
 * @param arguments 描述
 * @returns {}
 */
export function vacation (params) {
  return request({
    url: URLS.vacationUrl,
    method: 'get',
    params
  })
}

/**
 *@Description 获取 课表中 - 指定课程 的参与方信息
 *@Param
 *@Return .
 **/
export function participate (params) {
  return request({
    url: URLS.participateUrl,
    method: 'get',
    params
  })
}

/**
 *@Description 获取 课表管理、课程管理 - 指定课程 的扩展信息
 *@Param
 *@Return .
 **/
export function byCourse (params) {
  return request({
    url: URLS.byCourseUrl,
    method: 'get',
    params
  })
}

/**
 *@Description 获取 课程管理 - 编辑课程扩展信息
 *@Param
 *@Return .
 **/
export function courseUpdate (params) {
  return request({
    url: URLS.courseUpdateUrl,
    method: 'post',
    data: params
  })
}

/**
 *@Description 课表编辑 - 批量删除 课程
 *@Param
 *@Return .
 **/
export function delCourse (params) {
  return request({
    url: URLS.delCourseUrl,
    method: 'get',
    params
  })
}

/**
 *@Description 课表编辑 - 批量添加或者更新 课程
 *@Param
 *@Return .
 **/
export function addCourse (params) {
  return request({
    url: URLS.addCourseUrl,
    method: 'get',
    params
  })
}

/**
 *@Description 评论管理 - 获取评论列表
 *@Param
 *@Return .
 **/
export function commentList (params) {
  return request({
    url: URLS.commentUrl,
    method: 'post',
    data: params
  })
}

/**
 *@Description 评论管理 - 评论列表 - 数据删除
 *@Param
 *@Return .
 **/
export function commentDel (params) {
  return request({
    url: URLS.commentDelUrl,
    method: 'get',
    params
  })
}

/**
 *@Description 课程管理 - 区域、学校、学生、教师、家长门户：首页课程点播；区域、学校门户：校园直播、课程中心；区域、学校、教师空间：课程管理、实时轮询
 *@Param
 *@Return .
 **/
export function courseMgt (params) {
  return request({
    url: URLS.courseMgtUrl,
    method: 'get',
    params
  })
}

/**
 *@Description 课程管理 - 获取平台 服务器配置列表.
 *@Param
 *@Return .
 **/
export function serverData (params) {
  return request({
    url: URLS.serverUrl,
    method: 'get',
    params
  })
}

/**
 *@Description 课程管理 - 获取平台 单个 服务器详细 信息.
 *@Param
 *@Return .
 **/
export function serverInfoData (params) {
  return request({
    url: URLS.serverInfoUrl,
    method: 'get',
    params
  })
}

/**
 *@Description 课程管理 - 获取平台 - 课程 - 视频资源 截图数量.
 *@Param
 *@Return .
 **/
export function coverNum (params) {
  return request({
    url: URLS.coverNumUrl,
    method: 'post',
    data: params
  })
}

/**
 *@Description 课程管理 - 获取平台 - 课程 - 视频资源 截图 服务器地址.
 *@Param
 *@Return .
 **/
export function coverImg (params) {
  return request({
    url: URLS.coverImgUrl,
    method: 'get',
    params
  })
}

/**
 *@Description 应用管理 - 实时轮巡 - 课程截图请求 封面url
 *@Param
 *@Return 不用参数 - 传对应的 url 即可.
 **/
export function courseCover (url) {
  return request({
    url: url,
    method: 'get',
  })
}
