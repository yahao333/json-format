import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import JsonFormatter from '@/components/json-formatter/json-formatter';

describe('JSON 格式化器组件 - 简化测试', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('应该渲染组件', () => {
    render(<JsonFormatter />);

    expect(screen.getByText('JSON 格式化工具')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('请输入 JSON 字符串...')).toBeInTheDocument();
  });

  it('应该显示基本按钮', () => {
    render(<JsonFormatter />);

    // 使用 queryAll 来避免多个匹配问题
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });

  it('应该显示文本区域', () => {
    render(<JsonFormatter />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
  });

  it('应该显示卡片容器', () => {
    render(<JsonFormatter />);

    const cards = screen.getAllByRole('generic');
    expect(cards.length).toBeGreaterThanOrEqual(2);
  });
});
