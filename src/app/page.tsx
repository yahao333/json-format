'use client';

import React, { useRef } from 'react';
import JsonFormatter from '../components/json-formatter/json-formatter';

export default function Home() {
  // 中文注释：用于滚动到工具区域的引用
  const toolRef = useRef<HTMLDivElement | null>(null);

  // 中文注释：滚动至格式化工具区域
  const scrollToTool = () => {
    toolRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-6">
        {/* 中文注释：页面顶部 Hero 区域，简洁但更美观 */}
        <section className="pt-14 pb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">JSON 格式化工具</h1>
          <p className="text-base md:text-lg text-gray-600">
            一个现代化的 JSON 格式化工具，让数据处理更简单
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={scrollToTool}
              className="px-5 py-2.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
            >
              开始使用
            </button>
          </div>
        </section>

        {/* 中文注释：主体工具卡片容器 */}
        <section ref={toolRef} className="pb-16">
          <div className="rounded-xl bg-white/80 backdrop-blur border border-indigo-100 shadow-sm">
            <div className="p-5 sm:p-7">
              {/* 中文注释：在首页中嵌入功能组件，保持按钮文案与占位符不变 */}
              <JsonFormatter />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
