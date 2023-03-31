import {
  formalizeEventName,
  isScriptFile,
  lcFirst,
  leadingZero,
  replace,
  ucFirst
} from '@util/UtilStr';
import { describe, it, expect } from 'vitest';

describe('util/str', () => {
  it('should be able to convert first character to lowercase', () => {
    expect(lcFirst('Hello')).toBe('hello');
  });

  it('should be able to convert first character to uppercase', () => {
    expect(ucFirst('hello')).toBe('Hello');
  });

  it('should be able to convert event name to formal name', () => {
    expect(formalizeEventName('MessageCreateEvent')).toBe('messageCreate');
  });

  it('should be able to check if file is script file', () => {
    expect(isScriptFile('index.js')).toBeTruthy();
    expect(isScriptFile('index.ts')).toBeTruthy();
    expect(isScriptFile('index.txt')).toBeFalsy();
  });

  it('should be able to add leading zero to number', () => {
    expect(leadingZero(1)).toBe('01');
    expect(leadingZero(10)).toBe('10');
  });

  it('should replace parameters in string', () => {
    expect(replace('Hello {name}', { name: 'World' })).toBe('Hello World');
    expect(replace('Hello {name} {name}', { name: 'World' })).toBe(
      'Hello World World'
    );
  });
});
