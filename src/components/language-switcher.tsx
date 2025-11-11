'use client';

import React from 'react';
import { useI18n } from '../lib/i18n';
import { Button } from './ui/button';

// 中文注释：语言切换组件（中 / 英 / 日）
export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-2 md:gap-3">
      {/* 中文注释：统一按钮尺寸与居中样式 */}
      {/** 中文注释：为了保证效果稳定，这里使用统一的类串 */}
      {/** @note Tailwind 工具类按顺序合并，末尾的宽高将生效 */}
      {/* 中文注释：中文 */}
      <Button
        size="sm"
        variant={locale === 'zh' ? 'default' : 'outline'}
        className={(locale === 'zh' ? 'bg-blue-600 text-white hover:bg-blue-700 ' : '') + 'w-12 h-8 px-0 justify-center text-xs'}
        onClick={() => setLocale('zh')}
      >
        中
      </Button>

      {/* 中文注释：英文 */}
      <Button
        size="sm"
        variant={locale === 'en' ? 'default' : 'outline'}
        className={(locale === 'en' ? 'bg-blue-600 text-white hover:bg-blue-700 ' : '') + 'w-12 h-8 px-0 justify-center text-xs'}
        onClick={() => setLocale('en')}
      >
        EN
      </Button>

      {/* 中文注释：日文 */}
      <Button
        size="sm"
        variant={locale === 'ja' ? 'default' : 'outline'}
        className={(locale === 'ja' ? 'bg-blue-600 text-white hover:bg-blue-700 ' : '') + 'w-12 h-8 px-0 justify-center text-xs'}
        onClick={() => setLocale('ja')}
      >
        日
      </Button>
    </div>
  );
}