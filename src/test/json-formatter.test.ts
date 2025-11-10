import { describe, it, expect, vi } from 'vitest';
import { formatJson, minifyJson, validateJson, beautifyJson, getJsonHighlightHtml } from '@/lib/json-formatter';

describe('JSON 格式化工具函数', () => {
  const validJson = '{"name": "test", "value": 123, "active": true, "nullValue": null}';
  const formattedJson = `{
  "name": "test",
  "value": 123,
  "active": true,
  "nullValue": null
}`;
  const minifiedJson = '{"name":"test","value":123,"active":true,"nullValue":null}';

  describe('formatJson', () => {
    it('应该正确格式化 JSON 字符串', () => {
      const result = formatJson(validJson);
      expect(result).toBe(formattedJson);
    });

    it('应该支持自定义缩进', () => {
      const result = formatJson(validJson, 4);
      expect(result).toContain('    ');
    });

    it('应该处理空字符串', () => {
      expect(() => formatJson('')).toThrow('JSON 格式错误');
    });

    it('应该处理无效 JSON', () => {
      expect(() => formatJson('invalid json')).toThrow('JSON 格式错误');
    });
  });

  describe('minifyJson', () => {
    it('应该正确压缩 JSON 字符串', () => {
      const result = minifyJson(formattedJson);
      expect(result).toBe(minifiedJson);
    });

    it('应该处理无效 JSON', () => {
      expect(() => minifyJson('invalid json')).toThrow('JSON 格式错误');
    });
  });

  describe('validateJson', () => {
    it('应该验证有效的 JSON', () => {
      const result = validateJson(validJson);
      expect(result.isValid).toBe(true);
      expect(result.parsed).toEqual(JSON.parse(validJson));
    });

    it('应该识别无效的 JSON', () => {
      const result = validateJson('invalid json');
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('应该处理空字符串', () => {
      const result = validateJson('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('JSON 字符串不能为空');
    });

    it('应该处理空白字符串', () => {
      const result = validateJson('   ');
      expect(result.isValid).toBe(false);
    });
  });

  describe('beautifyJson', () => {
    it('应该美化 JSON 字符串', () => {
      const result = beautifyJson(validJson);
      expect(result).toBe(formattedJson);
    });

    it('应该处理无效 JSON', () => {
      expect(() => beautifyJson('invalid json')).toThrow('JSON 美化失败');
    });
  });

  describe('getJsonHighlightHtml', () => {
    it('应该生成语法高亮 HTML', () => {
      const result = getJsonHighlightHtml(validJson);
      expect(result).toContain('<span class=');
      expect(result).toContain('json-string');
      expect(result).toContain('json-number');
      expect(result).toContain('json-boolean');
      expect(result).toContain('json-null');
    });

    it('应该处理无效 JSON', () => {
      const result = getJsonHighlightHtml('invalid json');
      expect(result).toContain('json-error');
    });

    it('应该转义 HTML 字符', () => {
      const jsonWithHtml = '{"tag": "<script>"}';
      const result = getJsonHighlightHtml(jsonWithHtml);
      expect(result).toContain('&lt;');
      expect(result).toContain('&gt;');
    });
  });
});

describe('JSON 格式化器组件集成测试', () => {
  it('应该处理完整的格式化流程', () => {
    // 测试格式化流程
    const input = '{"a":1,"b":2}';
    const formatted = formatJson(input);
    const validated = validateJson(formatted);

    expect(formatted).toContain('\n');
    expect(validated.isValid).toBe(true);
    expect(validated.parsed.a).toBe(1);
  });

  it('应该处理错误情况', () => {
    const invalidInputs = [
      '',
      'invalid',
      '{missing: quotes}',
      '{"unclosed":',
      'null',
      'undefined' // 注意：undefined 不是有效的 JSON
    ];

    invalidInputs.forEach(input => {
      const validation = validateJson(input);
      if (input === 'null') {
        // null 是有效的 JSON 值
        expect(validation.isValid).toBe(true);
      } else {
        expect(validation.isValid).toBe(false);
        expect(validation.error).toBeDefined();
        expect(() => formatJson(input)).toThrow();
        expect(() => beautifyJson(input)).toThrow();
      }
    });
  });

  it('应该处理复杂 JSON 结构', () => {
    const complexJson = `{
      "users": [
        {
          "id": 1,
          "name": "John Doe",
          "email": "john@example.com",
          "metadata": {
            "created": "2024-01-01",
            "tags": ["admin", "user"],
            "settings": {
              "notifications": true,
              "theme": "dark"
            }
          }
        }
      ],
      "pagination": {
        "total": 100,
        "page": 1,
        "limit": 10
      }
    }`;

    const formatted = formatJson(complexJson);
    const validated = validateJson(formatted);
    const minified = minifyJson(formatted);

    expect(validated.isValid).toBe(true);
    expect(formatted).toContain('\n');
    // 检查 minified 确实比 formatted 短，且没有换行符
    expect(minified.length).toBeLessThan(formatted.length);
    expect(minified).not.toContain('\n');
  });
});
