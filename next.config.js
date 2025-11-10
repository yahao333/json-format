/** @type {import('next').NextConfig} */

const nextConfig = {
  // 配置构建选项
  trailingSlash: false,

  // 添加重写规则，忽略测试覆盖率目录
  async rewrites() {
    return [
      {
        source: '/coverage/:path*',
        destination: '/404',
      },
    ];
  },
}

module.exports = nextConfig
