import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '../lib/i18n';
import { ThemeProvider } from '../components/theme-provider';
import { Header } from '../components/header';

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
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        {/* 中文注释：注入语言 Provider，使全站具备中/英/日三语支持 */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <Header />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
