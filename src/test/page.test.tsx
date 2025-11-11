import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from '@/app/page';

describe('Home Page - JSON Formatter', () => {
  it('renders the main title correctly', () => {
    render(<Home />);

    const title = screen.getByRole('heading', { level: 1, name: 'JSON 格式化工具' });
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-4xl', 'font-bold');
  });

  it('renders the description text', () => {
    render(<Home />);

    const description = screen.getByText('一个现代化的 JSON 格式化工具，让数据处理更简单');
    expect(description).toBeInTheDocument();
  });

  it('renders the JSON formatter component', () => {
    render(<Home />);

    // Check if JSON formatter elements are present
    expect(screen.getByPlaceholderText('请输入 JSON 字符串...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '开始使用' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '清空' })).toBeInTheDocument();
  });

  it('has the correct page structure', () => {
    render(<Home />);

    // Check if the main elements are present
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(<Home />);

    const buttons = ['开始使用', '清空'];
    buttons.forEach(buttonText => {
      expect(screen.getByRole('button', { name: buttonText })).toBeInTheDocument();
    });
  });
});
