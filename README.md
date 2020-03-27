#ECSP6.0.1互动课堂子平台

> 项目包含三大模块:门户展示平台、个人空间、门户统一平台

# 使用
[项目开发遵守阔地前端开发规范](http://10.5.60.10/frontend/frontend-code-rule.git)
## 安装
```
npm install
``` 

## 配置
### 项目结构
```
├── README.md
├── build // webpack工程化目录结构
│   ├── config.js // IP/端口，反向代理配置文件
│   ├── util.js // webpack工具类
│   ├── webpack.base.js // webpack loader 公用配置
│   ├── webpack.dev.js // 开发环境热部署配置
│   ├── webpack.dev_bundle.js // 开发环境非热部署配置
│   ├── webpack.dll.js // 静态资源打包配置 已去除 可忽略
│   └── webpack.prod.js // 生产环境打包配置
├── demo // 主题UI组件定制化Demo
│   └── font
│       ├── demo.css
│       └── demo_index.html
├── dist // 生产环境编译打包目录
│   ├── codyy.ico
│   ├── index.html
│   ├── service-worker.js
│   ├── serviceWorker
│   ├── static
│   └── theme
├── doc // 忽略
│   └── nginx
├── docker // docker配置
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── intractionclass.conf
│   ├── nginx.conf
│   └── startup.sh
├── package-lock.json
├── package.json
├── postcss.config.js
├── src // 业务代码目录
│   ├── App.vue  // vue 顶层路由 可在此处添加初始化信息
│   ├── api // 接口对接层
│   ├── assets // 图片 样式等静态资源
│   ├── components // 组件库 包含common组件库已经业务组件库 劲量采用无状态组件
│   ├── config
│   ├── constants // 静态变量
│   ├── main.js // vue业务入口
│   ├── mock // mock数据目录
│   ├── portal // 门户配置组件 包含所有门户复合组件 后期定义版本
│   ├── router 业务路由
│   ├── store 状态管理层
│   ├── styles // 可移除 忽略
│   ├── utils // 包含http请求 等工具累
│   └── views // 门户页面
├── template // 网站模板入口
│   ├── codyy.ico
│   └── index.html
├── theme // 主题定制目录
│   ├── default
│   ├── extend
│   ├── fonts
│   ├── normalize.css
│   └── theme.html
└── webpack.config.js // webpack入口

```

### 部分代码说明
##### 接口代理地址配置
文件目录 /build/config.js
```
module.exports = {
  host: '0.0.0.0', // 开发环境热部署IP 0.0.0.0代表支持局域网访问，可选择loaclhost/127.0.0.1
  port: 8088, // 开发环境热部署端口
  publicPath: '/', // 默认配置
  proxyTable: [{ // proxy URLs to backend development server
    context: ['/api'], // 代理接口网管拦截正则 restful规则
    // pathRewrite: { '^/ecsp': '' }, // 服务端若是配置了nginx 可忽略此配置
    // target: 'http://10.5.31.225:8888', 
    target: 'http://10.5.52.91', // 代理服务器IP地址
  }],
}
```

##### mocks数据开发
文件目录 /src/mock/index.js
```
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

```
- 根据功能模块开发，当有新模块创建模块目录,mockFactory(moduleName,true)，true mock数据 false 走接口请求
- 模块定义遵循语义化

##### 主题定制开发
文件目录 /theme
```
│   ├── default
│   ├── extend // 所有主题定制都放这里 区域
|   |   |—— xxx区域文件夹
|   |       |—— xxx.css
|   | 
│   ├── fonts
│   ├── normalize.css
│   └── theme.html
```
- 定制的主题创建区域的文件夹，学校定制在区域文件夹下创建，有利于以后的维护


##### 主题定制css生产环境部署
文件目录 /build/webpack.prod.js
```
new CopyWebpackPlugin([ // 复制插件 复制 公共组件对外 HTML展示以及主题 静态资源路径，开发环境需要配置nginx代理路径
    {
      from: util.resolve('/theme/extend/**/*.css'),
      to: util.resolve('/dist'),
      flatten: false,
    },
]),
```
- 生产环境中将/theme中的样式拷贝到/dist目录中，当有区域主题定制的时候，访问http://IP/theme/XXXarea.css可覆盖默认样式


# 开发环境
```
npm run dev
```
#生产环境部署
```
npm run build
```
