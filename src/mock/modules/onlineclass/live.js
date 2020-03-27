import URLS from '@/api/OCURL'
import livePeople from '../../data/onlineclass/live/live-people'

/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/8 10:46
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description
 */
export default [
  {
    url: URLS.getLivePeopleData,
    type: 'get',
    data: livePeople,
    mock: true
  }
]
