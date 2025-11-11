import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '../lib/i18n';

export const metadata: Metadata = {
  title: 'JSON 格式化工具',
  description: '一个现代化的 JSON 格式化工具',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* 中文注释：注入语言 Provider，使全站具备中/英/日三语支持 */}
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
