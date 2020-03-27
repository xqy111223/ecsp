/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/12/10 10:35
 *   @Author xuqingyu (xuqingyu@codyy.com)
 *   @Description
 */
import Mock from 'mockjs'

export const teacherClass = Mock.mock({
  message: '教师-班级信息',
  status: '000000000',
  'result|0-5': [{
    className: '@word',
    gradeCustomName: '@word',
    'gradeId|+1': 100000,
    gradeName: '@cname',
    'schoolClassId|+1': 1000,
    'baseAreaId|1-100': 100,
    'status|0-1': 1
  }]
})
export const classMembers = Mock.mock({
  message: '班级成员-班级信息',
  status: '000000000',
  result: {
    headTeacherInfo: [
      {
        baseUserId: '@id',
        headPicUrl: '@url',
        loginName: '@name',
        userName: '@cname'
      }
    ],
    'studentInfo|15-40': [
      {
        baseUserId: '@id',
        headPicUrl: '@url',
        loginName: '@name',
        userName: '@cname',
        parentId: '@id',
        parentLoginName: '@name',
        parentName: '@cname',
      }
    ],
    'teachTeacherInfo|5-16': [
      {
        baseUserId: '@id',
        headPicUrl: '@url',
        loginName: '@name',
        userName: '@cname',
        subjectInfo: [
          {
            subjectCustomName: '@word',
            subjectId: '@id',
            subjectName: '@cname'
          }
        ]
      }
    ],
  }
})
export const studentClass = Mock.mock({
  message: '学生-班级信息',
  status: '000000000',
  result: {
    className: true,
    'schoolClassId|+1': 1000,
    'status|0-1': 1
  }
})
export const childrenClass = Mock.mock({
  message: '家长孩子-班级信息',
  status: '000000000',
  'result|0-5': [{
    className: true,
    loginName: '@name',
    'schoolClassId|+1': 1000,
    'status|0-1': 1,
    'userId|+1': 100000,
    userName: '@cname',
  }]
})
