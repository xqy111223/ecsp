/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/12 11:09
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description 门户路由
 */

import Layout from '@/views/framework/Layout'

const OCHome = () => import(/* webpackChunkName: "OCHome" */'@/views/onlineClass/Home')
const OCCourse = () => import(/* webpackChunkName: "OCCourse" */'@/views/onlineClass/Course')
const OCLive = () => import(/* webpackChunkName: "OCLive" */'@/views/onlineClass/Live')
const OCStatistics = () => import(/* webpackChunkName: "OCStatistics" */'@/views/onlineClass/Statistics')
const OCCourseBroadcast = () => import(/* webpackChunkName: "OCCourseBroadcast" */'@/views/onlineClass/CourseBroadcast')
const OCLiveBroadcast = () => import(/* webpackChunkName: "OCLiveBroadcast" */'@/views/onlineClass/LiveBroadcast')
const PersonalSpace = () => import(/* webpackChunkName: "PersonalSpace" */'@/views/onlineClass/PersonalSpace')

export default {
  path: '',
  component: Layout,
  children: [{
    path: '/',
    name: 'Home',
    component: OCHome,
    meta: {
      title: '互动课堂平台-首页'
    },
  }, {
    path: '/course',
    name: 'Course',
    component: OCCourse,
    meta: {
      title: '互动课堂平台-课程中心'
    },
  }, {
    path: '/live',
    name: 'Live',
    component: OCLive,
    meta: {
      title: '互动课堂平台-校园直播'
    },
  }, {
    path: '/statistics',
    name: 'Statistics',
    component: OCStatistics,
    meta: {
      title: '互动课堂平台-教学统计'
    },
  }, {
    path: '/broadcast/:id',
    name: 'CourseBroadcast',
    component: OCCourseBroadcast,
    meta: {
      title: '互动课堂平台-课程点播'
    },
  }, {
    path: '/pl_space',
    name: 'PersonalSpace',
    component: PersonalSpace
  }, {
    path: '/live/:id',
    name: 'LiveBroadcast',
    component: OCLiveBroadcast,
    meta: {
      title: '互动课堂平台-课程直播'
    },
  }]
}
