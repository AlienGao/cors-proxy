const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
// 允许所有源访问代理服务（Pages 页面可正常请求）
app.use(cors());

// 配置代理规则：匹配 /api 开头的请求，转发到你的目标接口
app.use('/api', createProxyMiddleware({
  target: 'http://user.stockapi.com.cn', // 替换为你的目标接口域名
  changeOrigin: true, // 关键：修改请求头 Origin，避免后端跨域拦截
  pathRewrite: { '^/api': '' }, // 去掉 /api 前缀（比如 /api/v1/xxx → /v1/xxx）
  secure: false, // 如果目标接口是 HTTP，需设为 false；HTTPS 则设为 true
}));

// 启动服务（Vercel 会自动识别端口）
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`代理服务运行在端口：${PORT}`);
});

// 导出 app（Vercel 要求的格式）
module.exports = app;
