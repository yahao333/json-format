'use client';

import React, { useState, useCallback } from 'react';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      const result = input; // 暂时直接返回输入
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
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">JSON 格式化工具</h2>
        <div className="flex gap-2">
          <button
            onClick={formatJson}
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? '格式化中...' : '格式化'}
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            清空
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <textarea
            placeholder="请输入 JSON 字符串..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 p-3 border rounded font-mono text-sm"
            disabled={isLoading}
          />

          <div className="mt-4">
            <button
              onClick={formatJson}
              disabled={isLoading || !input.trim()}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              格式化
            </button>
          </div>
        </div>

        <div>
          <div className="p-4 bg-gray-50 rounded border min-h-[300px]">
            {error ? (
              <div className="text-red-500">{error}</div>
            ) : output ? (
              <pre className="font-mono text-sm">{output}</pre>
            ) : (
              <div className="text-gray-500 text-center py-12">
                格式化结果将显示在这里
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
