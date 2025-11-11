'use client';

import React from 'react';
import { useI18n } from '../lib/i18n';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

// 中文注释：语言切换组件（中 / EN / 日），使用文字标签而非图标
export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center">
      {/* 中文注释：中文（文字标签“中”） */}
      <Button
        variant="ghost"
        size="icon"
        className={cn('rounded-r-none', locale === 'zh' && 'bg-accent')}
        onClick={() => setLocale('zh')}
        style={{ boxSizing: 'border-box', width: '36px', height: '36px' }}
        aria-label="切换到中文"
        title="切换到中文"
      >
        {/* 中文注释：使用紧凑字号，保证与 EN/日 尺寸一致 */}
        <span className="text-[12px] leading-none font-semibold">中</span>
      </Button>

      {/* 中文注释：英文（文字标签“EN”） */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'rounded-none -ml-px',
          locale === 'en' && 'bg-accent'
        )}
        onClick={() => setLocale('en')}
        style={{ boxSizing: 'border-box', width: '36px', height: '36px' }}
        aria-label="Switch to English"
        title="切换到英文"
      >
        <span className="text-[12px] leading-none font-semibold tracking-tight">
          EN
        </span>
      </Button>

      {/* 中文注释：日文（文字标签“日”） */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'rounded-l-none -ml-px',
          locale === 'ja' && 'bg-accent'
        )}
        onClick={() => setLocale('ja')}
        style={{ boxSizing: 'border-box', width: '36px', height: '36px' }}
        aria-label="日本語に切り替える"
        title="切换到日文"
      >
        <span className="text-[12px] leading-none font-semibold">日</span>
      </Button>
    </div>
  );
}