import {
  formalizeEventName,
  getNested,
  isScriptFile,
  lcFirst,
  leadingZero,
  replace,
  ucFirst
} from '@util/UtilStr';
import { describe, it, expect } from 'vitest';

describe('util/str', () => {
  describe('lcFirst', () => {
    it('should be able to convert first character to lowercase', () => {
      expect(lcFirst('Hello')).toBe('hello');
    });
  });

  describe('ucFirst', () => {
    it('should be able to convert first character to uppercase', () => {
      expect(ucFirst('hello')).toBe('Hello');
    });
  });

  describe('formalizeEventName', () => {
    it('should be able to convert event name to formal name', () => {
      expect(formalizeEventName('MessageCreateEvent')).toBe('messageCreate');
    });
  });

  describe('isScriptFile', () => {
    it('should be able to check if file is script file', () => {
      expect(isScriptFile('index.js')).toBeTruthy();
      expect(isScriptFile('index.ts')).toBeTruthy();
      expect(isScriptFile('index.txt')).toBeFalsy();
    });
  });

  describe('leadingZero', () => {
    it('should be able to add leading zero to number', () => {
      expect(leadingZero(1)).toBe('01');
      expect(leadingZero(10)).toBe('10');
    });
  });

  describe('replace', () => {
    it('should replace parameters in string', () => {
      expect(replace('Hello {name}', { name: 'World' })).toBe('Hello World');
      expect(replace('Hello {name} {name}', { name: 'World' })).toBe(
        'Hello World World'
      );
    });
  });

  describe('getNested', () => {
    it('should replace parameters in string with custom prefix and suffix', () => {
      expect(getNested('a.b.c', { a: { b: { c: 1 } } })).toBe(1);
    });

    it('should return null if key is not found', () => {
      expect(getNested('a.b.c', { a: { b: { d: 1 } } })).toBeNull();
    });

    it('should return custom default value if key is not found', () => {
      expect(getNested('a.b.c', { a: { b: { d: 1 } } }, 'Undefined')).toBe(
        'Undefined'
      );
    });
  });
});
