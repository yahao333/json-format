import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from '@/app/page';

describe('Home Page', () => {
  it('renders the main title correctly', () => {
    render(<Home />);

    const title = screen.getByText('JSON 格式化工具');
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-4xl', 'font-bold');
  });

  it('renders the description text', () => {
    render(<Home />);

    const description = screen.getByText('一个现代化的 JSON 格式化工具，让数据处理更简单');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-gray-600');
  });

  it('renders the main container with correct styling', () => {
    render(<Home />);

    const mainContainer = screen.getByText('JSON 格式化工具').closest('main');
    expect(mainContainer).toHaveClass('min-h-screen', 'p-8');
  });

  it('renders the content container with correct styling', () => {
    render(<Home />);

    const contentContainer = screen.getByText('JSON 格式化工具').closest('.max-w-4xl');
    expect(contentContainer).toHaveClass('mx-auto');
  });

  it('renders the placeholder content', () => {
    render(<Home />);

    const placeholder = screen.getByText('JSON 格式化功能正在开发中...');
    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toHaveClass('text-gray-500');
  });

  it('has the correct page structure', () => {
    render(<Home />);

    // Check if the main elements are present
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText('JSON 格式化工具')).toBeInTheDocument();

    // Check if the card container exists
    const card = screen.getByText('JSON 格式化功能正在开发中...').closest('.bg-white');
    expect(card).toHaveClass('rounded-lg', 'shadow-lg', 'p-6');
  });
});
