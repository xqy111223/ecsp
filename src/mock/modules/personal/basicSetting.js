/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/11/1 18:11
 *   @Author xuqingyu (xuqingyu@codyy.com)
 *   @Description 基础模块——教室管理，班级管理
 */
import URLS from '@/api/OCURL'
import classroomList from '../../data/personal/basicSetting/classroomList'
import classroomDetail from '../../data/personal/basicSetting/classroomDetail'
import submitData from '../../data/personal/userMgt/submit'
import gradeClassList from '../../data/personal/basicSetting/gradeClassList'
import classTeacherList from '../../data/personal/basicSetting/classTeacherList'
import classStudentList from '../../data/personal/basicSetting/classStudentList'
import autoUpgradeInfo from '../../data/personal/basicSetting/autoUpgradeInfo'
import {
  notClassStudentList,
  queryClassDetail,
  querySubjectOptions,
  queryUserOptions
} from '../../data/personal/basicSetting/'

/**
 * url type data mock(是否启用mock)
 */
export default [
  {
    url: URLS.getClassroomList,
    type: 'get',
    data: classroomList,
    mock: true
  }, {
    url: URLS.getClassroomDetail,
    type: 'get',
    data: classroomDetail,
    mock: true
  }, {
    url: URLS.submitEditClassroom,
    type: 'get',
    data: submitData,
    mock: true
  }, {
    url: URLS.submitBindClass,
    type: 'get',
    data: submitData,
    mock: true
  }, {
    url: URLS.getGradeClassInfoList,
    type: 'get',
    data: gradeClassList,
    mock: true
  }, {
    url: URLS.submitAddOrEditClass,
    type: 'get',
    data: submitData,
    mock: true
  }, {
    url: URLS.submitDeleteClass,
    type: 'get',
    data: submitData,
    mock: true
  }, {
    url: URLS.submitUpgradeClass,
    type: 'post',
    data: submitData,
    mock: true
  }, {
    url: URLS.submitDismissClass,
    type: 'post',
    data: submitData,
    mock: true
  }, {
    url: URLS.getClassTeacherList,
    type: 'get',
    data: classTeacherList,
    mock: true
  }, {
    url: URLS.getClassStudentList,
    type: 'get',
    data: classStudentList,
    mock: true
  }, {
    url: URLS.submitSelectedClassSubject,
    type: 'post',
    data: submitData,
    mock: true
  }, {
    url: URLS.submitRemoveClassTeacher,
    type: 'post',
    data: submitData,
    mock: true
  }, {
    url: URLS.submitAddClassTeacher,
    type: 'post',
    data: submitData,
    mock: true
  }, {
    url: URLS.submitAddClassStudent,
    type: 'post',
    data: submitData,
    mock: true
  }, {
    url: URLS.submitSetClassMonitor,
    type: 'post',
    data: submitData,
    mock: true
  }, {
    url: URLS.getNotClassStudentList,
    type: 'get',
    data: notClassStudentList,
    mock: true
  }, {
    url: URLS.submitSetAutoUpgrade,
    type: 'post',
    data: submitData,
    mock: true
  }, {
    url: URLS.getAutoUpgradeInfo,
    type: 'get',
    data: autoUpgradeInfo,
    mock: true
  }, {
    url: URLS.submitCancelAutoUpgrade,
    type: 'post',
    data: submitData,
    mock: true
  }, {
    url: URLS.queryUserOptions,
    type: 'get',
    data: queryUserOptions,
    mock: false
  }, {
    url: URLS.queryClassDetail,
    type: 'get',
    data: queryClassDetail,
    mock: true
  }, {
    url: URLS.querySubjectOptions,
    type: 'get',
    data: querySubjectOptions,
    mock: true
  }
]
