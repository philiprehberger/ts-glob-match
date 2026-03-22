import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { globMatch, globFilter, globToRegex } from '../../dist/index.js';

describe('globMatch', () => {
  it('should match with * wildcard', () => {
    assert.equal(globMatch('*.ts', 'index.ts'), true);
    assert.equal(globMatch('*.ts', 'index.js'), false);
  });

  it('should match with ** recursive wildcard', () => {
    assert.equal(globMatch('src/**/*.ts', 'src/utils/helper.ts'), true);
    assert.equal(globMatch('src/**/*.ts', 'src/deep/nested/file.ts'), true);
  });

  it('should match with ? single character', () => {
    assert.equal(globMatch('file?.ts', 'file1.ts'), true);
    assert.equal(globMatch('file?.ts', 'file12.ts'), false);
  });

  it('should match with {a,b} alternation', () => {
    assert.equal(globMatch('*.{ts,js}', 'index.ts'), true);
    assert.equal(globMatch('*.{ts,js}', 'index.js'), true);
    assert.equal(globMatch('*.{ts,js}', 'index.css'), false);
  });

  it('should match with [abc] character class', () => {
    assert.equal(globMatch('file[123].ts', 'file1.ts'), true);
    assert.equal(globMatch('file[123].ts', 'file4.ts'), false);
  });

  it('should return false for no match', () => {
    assert.equal(globMatch('*.ts', 'readme.md'), false);
  });

  it('should be case sensitive by default', () => {
    assert.equal(globMatch('*.TS', 'index.ts'), false);
  });

  it('should support case insensitive option', () => {
    assert.equal(globMatch('*.TS', 'index.ts', { caseSensitive: false }), true);
  });

  it('should match exact strings without wildcards', () => {
    assert.equal(globMatch('index.ts', 'index.ts'), true);
    assert.equal(globMatch('index.ts', 'other.ts'), false);
  });

  it('should handle empty pattern', () => {
    assert.equal(globMatch('', ''), true);
    assert.equal(globMatch('', 'something'), false);
  });
});

describe('globFilter', () => {
  it('should filter an array of strings', () => {
    const files = ['index.ts', 'utils.ts', 'style.css', 'readme.md'];
    const result = globFilter('*.ts', files);
    assert.deepEqual(result, ['index.ts', 'utils.ts']);
  });
});

describe('globToRegex', () => {
  it('should return a RegExp instance', () => {
    const regex = globToRegex('*.ts');
    assert.ok(regex instanceof RegExp);
  });
});
