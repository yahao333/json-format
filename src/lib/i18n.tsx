'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

// 中文注释：支持的语言枚举
export type Locale = 'zh' | 'en' | 'ja';

// 中文注释：词典定义（中 / 英 / 日）
const dictionaries: Record<Locale, Record<string, string>> = {
  zh: {
    'nav.contribute': '贡献',
    'nav.try': '试用',
    'hero.title': 'JSON 格式化工具',
    'hero.desc': '一个现代化的 JSON 格式化工具，让数据处理更简单',
    'hero.start': '开始使用',
    'formatter.title': 'JSON 格式化工具',
    'formatter.inputLabel': '输入 JSON',
    'formatter.outputLabel': '输出结果',
    'formatter.format': '格式化',
    'formatter.formatting': '格式化中...',
    'formatter.clear': '清空',
    'formatter.copy': '复制结果',
    'formatter.copied': '已复制',
    'formatter.placeholder': '格式化结果将显示在这里',
    'formatter.placeholder.input': '在此处粘贴您的 JSON',
    'error.inputRequired': '请输入 JSON 字符串',
    'error.formatFailed': '格式化失败',
    'error.copyFailed': '复制失败',
  },
  en: {
    'nav.contribute': 'Contribute',
    'nav.try': 'Try',
    'hero.title': 'JSON Formatter',
    'hero.desc': 'A modern JSON formatter that makes data easier',
    'hero.start': 'Get Started',
    'formatter.title': 'JSON Formatter',
    'formatter.inputLabel': 'Input JSON',
    'formatter.outputLabel': 'Formatted Result',
    'formatter.format': 'Format',
    'formatter.formatting': 'Formatting...',
    'formatter.clear': 'Clear',
    'formatter.copy': 'Copy Result',
    'formatter.copied': 'Copied',
    'formatter.placeholder': 'Formatted result will appear here',
    'formatter.placeholder.input': 'Paste your JSON here',
    'error.inputRequired': 'Please enter a JSON string',
    'error.formatFailed': 'Formatting failed',
    'error.copyFailed': 'Copy failed',
  },
  ja: {
    'nav.contribute': '貢献',
    'nav.try': 'お試し',
    'hero.title': 'JSONフォーマッタ',
    'hero.desc': 'データ処理をより簡単にする最新のJSONフォーマッタ',
    'hero.start': 'はじめる',
    'formatter.title': 'JSONフォーマッタ',
    'formatter.inputLabel': 'JSON入力',
    'formatter.outputLabel': '出力結果',
    'formatter.format': '整形',
    'formatter.formatting': '整形中...',
    'formatter.clear': 'クリア',
    'formatter.copy': '結果をコピー',
    'formatter.copied': 'コピーしました',
    'formatter.placeholder': '整形結果はここに表示されます',
    'formatter.placeholder.input': 'ここにJSONを貼り付けてください',
    'error.inputRequired': 'JSON文字列を入力してください',
    'error.formatFailed': '整形に失敗しました',
    'error.copyFailed': 'コピーに失敗しました',
  },
};

// 中文注释：上下文类型定义
interface I18nContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

// 中文注释：Provider 组件，提供当前语言与翻译函数
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  // 中文注释：首次挂载时读取本地缓存语言
  useEffect(() => {
    try {
      const saved = localStorage.getItem('locale');
      if (saved === 'en' || saved === 'ja' || saved === 'zh') {
        setLocale(saved);
      }
    } catch {}
  }, []);

  // 中文注释：语言改变时写入本地缓存
  useEffect(() => {
    try {
      localStorage.setItem('locale', locale);
    } catch {}
  }, [locale]);

  const t = useMemo(() => {
    return (key: string) => {
      const dict = dictionaries[locale] || dictionaries.zh;
      return dict[key] ?? dictionaries.zh[key] ?? key;
    };
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => ({ locale, setLocale, t }), [locale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

// 中文注释：便捷钩子，用于组件内访问语言与翻译函数
export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n 必须在 LanguageProvider 中使用');
  return ctx;
}