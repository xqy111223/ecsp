/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/4/3 15:21
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description  门户组件库，包含业务，包含获取接口
 */
// const context = require.context('./onlineclass', true, /\.vue/) // 动态遍历文件 获取门户全局注册组件 打包一个文件
// const fileNames = context.keys()
// const components = []
// fileNames.forEach(fileName => {
//   const __fileName = fileName.replace(/\/index.\w+$/g, '')
//   const paths = __fileName.split('/')
//   const componentName = paths[paths.length - 1]
//   components.push({ name: componentName, component: () => import('./onlineclass/' + fileName.replace(/^\.\//, '')) })
// })

import OCBannerComp from './onlineclass/home/OCBanner' // 直接首页加载
import ClassTableComp from './onlineclass/home/ClassTable' // 直接首页加载
import HomeCourseListComp from './onlineclass/home/HomeCourseList' // 直接首页加载
import HomeTeacherListComp from './onlineclass/home/HomeTeacherList' // 直接首页加载

const OCBanner = {
  name: 'OCBanner',
  component: OCBannerComp
}
const ClassTable = {
  name: 'ClassTable',
  component: ClassTableComp
}
const HomeCourseList = {
  name: 'HomeCourseList',
  component: HomeCourseListComp
}
const HomeTeacherList = {
  name: 'HomeTeacherList',
  component: HomeTeacherListComp
}
const CoursePortal = {
  name: 'CoursePortal',
  component: () => import(/* webpackChunkName: "CoursePortal" */'./onlineclass/course/CoursePortal')
}
const LivePortal = {
  name: 'LivePortal',
  component: () => import(/* webpackChunkName: "LivePortal" */'./onlineclass/live/LivePortal')
}
const ClassLevelReport = {
  name: 'ClassLevelReport',
  component: () => import(/* webpackChunkName: "ClassLevelReport" */'./onlineclass/statistics/ClassLevelReport')
}
const StartClassReport = {
  name: 'StartClassReport',
  component: () => import(/* webpackChunkName: "StartClassReport" */'./onlineclass/statistics/StartClassReport')
}
const SubjectReport = {
  name: 'SubjectReport',
  component: () => import(/* webpackChunkName: "SubjectReport" */'./onlineclass/statistics/SubjectReport')
}
const TeacherRankReport = {
  name: 'TeacherRankReport',
  component: () => import(/* webpackChunkName: "TeacherRankReport" */'./onlineclass/statistics/TeacherRankReport')
}

const components = [
  OCBanner,
  ClassTable,
  HomeCourseList,
  HomeTeacherList,
  CoursePortal,
  LivePortal,
  ClassLevelReport,
  StartClassReport,
  SubjectReport,
  TeacherRankReport
]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component.component)
  })
}

export default {
  version: '1.0.0',
  install
}
