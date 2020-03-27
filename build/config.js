module.exports = {
  host: 'localhost',
  port: 8088,
  publicPath: '/',
  proxyTable: [{ // proxy URLs to backend development server
    context: ['/api'],
    // pathRewrite: { '^/api': '' },
    // target: 'http://10.5.31.225:8888',
    target: 'http://10.5.52.91',
    // target: 'http://10.5.225.4:8888',
  }],
  API_ROOT: process.env.NODE_ENV === 'development' ? 'http://10.5.52.91:8888' : ''
}
