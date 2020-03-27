/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/12 11:10
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description 个人空间路由
 */

import Layout from '@/views/framework/Layout'

const PersonalCenter = () => import(/* webpackChunkName: "PersonalCenter" */'@/views/personal')
const BaseInfo = () => import(/* webpackChunkName: "BaseInfo" */'@/views/personal/accountSetting/BaseInfo')

export default {
  path: '',
  component: Layout,
  name: 'personalRoot',
  meta: {
    title: '互动课堂平台-个人空间'
  },
  children: [
    {
      path: '/personal',
      name: 'personal',
      redirect: '/accountSetting/BaseInfo',
      component: PersonalCenter,
      children: [{
        path: '/accountSetting/BaseInfo',
        name: 'BaseInfo',
        component: BaseInfo,
      }],
    }]
}
