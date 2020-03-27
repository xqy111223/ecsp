/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/12/10 10:35
 *   @Author xuqingyu (xuqingyu@codyy.com)
 *   @Description
 */
import URLS from '@/api/OCURL'
import { childrenClass, classMembers, studentClass, teacherClass } from '../../data/personal/classGroup/'

export default [
  {
    url: URLS.queryTeacherClass,
    type: 'get',
    data: teacherClass,
    mock: false
  },
  {
    url: URLS.getClassMembers,
    type: 'get',
    data: classMembers,
    mock: false
  },
  {
    url: URLS.queryStudentClass,
    type: 'get',
    data: studentClass,
    mock: false
  },
  {
    url: URLS.queryChildrenClass,
    type: 'get',
    data: childrenClass,
    mock: false
  },
]
