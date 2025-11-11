'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState<boolean>(false);

  const formatJson = useCallback(async () => {
    if (!input.trim()) {
      setError('请输入 JSON 字符串');
      setOutput('');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 使用防抖处理
      await new Promise((resolve) => setTimeout(resolve, 100));
      const result = JSON.stringify(JSON.parse(input), null, 2);
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '格式化失败');
      setOutput('');
    } finally {
      setIsLoading(false);
    }
  }, [input]);

  const clearAll = useCallback(() => {
    setInput('');
    setOutput('');
    setError(null);
    setCopied(false);
  }, []);

  const copyToClipboard = useCallback(async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      // 中文注释：复制成功提示状态
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  }, [output]);

  return (
    <div className="space-y-6">
      {/* 中文注释：标题与操作区 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">JSON 格式化工具</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={formatJson}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60"
          >
            {isLoading ? '格式化中...' : '格式化'}
          </Button>
          <Button onClick={clearAll} className="bg-gray-600 hover:bg-gray-700">
            清空
          </Button>
          <Button
            onClick={copyToClipboard}
            disabled={!output}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60"
          >
            {copied ? '已复制' : '复制结果'}
          </Button>
        </div>
      </div>

      {/* 中文注释：两栏布局，左侧输入右侧结果 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-lg border bg-white/70 backdrop-blur p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            输入 JSON
          </label>
          <textarea
            placeholder="请输入 JSON 字符串..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-52 resize-y p-3 rounded-md border font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={isLoading}
          />
          <div className="mt-3">
            <Button
              onClick={formatJson}
              disabled={isLoading || !input.trim()}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-60"
            >
              格式化
            </Button>
          </div>
        </div>

        <div className="rounded-lg border bg-white/70 backdrop-blur p-4 min-h-[300px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            输出结果
          </label>
          {error ? (
            // 中文注释：错误提示使用 Alert 组件，视觉更友好
            <Alert className="bg-red-50 border-red-200">
              <AlertDescription className="text-red-600">
                {error}
              </AlertDescription>
            </Alert>
          ) : output ? (
            <pre className="font-mono text-sm whitespace-pre-wrap break-words">
              {output}
            </pre>
          ) : (
            <div className="text-gray-500 text-center py-12">
              格式化结果将显示在这里
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
