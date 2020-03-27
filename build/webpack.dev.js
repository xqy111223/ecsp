const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin') // vue加载器
const baseConfig = require('./webpack.base.js')
const config = require('./config')
const util = require('./util')
const port = config.port

module.exports = function (env) {
  console.log(`
#################################################
  Server is listening at: http://localhost:${port}
#################################################
`)
  return webpackMerge(baseConfig(env), {
    mode: 'development',
    plugins: [
      new HtmlWebpackPlugin({
        title: '阔地教育云平台',
        template: util.resolve('template/index.html'),
        favicon: util.resolve('template/codyy.ico'),
        filename: 'index.html',
        hash: true,
        inject: true,
      }),
      new VueLoaderPlugin(),
      new webpack.HashedModuleIdsPlugin()
    ],
    optimization: {
      splitChunks: {
        // Must be specified for HtmlWebpackPlugin to work correctly.
        // See: https://github.com/jantimon/html-webpack-plugin/issues/882
        chunks: 'all'
      }
    },
    devServer: {
      hot: true,
      open: true,
      host: config.host,
      port: port,
      https: false,
      publicPath: config.publicPath,
      proxy: config.proxyTable,
      historyApiFallback: true
    },
    // productionSourceMap: true, // webpack 调式 true的时候打包生成map文件 代码不加密 定位错误位置
    devtool: 'eval-source-map',
    target: 'web'
  })
}
