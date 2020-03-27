/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/12/3 16:04
 *   @Author xuqingyu (xuqingyu@codyy.com)
 *   @Description 个人空间 、 门户入口 - 教学统计 数据mock
 */
import Mock from 'mockjs'

export const queryPlatformTerm = Mock.mock({
  message: '成功',
  result: [
    {
      baseAreaId: 1,
      baseTermVacationDTOList: 1,
      createAt: 1,
      modifyAt: 1,
      baseTermId: 5983265228599296,
      deleteFlag: 'N',
      endDate: 1577635200000,
      name: '2019下学期',
      startDate: 1561824000000
    },
    {
      baseAreaId: 1,
      baseTermVacationDTOList: 1,
      createAt: 1,
      modifyAt: 1,
      baseTermId: 5983270294335488,
      deleteFlag: 'N',
      endDate: 1514563200000,
      name: '2017下学期',
      startDate: 1498752000000
    }
  ],
  status: '000000000'
})

export const getClassStatistics = Mock.mock({
  message: '区域开课分析',
  'result|20-50': [
    {
      dataType: Mock.mock('@pick(["area", "school", "classroom"])'),
      'id|+1': 10000,
      name: Mock.mock('@city(true)'),
      'planCnt|300-10000': 420,
      'ratio|0-100': 20,
      'realCnt|300-10000': 522,
      'roomCnt|300-10000': 320
    }
  ],
  status: '000000000'
})

export const getTeacherClassStatistics = Mock.mock({
  message: '教师开课排行-实开课（区域/学校）',
  result: {
    'list|20-50': [
      {
        areaName: Mock.mock('@county'),
        areaPath: Mock.mock('@county(true)'),
        'invalidCnt|0-100': 34,
        'planCnt|20-500': 53,
        'ratio|0-100': 20,
        'realCnt|20-500': 69,
        schoolName: Mock.mock('@county') + '学校',
        teacherName: Mock.mock('@cname'),
        'techerUserId|+1': 2000
      }
    ],
    'pageCount|20-50': 25,
    'pageNum|5-100': 6,
    'pageSize|5-10': 20,
    'startRow|+1': 600,
    'total|500-10000': 559
  },
  status: '000000000'
})

export const getGradeClassStatistics = Mock.mock({
  message: '年级占比分析-实开课(区域/学校 )',
  'result|20': [
    {
      'baseGradeId|+1': 400,
      baseGradeName: Mock.mock('@pick(["一年级", "二年级", "三年级", "四年级", "五年级", "六年级"])'),
      'planCnt|20-500': 53,
      'ratio|1-100.0-2': 1,
      'realCnt|20-500': 69,
    }
  ],
  status: '000000000'
})

export const getSubjectClassStatistics = Mock.mock({
  message: '学科占比分析-实开课(区域/学校 )',
  'result|20': [
    {
      'baseSubjectId|+1': 400,
      baseSubjectName: Mock.mock('@pick(["英语", "数学", "美术", "自然", "物理", "化学"])'),
      'planCnt|20-500': 53,
      'ratio|0-100': 20,
      'realCnt|20-500': 69,
    }
  ],
  status: '000000000'
})
/**
*
*
*
*
*
*
*
 * *
 *
 *
 *
 *
 *
 *
 * *
 *
 *
 *
 *
 *
 *
 * *
 *
 *
 *
 *
 *
 *
**/
/**
 *@Description
 *@Param
 *@Return 门户入口 - 教学统计 - 近N月开课统计( 区域/学校 ).
 **/
export const statisticsMonth = Mock.mock({
  message: '近N月开课统计( 区域/学校 )',
  'result|12': [{
    'ratio|0-100': 50, // 比例
    'planCnt|0-5000': 2000, // 计划开课时数
    'realCnt|0-5000': 1500, // 实际开课数
    monthNo: Mock.Random.pick(['201901', '201902', '201903', '201904', '201905', 201906, 201907, 201908, 201909, 201910, 201911, 201912]), // 月份，如20190909
  }],
  status: '000000000'
})
/**
 *@Description
 *@Param
 *@Return 门户入口 - 教学统计 -  区域开课分析.
 **/
export const statisticsCourse = Mock.mock({
  message: '区域开课分析',
  'result|400': [{
    'ratio|0-100': 50, // 比例
    'planCnt|0-5000': 2000, // 计划开课时数
    'realCnt|0-5000': 1500, // 实际开课数
    name: Mock.Random.county(), // id 对应的 区域 、 学校 、 教室名称
  }],
  status: '000000000'
})
/**
 *@Description
 *@Param
 *@Return 门户入口 - 教学统计 - 学科占比分析-实开课(区域/学校 ).
 **/
export const statisticsSubject = Mock.mock({
  message: '学科占比分析-实开课(区域/学校 )',
  'result|17': [{
    'ratio|0-100': 50, // 比例
    'planCnt|0-100': 50, // 实开课时占比
    'baseSubejctId|0-100': 50, // 课程数量
    baseSubjectName: Mock.Random.cname() + '学科', // 学科名称
  }],
  status: '000000000'
})
/**
 *@Description
 *@Param
 *@Return 门户入口 - 教学统计 - 年级占比分析-实开课(区域/学校 ).
 **/
export const statisticsGrade = Mock.mock({
  message: '年级占比分析-实开课(区域/学校 )',
  'result|7': [{
    'ratio|20-100': 50, // 比例
    'realCnt|20-2000': 500, // 课程数
    planCnt: Mock.Random.pick(['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']) + '年级', // 年级名称
  }],
  status: '000000000'
})
/**
 *@Description
 *@Param
 *@Return 门户入口 - 教学统计 - 教师开课排行-实开课（区域/学校）.
 **/
export const statisticsTea = Mock.mock({
  message: '教师开课排行-实开课（区域/学校）',
  result: {
    'list|10': [{
      areaPath: '', // 所在区域 path
      'ratio|1-100': 50, // 比例
      'planCnt|20-500': 100, // 计划开课数
      'realCnt|200-2000': 1000, // 实际开课数
      schoolName: Mock.Random.cname() + '学校', // 学校名称
      teacherName: Mock.Random.cname() + '老师', // 教师名称
    }]
  },
  status: '000000000'
})
