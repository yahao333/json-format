'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Bug, Settings, Rocket, Heart } from 'lucide-react';
import JsonFormatter from '../components/json-formatter/json-formatter';
import LanguageSwitcher from '../components/language-switcher';
import ThemeToggle from '../components/theme-toggle';
import { useI18n } from '../lib/i18n';

export default function Home() {
  // 中文注释：获取翻译函数
  const { t } = useI18n();
  // 中文注释：用于滚动到工具区域的引用
  const toolRef = useRef<HTMLDivElement | null>(null);

  // 中文注释：滚动至格式化工具区域
  const scrollToTool = () => {
    toolRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // 中文注释：为页面徽标随机选择一个图标（仅在客户端挂载后执行，避免 SSR hydration 问题）
  const [HeroIcon, setHeroIcon] = useState<React.ComponentType<any>>(Bug);
  useEffect(() => {
    const icons = [Bug, Rocket, Heart];
    setHeroIcon(icons[Math.floor(Math.random() * icons.length)]);
  }, []);

  return (
    <main>
      <div className="max-w-6xl mx-auto px-6">
        {/* 中文注释：顶部右侧：主题切换 + 语言切换；统一使用 gap 控制间距，移除固定宽度占位 */}
        <header className="flex items-center justify-end gap-3 md:gap-4 py-4 pr-2 md:pr-3">
          <ThemeToggle />
          <LanguageSwitcher />
        </header>
        {/* 中文注释：页面顶部 Hero 区域，简洁但更美观 */}
        <section className="pt-8 pb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">{t('hero.title')}</h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">{t('hero.desc')}</p>
          {/* 中文注释：根据需求移除“开始使用/Get Started”按钮 */}
        </section>

        {/* 中文注释：主体工具卡片容器 */}
        <section ref={toolRef} className="pb-16">
          <div className="rounded-xl bg-white/80 dark:bg-gray-900/40 backdrop-blur border border-indigo-100 dark:border-gray-700 shadow-sm">
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
