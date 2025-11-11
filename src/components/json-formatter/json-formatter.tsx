'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { Wand2, Trash2, Clipboard, FileJson, Braces, Sparkles } from 'lucide-react';
import { useI18n } from '../../lib/i18n';

export default function JsonFormatter() {
  // 中文注释：引入翻译函数
  const { t } = useI18n();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState<boolean>(false);

  const formatJson = useCallback(async () => {
    if (!input.trim()) {
      setError(t('error.inputRequired'));
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
      setError(err instanceof Error ? err.message : t('error.formatFailed'));
      setOutput('');
    } finally {
      setIsLoading(false);
    }
  }, [input, t]);

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
      console.error(t('error.copyFailed') + ':', err);
    }
  }, [output, t]);

  // 中文注释：避免 SSR hydration 问题——初始使用固定图标，挂载后再随机替换
  const [IconFormat, setIconFormat] = useState<React.ComponentType<any>>(Wand2);
  const [IconClear, setIconClear] = useState<React.ComponentType<any>>(Trash2);
  const [IconCopy, setIconCopy] = useState<React.ComponentType<any>>(Clipboard);
  const [IconInput, setIconInput] = useState<React.ComponentType<any>>(Braces);
  const [IconOutput, setIconOutput] = useState<React.ComponentType<any>>(FileJson);

  useEffect(() => {
    const pick = (icons: Array<React.ComponentType<any>>) =>
      icons[Math.floor(Math.random() * icons.length)];
    setIconFormat(pick([Wand2, Sparkles]));
    setIconClear(pick([Trash2, Sparkles]));
    setIconCopy(pick([Clipboard, Sparkles]));
    setIconInput(pick([Braces, FileJson]));
    setIconOutput(pick([FileJson, Braces]));
  }, []);

  return (
    <div className="space-y-6">
      {/* 中文注释：标题与操作区 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{t('formatter.title')}</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={formatJson}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60"
          >
            {IconFormat && <IconFormat className="w-4 h-4" />} {isLoading ? t('formatter.formatting') : t('formatter.format')}
          </Button>
          <Button onClick={clearAll} className="bg-gray-600 hover:bg-gray-700">
            {IconClear && <IconClear className="w-4 h-4" />} {t('formatter.clear')}
          </Button>
          <Button
            onClick={copyToClipboard}
            disabled={!output}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60"
          >
            {IconCopy && <IconCopy className="w-4 h-4" />} {copied ? t('formatter.copied') : t('formatter.copy')}
          </Button>
        </div>
      </div>

      {/* 中文注释：两栏布局，左侧输入右侧结果 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-lg border bg-white/70 backdrop-blur p-4">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            {IconInput && <IconInput className="w-4 h-4" />} {t('formatter.inputLabel')}
          </label>
          <textarea
            placeholder={t('error.inputRequired')}
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
              {IconFormat && <IconFormat className="w-4 h-4" />} {t('formatter.format')}
            </Button>
          </div>
        </div>

        <div className="rounded-lg border bg-white/70 backdrop-blur p-4 min-h-[300px]">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            {IconOutput && <IconOutput className="w-4 h-4" />} {t('formatter.outputLabel')}
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
            <div className="text-gray-500 text-center py-12">{t('formatter.placeholder')}</div>
          )}
        </div>
      </div>
    </div>
  );
}
