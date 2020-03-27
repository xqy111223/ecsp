/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/24 10:47
 *   @Author zhuhao (zhuhao@codyy.com)
 *   @Description 通用的工具函数
 */

/**
 *   @description: 随机八位密码
 *   @param arguments 描述
 *   @returns {}
 */
export function randomPassword () {
  const num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] // 数字类型数组
  const lower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'] // 小写字母数组
  const upper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'] // 大写字母数组
  const symbol = ['-', '.', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', ':', '<', '>', '?'] // 特殊字符数组
  const a = Math.ceil(Math.random() * 5) // 从数字类型数组中随机的item个数 因为是八位,所以a的范围为1-5
  const b = Math.ceil(Math.random() * (6 - a)) // 从小写字母数组中随机的item个数
  const c = Math.ceil(Math.random() * (7 - a - b)) // 从大写字母数组中随机的item个数
  const d = 8 - a - b - c // 从特殊字符数组中随机的item个数
  let pwd = this.randomStr(num, a) + this.randomStr(lower, b) + this.randomStr(upper, c) + this.randomStr(symbol, d) // 将获取的字符串拼接
  pwd = this.randomSort(pwd) // 将组合在一起的密码随机排序
  return pwd.replace(/,/g, '')
}

/**
 *   @description: 列表随机抽取元素
 *   @param arr 描述
 *   @returns {}
 */
export function randomStr (arr, count) {
  let index = ''
  const newArr = []
  for (let i = 0; i < count; i++) {
    index = Math.ceil(Math.random() * (arr.length - 1))
    newArr.push(arr[index])
  }
  return newArr.toString()
}

/**
 *   @description: 合并后密码列表随机排序为密码字符串
 *   @param arr 描述
 *   @returns {}
 */
export function randomSort (str) {
  const arr = str.split('')
  for (let i = 0; i < arr.length; i++) {
    const index = Math.ceil(Math.random() * (arr.length - 1))
    const item = arr[index]
    arr[index] = arr[arr.length - i - 1]
    arr[arr.length - i - 1] = item
  }
  return arr.join('')
}
