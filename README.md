# @philiprehberger/glob-match

[![CI](https://github.com/philiprehberger/ts-glob-match/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/ts-glob-match/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/glob-match)](https://www.npmjs.com/package/@philiprehberger/glob-match)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Glob pattern matching -- minimatch alternative for runtime use.

## Installation

```bash
npm install @philiprehberger/glob-match
```

## Usage

```ts
import { globMatch, globFilter, globToRegex } from '@philiprehberger/glob-match';

globMatch('*.ts', 'index.ts');
// => true

globMatch('src/**/*.ts', 'src/utils/helper.ts');
// => true

globMatch('*.{ts,js}', 'index.css');
// => false

globFilter('*.ts', ['index.ts', 'utils.ts', 'style.css']);
// => ['index.ts', 'utils.ts']

const regex = globToRegex('*.ts');
// => /^[^/]*\.ts$/
```

## API

### `globToRegex(pattern: string, options?: GlobOptions): RegExp`

Convert a glob pattern to a regular expression.

### `globMatch(pattern: string, str: string, options?: GlobOptions): boolean`

Test whether a string matches a glob pattern.

### `globFilter(pattern: string, strings: string[], options?: GlobOptions): string[]`

Filter an array of strings, returning only those that match the glob pattern.

### `GlobOptions`

| Option | Type | Default | Description |
|---|---|---|---|
| `caseSensitive` | `boolean` | `true` | Whether matching is case-sensitive |

### Supported Patterns

| Pattern | Description |
|---|---|
| `*` | Match any characters except `/` |
| `**` | Match any characters including `/` |
| `?` | Match a single character |
| `{a,b,c}` | Match any of the alternatives |
| `[abc]` | Match any character in the set |

## Development

```bash
npm install
npm run build
npm test
```

## License

MIT
