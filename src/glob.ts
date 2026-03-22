import type { GlobOptions } from './types';

export function globToRegex(pattern: string, options: GlobOptions = {}): RegExp {
  const { caseSensitive = true } = options;
  let i = 0;
  let result = '';

  while (i < pattern.length) {
    const char = pattern[i];

    if (char === '*') {
      if (pattern[i + 1] === '*') {
        // ** matches anything including path separators
        result += '.*';
        i += 2;
        // Skip trailing slash after **
        if (pattern[i] === '/') {
          i++;
        }
      } else {
        // * matches anything except /
        result += '[^/]*';
        i++;
      }
    } else if (char === '?') {
      result += '.';
      i++;
    } else if (char === '{') {
      // Find matching closing brace
      const closingIndex = pattern.indexOf('}', i);
      if (closingIndex === -1) {
        result += '\\{';
        i++;
      } else {
        const content = pattern.slice(i + 1, closingIndex);
        const alternatives = content.split(',').map((alt) => escapeRegexChar(alt));
        result += `(${alternatives.join('|')})`;
        i = closingIndex + 1;
      }
    } else if (char === '[') {
      // Character class — find closing bracket and pass through
      const closingIndex = pattern.indexOf(']', i);
      if (closingIndex === -1) {
        result += '\\[';
        i++;
      } else {
        result += pattern.slice(i, closingIndex + 1);
        i = closingIndex + 1;
      }
    } else {
      // Escape regex special characters
      result += escapeRegexChar(char);
      i++;
    }
  }

  const flags = caseSensitive ? '' : 'i';
  return new RegExp(`^${result}$`, flags);
}

function escapeRegexChar(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function globMatch(
  pattern: string,
  str: string,
  options: GlobOptions = {},
): boolean {
  const regex = globToRegex(pattern, options);
  return regex.test(str);
}

export function globFilter(
  pattern: string,
  strings: string[],
  options: GlobOptions = {},
): string[] {
  const regex = globToRegex(pattern, options);
  return strings.filter((str) => regex.test(str));
}
