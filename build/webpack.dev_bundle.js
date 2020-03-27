const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
// const PreloadWebpackPlugin = require('preload-webpack-plugin')
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
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin([ // 复制插件 复制 公共组件对外 HTML展示以及主题 静态资源路径，开发环境需要配置nginx代理路径
        {
          from: util.resolve('/theme/extend/**/*.css'),
          to: util.resolve('/dist'),
          flatten: false,
        },
      ]),
      new HtmlWebpackPlugin({
        title: '阔地教育云平台',
        template: util.resolve('template/index.html'),
        favicon: util.resolve('template/codyy.ico'),
        filename: 'index.html',
        hash: true,
        inject: true,
      }),
      new VueLoaderPlugin(),
      new webpack.HashedModuleIdsPlugin(),
      new WorkboxPlugin.GenerateSW({
        cacheId: 'escp-ocss-pwa', // 设置前缀
        clientsClaim: true, // 让浏览器立即servece worker被接管
        skipWaiting: true, // 更新sw文件后，立即插队到最前面
        importWorkboxFrom: 'local',
        include: [/\.js$/, /\.css$/, /\.html$/, /\.jpg/, /\.jpeg/, /\.svg/, /\.webp/, /\.png/],
        importsDirectory: 'serviceWorker',
        runtimeCaching: [{
          urlPattern: /ecsp/,
          handler: 'NetworkFirst'
        }]
      }),
      // new PreloadWebpackPlugin({
      //   rel: 'preload',
      //   include: ['live']
      // }),
    ],
    optimization: {
      runtimeChunk: true,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            chunks: 'initial',
            test: 'vendor',
            name: 'vendor', // 使用 vendor 入口作为公共部分
            enforce: true
          }
        }
      }
    },
    devtool: 'eval-source-map',
    target: 'web'
  })
}
