/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/10/8 14:21
 *   @Author Waroom (yinmeng@codyy.com)
 *   @Description
 */
import request from '@/utils/request'
import URLS from '@/api/OCURL'

/**
 * 获取门户地图统计信息
 * @param data  000000
 */
export function getMapData (areaCode) {
  return request({
    url: URLS.getMapData,
    method: 'get',
    params: { areaCode: areaCode }
  })
}

/**
 * 获取门户地图Svg数据
 * @param data  000000
 */
export function getMapSvg (areaCode) {
  return request({
    url: URLS.getMapSvg,
    method: 'get',
    params: { areaCode: areaCode }
  })
}

/**
 * 获取区域首页课程表统计相关数据
 * @param data  000000
 */
export function getClassTableData (areaCode) {
  return request({
    url: URLS.getClassTableData,
    method: 'get',
    params: { areaCode: areaCode }
  })
}

/**
 * 获取区域首页课程表Dialog详细数据
 * @param data  000000
 */
export function getClassTableDialogData (areaCode, daySeq, classSeq, dayPeriodFlag) {
  return request({
    url: URLS.getClassTableDialogData,
    method: 'get',
    params: { areaCode, daySeq, classSeq, dayPeriodFlag }
  })
}

/**
 * 获取区域首页名师推荐相关数据
 * @param data  000000
 */
export function getTeacherListData (areaCode) { // 排查是否 需要删除 ------------------------------
  return request({
    url: URLS.getTeacherListData,
    method: 'get',
    params: { areaCode: areaCode }
  })
}

/**
 *@Description
 *@Param
 *@Return 门户首页 - 名师推荐.
 **/
export function famousData (params) {
  return request({
    url: URLS.famousUrl,
    method: 'get',
    params
  })
}
