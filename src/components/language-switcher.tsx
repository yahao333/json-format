'use client';

import React from 'react';
import { useI18n } from '../lib/i18n';
import { Button } from './ui/button';
import ReactCountryFlag from 'react-country-flag';

// 中文注释：语言切换组件（中 / 英 / 日），使用旗帜图标
export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-2 md:gap-3">
      {/* 中文注释：统一按钮尺寸与居中样式 */}
      {/** 中文注释：为了保证效果稳定，这里使用统一的类串 */}
      {/** @note Tailwind 工具类按顺序合并，末尾的宽高将生效 */}
      {/* 中文注释：中文（中国旗帜） */}
      <Button
        size="sm"
        variant={locale === 'zh' ? 'default' : 'outline'}
        className="w-8 h-8 p-0 justify-center hover:scale-110 transition-transform"
        onClick={() => setLocale('zh')}
        aria-label="切换到中文"
      >
        <ReactCountryFlag countryCode="CN" svg style={{ width: '1.2em', height: '1.2em' }} />
      </Button>

      {/* 中文注释：英文（美国旗帜） */}
      <Button
        size="sm"
        variant={locale === 'en' ? 'default' : 'outline'}
        className="w-8 h-8 p-0 justify-center hover:scale-110 transition-transform"
        onClick={() => setLocale('en')}
        aria-label="Switch to English"
      >
        <ReactCountryFlag countryCode="US" svg style={{ width: '1.2em', height: '1.2em' }} />
      </Button>

      {/* 中文注释：日文（日本旗帜） */}
      <Button
        size="sm"
        variant={locale === 'ja' ? 'default' : 'outline'}
        className="w-8 h-8 p-0 justify-center hover:scale-110 transition-transform"
        onClick={() => setLocale('ja')}
        aria-label="日本語に切り替え"
      >
        <ReactCountryFlag countryCode="JP" svg style={{ width: '1.2em', height: '1.2em' }} />
      </Button>
    </div>
  );
}