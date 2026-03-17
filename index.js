const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors()); // 允许所有源跨域

// 代理配置
app.use('/api', createProxyMiddleware({
  target: 'https://user.stockapi.com.cn', // 强制用 HTTPS，避免 308 重定向
  changeOrigin: true,
  secure: true, // 目标是 HTTPS，必须设为 true
  followRedirects: true, // 让代理自动跟随 308 重定向
  pathRewrite: {
    '^/api': '' // 把 /api 前缀去掉，转发到 /v1/...
  },
  onProxyRes: function (proxyRes, req, res) {
    // 移除可能导致重定向的缓存头，避免浏览器缓存旧地址
    delete proxyRes.headers['cache-control'];
    delete proxyRes.headers['expires'];
  }
}));

module.exports = app;