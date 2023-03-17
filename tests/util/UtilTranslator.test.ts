import translator from '../../src/util/UtilTranslator'
import UtilLogger from '../../src/util/UtilLogger'

describe('UtilTranslator', () => {
  it('should get exception for invalid file', () => {
    expect(() => translator('test', {}, 'invalid')).toThrowError('no such file or directory')
  })

  it('should log a warning and return the key for an invalid key', () => {
    const key = 'unknown-key'
    const originalWarn = UtilLogger.warn
    UtilLogger.warn = jest.fn() // mock the warn method
    expect(translator(key)).toBe(key)
    expect(UtilLogger.warn).toHaveBeenCalledWith(`Translation key "${key}" not found in file "message"`)
    UtilLogger.warn = originalWarn
  })

  it('should return the translated key', () => {
    expect(translator('test', {})).toBe('Je suis un message de test {MM} ok')
  })

  it('should return the translated key', () => {
    expect(translator('test', { MM: 'C' })).toBe('Je suis un message de test C ok')
  })
})
