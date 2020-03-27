/**
 *   阔地教育科技有限公司版权所有（codyy.com/codyy.cn）
 *   Copyright (c) 2019, Codyy and/or its affiliates. All rights reserved.
 *   @Date: 2019/4/15 11:18
 *   @Author Chasen (caoxin@codyy.com)
 *   @Description 分离静态库 持久化缓存处理
 */

const webpack = require('webpack')
const config = require('./config')
const util = require('./util')
const libs = config.libs

module.exports = function (env) {
  return {
    entry: {
      libs: libs
    },
    output: {
      filename: 'js/[name].js',
      path: util.resolve('dll'),
      library: '[name]'
    },
    plugins: [
      new webpack.DllPlugin({
        path: util.resolve('dll/manifest.json'),
        name: '[name]'
      })
    ]
  }
}
