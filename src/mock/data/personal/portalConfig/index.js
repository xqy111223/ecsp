/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/11/19 11:23
 *   @Author xuqingyu (xuqingyu@codyy.com)
 *   @Description
 */
import Mock from 'mockjs'

export const bannerList = Mock.mock(
  {
    message: 'banner数据',
    status: '000000000',
    'result|0-5': [{
      'id|+1': 1000,
      jumpUrl: '@url()',
      mobileUrl: '@url()',
      picUrl: '@url()',
      'sort|+1': 1
    }]
  })
export const addBanner = Mock.mock({
  message: '添加banner',
  result: {},
  status: '000000000',
})
export const editBanner = Mock.mock({
  message: '编辑banner',
  result: {},
  status: '000000000',
})
export const deleteBanner = Mock.mock({
  message: '删除banner',
  result: '',
  status: '000000000',
})
export const exchangeBanner = Mock.mock({
  message: '交换banner',
  result: {},
  status: '000000000',
})
export const famousList = Mock.mock({
  message: '名师列表',
  'result|1-6': [{
    'baseUserId|+1': 1000,
    headPicUrl: '@url()',
    'id|+1': 10,
    'schoolId|+1': 2000,
    schoolName: Mock.Random.city() + '高级中学',
    'sort|+1': 1,
    userName: '@cname',
  }],
  status: '000000000',
})
export const addFamous = Mock.mock({
  message: '添加名师',
  result: {},
  status: '000000000',
})
export const editFamous = Mock.mock({
  message: '添加名师',
  result: {},
  status: '000000000',
})
export const deleteFamous = Mock.mock({
  message: '移出名师',
  result: {},
  status: '000000000',
})
export const exchangeFamous = Mock.mock({
  message: '交换名师',
  result: {},
  status: '000000000',
})
export const searchTeacherList = Mock.mock({
  message: '查询教师列表',
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
export const searchSchoolList = Mock.mock({
  message: '学校数据',
  status: '000000000',
  'result|4-15': [{
    'status|1': true,
    'directOnly|1': false,
    'areaCode|+1': 100000,
    'schoolCode|+1': 1000,
    'baseAreaId|+1': 100,
    'orgCode|+1': 10000,
    'baseSchoolId|+1': 100,
    'sourceSchoolCode|+1': 10,
    areaName: Mock.mock('@county(true)'),
    'schoolName|1-4': Mock.Random.cword('101学校', 1, 4)
  }]
})
/**
 *@Description
 *@Param
 *@Return 个人空间 - 首页 - 最近访客.
 **/
export const visitorsList = Mock.mock({
  message: '首页 - 最近访客',
  status: '000000000',
  'result|15': [{
    id: '@id',
    url: 'http://file02.16sucai.com/d/file/2014/0704/e53c868ee9e8e7b28c424b56afe2066d.jpg',
    name: '@cname',
  }]
})
