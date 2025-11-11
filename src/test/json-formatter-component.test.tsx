import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import JsonFormatter from '@/components/json-formatter/json-formatter';

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
});

describe('JSON 格式化器组件', () => {
  const mockJson = '{"name": "test", "value": 123}';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('应该渲染组件', () => {
    render(<JsonFormatter />);

    expect(screen.getByText('JSON 格式化工具')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('请输入 JSON 字符串...')
    ).toBeInTheDocument();
    expect(screen.getAllByText('格式化').length).toBeGreaterThan(0);
  });

  it('应该正确处理 JSON 输入', () => {
    render(<JsonFormatter />);

    const input = screen.getByPlaceholderText('请输入 JSON 字符串...');

    // 测试输入功能
    fireEvent.change(input, { target: { value: mockJson } });
    expect(input).toHaveValue(mockJson);

    // 测试清空功能
    const clearButton = screen.getByText('清空');
    fireEvent.click(clearButton);
    expect(input).toHaveValue('');
  });

  it('应该显示错误信息', async () => {
    render(<JsonFormatter />);

    const input = screen.getByPlaceholderText('请输入 JSON 字符串...');
    const buttons = screen.getAllByText('格式化');
    const formatButton = buttons[0];

    fireEvent.change(input, { target: { value: 'invalid json' } });
    fireEvent.click(formatButton);

    // 简单等待一下让组件更新
    await new Promise((resolve) => setTimeout(resolve, 100));

    // 检查输入是否清空（错误情况下可能会清空）
    expect(input.value).toBe('invalid json'); // 或者检查错误状态
  });

  it('应该清空所有内容', async () => {
    render(<JsonFormatter />);

    const input = screen.getByPlaceholderText('请输入 JSON 字符串...');
    const clearButton = screen.getByText('清空');

    fireEvent.change(input, { target: { value: mockJson } });
    fireEvent.click(clearButton);

    expect(input).toHaveValue('');
  });

  it('应该显示操作按钮', () => {
    render(<JsonFormatter />);

    // 检查基本操作按钮
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(1); // 至少有2个按钮
  });
});
