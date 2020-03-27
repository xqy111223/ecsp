/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/8 10:43
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description
 */
import URLS from '@/api/OCURL'
import classTable from '../../data/onlineclass/home/classTable'
import tableDialogData from '../../data/onlineclass/home/tableDialogData'
import mapData from '../../data/onlineclass/home/mapData'
import mapSvg from '../../data/onlineclass/home/mapSvg'
import teacherList from '../../data/onlineclass/home/teacherList'
import bannerData from '../../data/onlineclass/portal/bannerData'

export default [{
  url: URLS.getMapData,
  type: 'get',
  data: mapData(),
  mock: true
}, {
  url: URLS.getMapSvg,
  type: 'get',
  data: mapSvg,
  mock: true
}, {
  url: URLS.getClassTableData,
  type: 'get',
  data: classTable,
  mock: true
}, {
  url: URLS.getClassTableDialogData,
  type: 'get',
  data: tableDialogData,
  mock: true
}, {
  url: URLS.getTeacherListData, // 做废弃 处理
  type: 'get',
  data: teacherList,
  mock: true
}, {
  url: URLS.famousUrl,
  type: 'get',
  data: teacherList,
  mock: true
}, {
  url: URLS.getPortalSetting,
  type: 'get',
  data: bannerData,
  mock: true
}]
