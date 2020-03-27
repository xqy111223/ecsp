/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/19 10:50
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description 个人空间  动态路由数据
 */

export default {
  message: 'success',
  status: '000000000',
  result: [{
    menuId: 5,
    parentId: 0,
    title: '班级成员',
    name: 'classGroup',
    perms: [],
    type: 0,
    icon: 'el-icon-custom-account-setting',
    list: [{
      menuId: 501,
      parentId: 5,
      title: '班级成员',
      url: '/classGroup/ClassInfo',
      alias: '/class_group/class_info',
      name: 'ClassInfo',
      perms: [],
      type: 1,
      icon: ''
    }]
  }, {
    menuId: 6,
    parentId: 0,
    title: '账号设置',
    name: 'accountSetting',
    perms: [],
    type: 0,
    sort: 5,
    icon: 'el-icon-custom-account-setting',
    list: [{
      menuId: 601,
      parentId: 6,
      title: '基本资料',
      url: '/accountSetting/BaseInfo',
      alias: '/at_sg/be_io',
      name: 'BaseInfo',
      perms: [],
      type: 1,
      icon: ''
    }, {
      menuId: 602,
      parentId: 6,
      title: '修改头像',
      url: '/accountSetting/Avatar',
      alias: '/at_sg/avatar',
      name: 'Avatar',
      perms: [],
      type: 1,
      icon: ''
    }, {
      menuId: 603,
      parentId: 6,
      title: '修改密码',
      url: '/accountSetting/Password',
      alias: '/at_sg/password',
      name: 'Password',
      perms: [],
      type: 1,
      icon: ''
    }]
  }]
}
