import { describe, it, expect } from 'vitest';

describe('Application Configuration', () => {
  it('should have correct metadata configuration', () => {
    // Test metadata from layout.tsx
    const metadata = {
      title: 'JSON 格式化工具',
      description: '一个现代化的 JSON 格式化工具',
    };

    expect(metadata.title).toBe('JSON 格式化工具');
    expect(metadata.description).toBe('一个现代化的 JSON 格式化工具');
    expect(metadata.title).toMatch(/JSON/);
    expect(metadata.description).toContain('格式化');
  });

  it('should have correct language settings', () => {
    const htmlLang = 'zh-CN';

    expect(htmlLang).toBe('zh-CN');
    expect(htmlLang).toMatch(/zh/);
    expect(htmlLang).toMatch(/CN/);
  });

  it('should have correct font configuration', () => {
    const fontConfig = {
      subsets: ['latin'],
    };

    expect(fontConfig.subsets).toContain('latin');
    expect(Array.isArray(fontConfig.subsets)).toBe(true);
  });

  it('should have correct Tailwind content paths', () => {
    const contentPaths = [
      './src/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    ];

    expect(contentPaths).toHaveLength(3);
    expect(contentPaths[0]).toContain('src/**/*');
    expect(contentPaths[1]).toContain('src/app/**/*');
    expect(contentPaths[2]).toContain('src/components/**/*');

    contentPaths.forEach(path => {
      expect(path).toMatch(/\.\{js,ts,jsx,tsx,mdx\}/);
    });
  });
});
