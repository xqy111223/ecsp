/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/9/17 14:28
 *   @Author Waroom (yinmeng@codyy.com)
 *   @Description 封装element的message，使其项目化
 */
/* eslint-disable */
window.MessageMixin = {
  methods: {
    /**
     * @description: 全局messagebox自定义函数
     * @param opts $msgbox属性
     * @returns {Empty}
     */
    showMsgBox (opts) {
      const options = { title: '', customClass: 'el-alter', confirmButtonText: '知道了', ...opts }
      if (!opts.message) {
        throw new Error('message is empty')
      }
      // 存在描述文字，进行布局自定义
      if (options.desc) {
        options.dangerouslyUseHTMLString = true
        options.message = `<div class="el-message-box__body__main">${options.message}</div><div class="el-message-box__body__leaf">${options.desc}</div>`
      }
      return this.$msgbox(options)
    },
    showConfirmBox (opts) {
      const options = {
        customClass: 'el-confirm',
        showCancelButton: true,
        showConfirmButton: true, ...opts
      }
      switch (options.style || 1) {
        case 1:
          Object.assign(options, {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            cancelButtonClass: 'el-button--info',
            confirmButtonClass: 'el-button--primary'
          })
          break
        case 2:
          Object.assign(options, {
            cancelButtonText: '确定',
            confirmButtonText: '取消',
            cancelButtonClass: 'el-button--primary',
            confirmButtonClass: 'el-button--info'
          })
          break
        case 3:
          Object.assign(options, {
            cancelButtonText: '继续',
            confirmButtonText: '取消',
            cancelButtonClass: 'el-button--primary',
            confirmButtonClass: 'el-button--info'
          })
          if (typeof options.message === 'object') {
            // 根据内容进行拼接生成html
            options.dangerouslyUseHTMLString = true
            options.message = options.message.map(msg => {
              if (typeof msg === 'object') {
                return `<span class="el-message-box__body__${msg.type}">${msg.text}</span>`
              } else {
                return `<span>${msg}</span>`
              }
            }).join('')
          }
          break
      }
      if (!options.message || !options.title) {
        throw new Error('message or title is empty')
      }
      if (options.style === 2 || options.style === 3) { // 取消和确定按钮相反，需要处理promise的返回
        return new Promise((resolve, reject) => {
          this.$msgbox({
            ...options,
            callback: (action) => {
              return action === 'close' || action === 'confirm' ? reject('cancel') : resolve('confirm')
            }
          })
        })
      }
      return this.$msgbox(options)
    }
  }
}
