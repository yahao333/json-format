/**
 * JSON 格式化工具函数
 */

/**
 * 格式化 JSON 字符串
 * @param jsonString - 要格式化的 JSON 字符串
 * @param indent - 缩进空格数，默认为 2
 * @returns 格式化后的 JSON 字符串
 */
export function formatJson(jsonString: string, indent: number = 2): string {
  try {
    // 移除多余的空格和换行
    const trimmed = jsonString.trim();

    // 解析 JSON
    const parsed = JSON.parse(trimmed);

    // 格式化并返回
    return JSON.stringify(parsed, null, indent);
  } catch (error) {
    throw new Error(
      `JSON 格式错误: ${error instanceof Error ? error.message : '未知错误'}`
    );
  }
}

/**
 * 压缩 JSON 字符串（移除所有空格）
 * @param jsonString - 要压缩的 JSON 字符串
 * @returns 压缩后的 JSON 字符串
 */
export function minifyJson(jsonString: string): string {
  try {
    const trimmed = jsonString.trim();
    const parsed = JSON.parse(trimmed);
    return JSON.stringify(parsed);
  } catch (error) {
    throw new Error(
      `JSON 格式错误: ${error instanceof Error ? error.message : '未知错误'}`
    );
  }
}

/**
 * 验证 JSON 字符串是否有效
 * @param jsonString - 要验证的 JSON 字符串
 * @returns 验证结果
 */
export function validateJson(jsonString: string): {
  isValid: boolean;
  error?: string;
  parsed?: any;
} {
  try {
    const trimmed = jsonString.trim();
    if (!trimmed) {
      return { isValid: false, error: 'JSON 字符串不能为空' };
    }

    const parsed = JSON.parse(trimmed);
    return { isValid: true, parsed };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : '未知错误',
    };
  }
}

/**
 * 美化 JSON 字符串（自动检测并格式化）
 * @param jsonString - 要美化的 JSON 字符串
 * @returns 美化后的 JSON 字符串
 */
export function beautifyJson(jsonString: string): string {
  try {
    const result = validateJson(jsonString);
    if (!result.isValid) {
      throw new Error(result.error);
    }

    return formatJson(jsonString, 2);
  } catch (error) {
    throw new Error(
      `JSON 美化失败: ${error instanceof Error ? error.message : '未知错误'}`
    );
  }
}

/**
 * 获取 JSON 的语法高亮 HTML
 * @param jsonString - JSON 字符串
 * @returns 带语法高亮的 HTML 字符串
 */
export function getJsonHighlightHtml(jsonString: string): string {
  try {
    const formatted = formatJson(jsonString, 2);

    return formatted
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function (match) {
          let cls = 'json-number';
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = 'json-key';
            } else {
              cls = 'json-string';
            }
          } else if (/true|false/.test(match)) {
            cls = 'json-boolean';
          } else if (/null/.test(match)) {
            cls = 'json-null';
          }
          return '<span class="' + cls + '">' + match + '</span>';
        }
      );
  } catch (error) {
    return `<span class="json-error">${jsonString}</span>`;
  }
}
