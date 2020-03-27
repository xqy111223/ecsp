/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/4/30 13:44
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description  模拟数据
 */

import Mock from 'mockjs'
import onlineclass from './modules/onlineclass'
import personal from './modules/personal'
import common from './modules/common'
// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function () {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

Mock.setup({
  timeout: '50-100'
})
mockFactory(onlineclass, true) // 模拟数据-互动课堂门户
mockFactory(personal, true) // 模拟数据-个人空间
mockFactory(common, true) // 模拟数据-个人空间

/**
 * 创建mock模拟数据
 * @param {*} mods 模块集
 * @param {*} isOpen 是否开启?a
 */
function mockFactory (mods, isOpen = true) {
  if (isOpen) {
    mods.forEach(mod => {
      if (mod.mock) {
        // 2种url拦截方式
        const data = { mock: true, ...mod.data } // 区分这是mock数据  防止懵逼
        Mock.mock(mod.url, mod.type, data)
        Mock.mock(RegExp(mod.url + '.*'), mod.type, data)
      }
    })
  }
}

export default Mock
