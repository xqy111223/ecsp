/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/11/28 10:15
 *   @Author xuqingyu (xuqingyu@codyy.com)
 *   @Description
 */
import Mock from 'mockjs'

export const querySubjectOptions = Mock.mock({
  'result|5-20': [
    {
      'code|+1': 1000,
      'id|+1': 2000,
      name: '@first',
      'parent_id|+1': 100,
      type: 'SBUJECT'
    }
  ],
  status: '000000000'
})

export const queryUserOptions = Mock.mock({
  message: '查询教师/学生列表',
  result: {
    'list|1-16': [
      {
        'adminUserType|0-2': 0,
        'areaId|+1': 100000,
        areaPath: '@county(true)',
        'baseSchoolId|+1': 100,
        baseSchoolName: Mock.mock('@city') + '高级中学',
        'baseUserId|+1': 1000,
        'createPlatformType|0-1': 0,
        'createTime|+10000': 1507800218000,
        'createUserId|+1': 10000,
        createUserLoginName: '@name',
        createUserName: '@cname',
        email: '@email',
        'entranceYear|+10000': 1507800218000,
        headPicUrl: 'http://dummyimage.com/300x600',
        'isFamous|0-1': 0,
        loginName: '@name',
        mobile: /^1(3|4|5|7|8)\d{9}$/,
        phone: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,
        remark: '@ctitle',
        'status|0-1': 0,
        stuNo: '@guid',
        userName: '@cname'
      }
    ],
    'pageCount|1-100': 5,
    'total|500-1000': 700
  },
  status: '000000000'
})

export const queryClassDetail = Mock.mock({
  message: '根据Id查询班级详情',
  result: {
    className: Mock.mock('@cword("123456789", 1)') + '班',
    'endYear|+10000': 1507800218000,
    gradeCustomName: '',
    'gradeId|+1': 100,
    gradeName: Mock.mock('@cword("一二三四五六七八九", 1)') + '年级',
    'headTeacherId|+1': 1000,
    headTeacherLoginName: '@first',
    headTeacherName: '@cname',
    'schoolClassId|+1': 1000,
    'startYear|+10000': 1507800218000,
    'status|0-2': 1,
    'studentNum|0-500': 356,
    'teachTeacherCnt|1-20': 10
  },
  status: '000000000'
})

export const submitSetClassMonitor = Mock.mock({
  message: '基础设置-班级管理-设置班长',
  result: {},
  status: '000000000'
})

export const notClassStudentList = Mock.mock({
  message: '查询不在此班级中的学生',
  result: {
    'list|10-20': [
      {
        loginName: '@first',
        'status|0-2': 1,
        'userId|+1': 1000,
        userName: '@cname',
      }
    ],
    'pageCount|1-100': 5,
    'total|500-1000': 700
  },
  status: '000000000'
})
