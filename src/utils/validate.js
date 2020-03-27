/**
 * 阔地教育科技有限公司版权所有（codyy.com/codyy.cn）.
 * Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 * @Date: 2019.09.10 10:00.
 * @Author
 * @Description 表单字段验证规则
 **/
const regObj = {
  userName: /^([a-z0-9,.;~!@#%^*()_+-=/]){5,30}$/,
  password: /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$)(?![a-z0-9,.;~!@#%^*()_+-=/]+$)^.{8,18}$/,
  name: '',
  email: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9.-]{0,100}$/,
  phone: /^1[0-9]{10}$/,
  landLine: /0\d{2,3}-\d{7,8}/,
  numLetter: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{12,30}$/,
  isExternal: /^(https?:|mailto:|tel:)/,
  isDomain: /^(http:\/\/|https:\/\/)(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+\.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z]\.[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'()\\.;?:@&=+$,%#-]+)+\/?)$/
}

/**
 * @description: 域名url
 * @param regObj 描述
 * @returns {}
 */
export function isDomain (url) {
  const re = regObj.isDomain
  return re.test(url)
}
/**
 *
 * @param path
 * @returns {boolean}
 */
export function isExternal (path) {
  const re = regObj.isExternal
  return re.test(path)
}

/**
 *@Description 用户名
 *@Param name
 *@Return.
 **/
export function checkUserName (name) {
  const re = regObj.userName
  return re.test(name)
}

/**
 *@Description 密码 规则与用户名一至
 *@Param str
 *@Return.
 **/
export function checkPassword (str) {
  const re = regObj.password
  return re.test(str)
}

/**
 *@Description 姓名
 *@Param name
 *@Return.
 **/
export function checkName (name) {
  const re = regObj.name
  return re.test(name)
}

/**
 *@Description email
 *@Param email
 *@Return.
 **/
export function checkEmail (email) {
  const re = regObj.email
  // console.log(re.test(email), 're.test(email)email')
  return re.test(email)
}

/**
 *@Description 手机
 *@Param num
 *@Return.
 **/
export function checkPhone (num) {
  const re = regObj.phone
  return re.test(num)
}

/**
 *@Description 座机
 *@Param num
 *@Return.
 **/
export function checkLandLine (num) {
  const re = regObj.landLine
  return re.test(num)
}

/**
 *@Description 12-30位 数字和字母组合
 *@Param str
 *@Return.
 **/
export function checkNumLetter (str) {
  const reg = regObj.numLetter
  return reg.test(str)
}
