'use client';

import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            JSON 格式化工具
          </h1>
          <p className="text-lg text-gray-600">
            一个现代化的 JSON 格式化工具，让数据处理更简单
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              JSON 格式化工具
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  alert('功能开发中...');
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                开始使用
              </button>
              <button
                onClick={() => {
                  alert('清空内容');
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                清空
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <textarea
                placeholder="请输入 JSON 字符串..."
                className="w-full h-32 p-3 border rounded font-mono text-sm"
              />
            </div>

            <div>
              <div className="p-4 bg-gray-50 rounded border min-h-[300px]">
                <div className="text-gray-500 text-center py-12">
                  格式化结果将显示在这里
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
