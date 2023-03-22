import translator from '@util/UtilTranslator'
import UtilLogger from '@util/UtilLogger'

describe('UtilTranslator', () => {
  it('should get exception for invalid file', () => {
    expect(() => translator('test', {}, 'invalid')).toThrowError('no such file or directory')
  })

  it('should the translated string', () => {
    const res = translator('Translation key "{KEY}" not found in "{FILE}" file', {}, 'error')
    expect(res).toBe('Translation key "{KEY}" not found in "{FILE}" file')
  })

  it('should log a warning and return the key for an invalid key', () => {
    const key = 'unknown-key'
    const originalWarn = UtilLogger.warn
    UtilLogger.warn = jest.fn() // mock the warn method
    expect(translator(key, {}, 'message')).toBe(key)
    expect(UtilLogger.warn).toHaveBeenCalledWith(`Translation key "${key}" not found in file "message"`)
    UtilLogger.warn = originalWarn
  })

  it('should return the translated string with replacements', () => {
    const result = translator('Translation key "{KEY}" not found in "{FILE}" file', { KEY: 'TEST', FILE: 'error' }, 'error')
    expect(result).toBe('Translation key "TEST" not found in "error" file')
  })

  it('should return the translated string without replacements', () => {
    const result = translator('Translation key "{KEY}" not found in "{FILE}" file', {}, 'error')
    expect(result).toBe('Translation key "{KEY}" not found in "{FILE}" file')
  })

  it('should return the translated string with replacements and without replacements', () => {
    const result = translator('Translation key "{KEY}" not found in "{FILE}" file', { KEY: 'TEST' }, 'error')
    expect(result).toBe('Translation key "TEST" not found in "{FILE}" file')
  })
})
