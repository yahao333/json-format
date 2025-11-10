'use client';

import React, { useState, useCallback } from 'react';
import { formatJson, minifyJson, validateJson, beautifyJson } from '@/lib/json-formatter';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Copy, Check, Minimize2, Maximize2 } from 'lucide-react';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

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
      await new Promise(resolve => setTimeout(resolve, 100));
      const result = beautifyJson(input);
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '格式化失败');
      setOutput('');
    } finally {
      setIsLoading(false);
    }
  }, [input]);

  const minifyJson = useCallback(async () => {
    if (!input.trim()) {
      setError('请输入 JSON 字符串');
      setOutput('');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      const result = minifyJson(input);
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '压缩失败');
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
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  }, [output]);

  const validateInput = useCallback(() => {
    if (!input.trim()) {
      setError('请输入 JSON 字符串');
      return;
    }

    const result = validateJson(input);
    if (result.isValid) {
      setError(null);
      setOutput('JSON 格式正确！');
    } else {
      setError(result.error || 'JSON 格式错误');
      setOutput('');
    }
  }, [input]);

  const loadExample = useCallback(() => {
    const example = `{
  "name": "JSON 格式化工具",
  "version": "1.0.0",
  "description": "一个现代化的 JSON 格式化工具",
  "features": ["格式化", "压缩", "验证"],
  "author": {
    "name": "开发者",
    "email": "developer@example.com"
  },
  "isActive": true,
  "count": 42
}`;
    setInput(example);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">JSON 格式化工具</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={loadExample}>
            加载示例
          </Button>
          <Button variant="outline" size="sm" onClick={clearAll}>
            清空
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* 输入区域 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              输入 JSON
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="请输入 JSON 字符串..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
              disabled={isLoading}
            />

            <div className="flex flex-wrap gap-2">
              <Button
                onClick={formatJson}
                disabled={isLoading || !input.trim()}
                className="flex-1"
              >
                {isLoading ? '格式化中...' : '格式化'}
              </Button>
              <Button
                variant="outline"
                onClick={minifyJson}
                disabled={isLoading || !input.trim()}
                className="flex-1"
              >
                <Minimize2 className="w-4 h-4 mr-2" />
                压缩
              </Button>
              <Button
                variant="secondary"
                onClick={validateInput}
                disabled={isLoading || !input.trim()}
                className="flex-1"
              >
                验证
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 输出区域 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              格式化结果
              {output && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="ml-auto"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      已复制
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      复制
                    </>
                  )}
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error ? (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : output ? (
              <div className="relative">
                <pre className="bg-gray-50 rounded-md p-4 min-h-[300px] max-h-[400px] overflow-auto font-mono text-sm border">
                  {output}
                </pre>
              </div>
            ) : (
              <div className="flex items-center justify-center min-h-[300px] text-gray-500">
                <p>格式化结果将显示在这里</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 使用说明 */}
      <Card>
        <CardHeader>
          <CardTitle>使用说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">📝 格式化</h4>
              <p className="text-gray-600">将压缩的 JSON 转换为美观的格式化版本</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🔍 验证</h4>
              <p className="text-gray-600">检查 JSON 语法是否正确</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📦 压缩</h4>
              <p className="text-gray-600">移除所有空格，减小 JSON 体积</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📋 复制</h4>
              <p className="text-gray-600">一键复制格式化结果到剪贴板</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
