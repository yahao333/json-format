import { describe, it, expect, vi } from 'vitest';
import { cn, formatDate, debounce } from '@/lib/utils';

describe('cn function', () => {
  it('joins class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('filters out falsy values', () => {
    expect(cn('class1', false, 'class2', null, undefined, 'class3')).toBe(
      'class1 class2 class3'
    );
  });

  it('handles empty inputs', () => {
    expect(cn()).toBe('');
    expect(cn('', false, null, undefined)).toBe('');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const isDisabled = false;

    expect(cn('base', isActive && 'active', isDisabled && 'disabled')).toBe(
      'base active'
    );
  });
});

describe('formatDate function', () => {
  it('formats date correctly', () => {
    const date = new Date('2024-01-15T10:30:45');
    const formatted = formatDate(date);

    // Should contain the date components
    expect(formatted).toContain('2024');
    expect(formatted).toContain('01');
    expect(formatted).toContain('15');
    expect(formatted).toContain('10');
    expect(formatted).toContain('30');
    expect(formatted).toContain('45');
  });

  it('handles different dates', () => {
    const date = new Date('2023-12-31T23:59:59');
    const formatted = formatDate(date);

    expect(formatted).toContain('2023');
    expect(formatted).toContain('12');
    expect(formatted).toContain('31');
    expect(formatted).toContain('23');
    expect(formatted).toContain('59');
  });
});

describe('debounce function', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('delays function execution', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn();

    // Function should not be called immediately
    expect(mockFn).not.toHaveBeenCalled();

    // Fast forward time
    vi.advanceTimersByTime(1000);

    // Function should be called after delay
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('resets timer on subsequent calls', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn();
    vi.advanceTimersByTime(500);

    debouncedFn(); // Reset timer
    vi.advanceTimersByTime(500);

    // Function should not be called yet
    expect(mockFn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);

    // Function should be called once
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('passes arguments correctly', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn('arg1', 'arg2');
    vi.advanceTimersByTime(1000);

    expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
  });
});
