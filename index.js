const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 允许所有源访问代理服务（Pages 页面可正常请求）
app.use(cors());

// 配置代理规则：匹配 /api 开头的请求，转发到目标接口
app.use('/api', createProxyMiddleware({
  target: 'http://user.stockapi.com.cn', // 你的目标接口域名
  changeOrigin: true, // 关键：修改请求头的 Origin，让后端认为是同源请求
  pathRewrite: { '^/api': '' }, // 去掉 /api 前缀（比如 /api/v1/xxx → /v1/xxx）
}));

// 启动服务
app.listen(PORT, () => {
  console.log(`代理服务运行在：http://localhost:${PORT}`);
});