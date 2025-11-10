'use client';

import React from 'react';
import JsonFormatter from '@/components/json-formatter/json-formatter';

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

        <JsonFormatter />
      </div>
    </main>
  );
}
