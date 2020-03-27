/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/14 17:21
 *   @Author Waroom (yinmeng@codyy.com)
 *   @Description
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

/**
 * 获取指定的课程信息
 * @param id  课程Id
 */
export function getLivePeopleData (id) {
  return request({
    url: URLS.getLivePeopleData,
    method: 'get',
    params: { id: id }
  })
}
