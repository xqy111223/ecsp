/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/8 14:04
 *   @Author xuqingyu (xuqingyu@codyy.com)
 *   @Description 个人空间 - 应用管理 — 课表管理、实时轮巡、课程管理、评论管理
 */

/**
 * url type data mock(是否启用mock)
 */
import URLS from '@/api/OCURL'
import {
  addCourseList,
  byCourseList,
  classroomList,
  commentDel,
  commentList,
  courseMgt,
  courseUpdate,
  coverImgList,
  coverNumList,
  cursorList,
  delCourseList,
  gradeSubject,
  lessonList,
  participateList,
  pointList,
  roomList,
  schoolList,
  semesterList,
  serverInfoList,
  serverList,
  teacherList,
  timeList,
  vacationList
} from '../../data/personal/appMgt'

export default [{
  url: URLS.schoolUrl,
  type: 'get',
  data: schoolList, // 查询条件 - 学校数据
  mock: false
}, {
  url: URLS.classroomUrl,
  type: 'get',
  data: classroomList, // 查询条件 - 教室数据
  mock: true
}, {
  url: URLS.teacherUrl,
  type: 'get',
  data: teacherList, // 课表编辑 - 教师数据
  mock: false
}, {
  url: URLS.setTimeUrl,
  type: 'get',
  data: timeList, // 课表管理 - 设置上课时间
  mock: false
}, {
  url: URLS.roomTimeUrl,
  type: 'get',
  data: roomList, // 课表管理 - 节次、上课时间数据 - 教室使用（课表管理、家长学生空间）
  mock: true
}, {
  url: URLS.lessonUrl,
  type: 'get',
  data: lessonList, // 课表管理 - 节次数据 - 区域、学校使用（门户首页、老师空间）
  mock: true
}, {
  url: URLS.cursorUrl,
  type: 'get',
  data: cursorList, // 课表管理 - 课表数据
  mock: true
}, {
  url: URLS.semesterUrl,
  type: 'get',
  data: semesterList, // 课表管理 - 获取学期
  mock: true
}, {
  url: URLS.vacationUrl,
  type: 'get',
  data: vacationList, // 课表管理 - 获取日期是否是 假期
  mock: true
}, {
  url: URLS.participateUrl,
  type: 'get',
  data: participateList, // 课表管理 - 指定课程 - 参与方 - 信息
  mock: true
}, {
  url: URLS.byCourseUrl,
  type: 'get',
  data: byCourseList, // 课表管理、课程管理 - 获取指定课程 - 扩展信息
  mock: true
}, {
  url: URLS.courseUpdateUrl,
  type: 'get',
  data: courseUpdate, // 课程管理 - 编辑课程 - 扩展信息
  mock: true
}, {
  url: URLS.delCourseUrl,
  type: 'get',
  data: delCourseList, // 课表管理 - 批量删除 课程
  mock: true
}, {
  url: URLS.addCourseUrl,
  type: 'get',
  data: addCourseList, // 课表管理 - 批量添加 课程
  mock: true
}, {
  url: URLS.gradeUrl, // 课表管理、课程管理 - 获取年级、学科
  type: 'get',
  data: gradeSubject,
  mock: true
}, {
  url: URLS.pointUrl, // 课表管理、课程管理 - 获取 知识点
  type: 'get',
  data: pointList,
  mock: true
}, {
  url: URLS.commentUrl,
  type: 'post',
  data: commentList, // 评论管理 - 评论列表
  mock: true
}, {
  url: URLS.commentDelUrl, // 评论管理 - 评论列表 数据删除
  type: 'get',
  data: commentDel,
  mock: true
}, {
  url: URLS.courseMgtUrl, // 课程管理 - 区域、学校、学生、教师、家长门户：首页课程点播；区域、学校门户：校园直播、课程中心；区域、学校、教师空间：课程管理、实时轮询；后台课程回收站列表
  type: 'get',
  data: courseMgt,
  mock: true
}, {
  url: URLS.serverUrl, // 课程管理 - 获取平台 服务器配置列表
  type: 'get',
  data: serverList,
  mock: true
}, {
  url: URLS.serverInfoUrl, // 课程管理 - 获取平台 单个 服务器 详细 - 信息
  type: 'get',
  data: serverInfoList,
  mock: true
}, {
  url: URLS.coverNumUrl, // 课程管理 - 获取平台 - 课程 - 视频资源 截图数量
  type: 'get',
  data: coverNumList,
  mock: true
}, {
  url: URLS.coverImgUrl, // 课程管理 - 获取平台 - 课程 - 视频资源 截图 服务器地址
  type: 'get',
  data: coverImgList,
  mock: true
}]
