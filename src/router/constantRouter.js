/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/12 13:35
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description 静态路由
 */

import portal from './portal'
import forbidden from '@/views/errorPage/forbidden'

export default [
  portal,
  { path: '/forbidden', name: 'forbidden', component: forbidden },
  { path: '*', redirect: '/' }
]
