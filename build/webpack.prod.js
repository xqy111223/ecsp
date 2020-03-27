const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
// const PreloadWebpackPlugin = require('preload-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin') // vue加载器
const baseConfig = require('./webpack.base.js')
const util = require('./util')

module.exports = function (env) {
  return webpackMerge(baseConfig(env), {
    mode: 'production',
    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin([ // 复制插件 复制 公共组件对外 HTML展示以及主题 静态资源路径，开发环境需要配置nginx代理路径
        {
          from: util.resolve('/theme/extend/**/*.css'),
          to: util.resolve('/dist'),
          flatten: false,
        },
      ]),
      new HTMLWebpackPlugin({
        title: '阔地教育云平台',
        template: util.resolve('template/index.html'),
        favicon: util.resolve('template/codyy.ico'),
        filename: 'index.html',
        hash: true,
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        }
      }),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].css'
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
      //   as (entry) {
      //     if (/\.css$/.test(entry)) return 'style'
      //     if (/\.woff$/.test(entry)) return 'font'
      //     if (/\.png$/.test(entry)) return 'image'
      //     return 'script'
      //   },
      //   include: 'allChunks'
      // }),
    ],
    optimization: {
      minimizer: [
        new TerserJSPlugin({}), // 压缩js
        new OptimizeCSSAssetsPlugin({}) // 压缩css
      ],
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
    target: 'web',
    devtool: 'cheap-module-source-map'
  })
}
