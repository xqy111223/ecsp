/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/8 10:43
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description
 */
import URLS from '@/api/OCURL'
import broadcastComment from '../../data/onlineclass/course/broadcast-comment'
import classLevels from '../../data/onlineclass/course/class-levels'
import courseList from '../../data/onlineclass/course/course-list'
import course from '../../data/onlineclass/course/course'
import subject from '../../data/onlineclass/course/subject'

export default [{
  url: URLS.getBroadCommentData,
  type: 'get',
  data: broadcastComment,
  mock: true
}, {
  url: URLS.getClassLevelData,
  type: 'get',
  data: classLevels,
  mock: false
}, {
  url: URLS.getCourseListData,
  type: 'get',
  data: courseList,
  mock: true
}, {
  url: URLS.getSubjectData,
  type: 'get',
  data: subject,
  mock: true
}, {
  url: URLS.getCourseData,
  type: 'get',
  data: course,
  mock: true
}]
