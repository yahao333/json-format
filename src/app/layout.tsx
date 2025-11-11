import type { Metadata } from 'next';
import './globals.css';

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
        {children}
      </body>
    </html>
  );
}
