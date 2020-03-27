/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/4/30 13:58
 *   @Author ZHUHAO  (zhuhao@codyy.com)
 *   @Description 请求CODE枚举
 */

export const SUCCESS = '000000000' // 成功
export const PLATFORM_NOEXIST = '100000000' // 平台不存在
export const USER_NOT_EXISTED = '100000001' // 用户不存在
export const INVALID_PWD = '100000002' // 用户密码不正确
export const USER_CLOSE = '100000003' // 用户关闭
export const USER_UNCERTIFIED = '100000004' // 未认证TOKEN失效
export const NO_VERIFY_CODE = '100000005' // 未输入验证码
export const VERIFY_CODE_ERROR = '100000006' // 验证码错误
export const VERIFY_CODE_INVALID = '100000007' // 验证码已过期
export const PLATFORM_CLOSE = '100000009' // 平台关闭
export const OP_FAILED = '900000001' // 操作失败
export const DB_FAILED = '900000002' // 数据错误
export const MCU_ROOM_CREAT_FAILD = '300000001' // mcu创建失败
export const PARAMS_ERROR = '200000001' // 参数错误
export const NO_ADMIN_SETTING = '300000003' // 后台未开启此功能
export const EXPIRED = '-1' // 登出 无效token

export const RES_MSG = {
  PLATFORM_NOEXIST: '平台不存在',
  USER_NOT_EXISTED: '用户不存在',
  INVALID_PWD: '用户密码不正确',
  USER_CLOSE: '用户关闭',
  USER_UNCERTIFIED: 'TOKEN失效',
  NO_VERIFY_CODE: '未输入验证码',
  VERIFY_CODE_ERROR: '验证码错误',
  VERIFY_CODE_INVALID: '验证码已过期',
  PLATFORM_CLOSE: '平台关闭',
  OP_FAILED: '操作失败',
  DB_FAILED: '数据错误',
  MCU_ROOM_CREAT_FAILD: 'mcu创建失败',
  PARAMS_ERROR: '参数错误',
  NO_ADMIN_SETTING: '后台未开启此功能'
}
