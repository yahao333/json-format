'use client';

import React from 'react';
import { useI18n } from '../lib/i18n';
import { Button } from './ui/button';

// 中文注释：语言切换组件（中 / EN / 日），使用文字标签而非图标
export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-2 md:gap-3">
      {/* 中文注释：统一按钮尺寸与居中样式 */}
      {/** 中文注释：为了保证效果稳定，这里使用统一的类串 */}
      {/** @note Tailwind 工具类按顺序合并，末尾的宽高将生效 */}
      {/* 中文注释：中文（文字标签“中”） */}
      <Button
        size="sm"
        variant={locale === 'zh' ? 'default' : 'outline'}
        className="w-8 h-8 p-0 justify-center hover:scale-110 transition-transform"
        onClick={() => setLocale('zh')}
        aria-label="切换到中文"
      >
        {/* 中文注释：使用紧凑字号，保证与 EN/日 尺寸一致 */}
        <span className="text-[12px] leading-none font-semibold">中</span>
      </Button>

      {/* 中文注释：英文（文字标签“EN”） */}
      <Button
        size="sm"
        variant={locale === 'en' ? 'default' : 'outline'}
        className="w-8 h-8 p-0 justify-center hover:scale-110 transition-transform"
        onClick={() => setLocale('en')}
        aria-label="切换到英文"
      >
        <span className="text-[12px] leading-none font-semibold tracking-tight">EN</span>
      </Button>

      {/* 中文注释：日文（文字标签“日”） */}
      <Button
        size="sm"
        variant={locale === 'ja' ? 'default' : 'outline'}
        className="w-8 h-8 p-0 justify-center hover:scale-110 transition-transform"
        onClick={() => setLocale('ja')}
        aria-label="切换到日文"
      >
        <span className="text-[12px] leading-none font-semibold">日</span>
      </Button>
    </div>
  );
}