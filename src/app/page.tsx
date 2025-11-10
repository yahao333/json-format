'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            JSON 格式化工具
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            一个现代化的 JSON 格式化工具，让数据处理更简单
          </p>

          <div className="flex justify-center gap-4">
            <Button variant="default" size="lg">
              开始使用
            </Button>
            <Button variant="outline" size="lg">
              查看示例
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>📝 智能格式化</CardTitle>
              <CardDescription>
                自动识别和格式化 JSON 数据
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                支持各种格式的 JSON 字符串，自动美化输出
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎨 美观界面</CardTitle>
              <CardDescription>
                现代化的用户界面设计
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                使用 TailwindCSS 和 Shadcn/ui 构建的精美界面
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📋 一键复制</CardTitle>
              <CardDescription>
                轻松复制格式化结果
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                快速将格式化后的 JSON 复制到剪贴板
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>🚀 即将推出</CardTitle>
            <CardDescription>
              JSON 格式化功能正在开发中...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                我们正在为您打造最佳的 JSON 格式化体验
              </p>
              <Button variant="secondary" disabled>
                功能开发中...
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
