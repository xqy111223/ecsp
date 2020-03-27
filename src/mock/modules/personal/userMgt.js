/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/8 13:51
 *   @Author xuqingyu (xuqingyu@codyy.com)
 *   @Description 用戶管理模塊---角色管理和用戶管理mock数据
 */
import URLS from '@/api/OCURL'
import platFunction from '../../data/personal/userMgt/platFunction'
import roleList from '../../data/personal/userMgt/roleList'
import submitData from '../../data/personal/userMgt/submit'
import userList from '../../data/personal/userMgt/userList'
import teacherList from '../../data/personal/userMgt/teacherList'
import gradeClassList from '../../data/personal/userMgt/gradeClassList'
import subjectList from '../../data/personal/userMgt/subjectList'
import gradeSubjectList from '../../data/personal/userMgt/gradeSubjectList'
import userDetailInfo from '../../data/personal/userMgt/userDetailInfo'

/**
 * url type data mock(是否启用mock)
 */
export default [
  {
    url: URLS.getRoleList,
    type: 'get',
    data: roleList,
    mock: false
  }, {
    url: URLS.getRoleFunctions,
    type: 'get',
    data: platFunction,
    mock: false
  }, {
    url: URLS.submitAddRole,
    type: 'post',
    data: submitData,
    mock: false
  }, {
    url: URLS.submitEditRole,
    type: 'post',
    data: submitData,
    mock: false
  }, {
    url: URLS.submitDeleteRole,
    type: 'post',
    data: submitData,
    mock: false
  }, {
    url: URLS.getUserList,
    type: 'get',
    data: userList,
    mock: false
  }, {
    url: URLS.submitAddUser,
    type: 'post',
    data: submitData,
    mock: false
  }, {
    url: URLS.submitEditUser,
    type: 'post',
    data: submitData,
    mock: false
  }, {
    url: URLS.submitDeleteUser,
    type: 'post',
    data: submitData,
    mock: false
  }, {
    url: URLS.getTeacherList,
    type: 'get',
    data: teacherList,
    mock: false
  }, {
    url: URLS.getGradeClassList,
    type: 'get',
    data: gradeClassList,
    mock: false
  }, {
    url: URLS.getKnowledgeList,
    type: 'get',
    data: gradeSubjectList,
    mock: false
  }, {
    url: URLS.getSubjectList,
    type: 'get',
    data: subjectList,
    mock: true
  }, {
    url: URLS.setFamousTeacher,
    type: 'post',
    data: teacherList,
    mock: false
  }, {
    url: URLS.getUserDetailInfo,
    type: 'get',
    data: userDetailInfo,
    mock: false
  }, {
    url: URLS.getParentList,
    type: 'get',
    data: teacherList,
    mock: true
  }, {
    url: URLS.submitAddParent,
    type: 'get',
    data: teacherList,
    mock: true
  }, {
    url: URLS.submitEditParent,
    type: 'get',
    data: teacherList,
    mock: true
  }, {
    url: URLS.submitDeleteParent,
    type: 'get',
    data: teacherList,
    mock: true
  }
]
