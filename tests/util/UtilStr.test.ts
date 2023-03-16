import { formalizeEventName, isScriptFile, lcFirst, leadingZero, ucFirst } from '../../src/util/UtilStr'

describe('util/str', () => {
  it('should be able to convert first character to lowercase', () => {
    expect(lcFirst('Hello')).toBe('hello')
  })

  it('should be able to convert first character to uppercase', () => {
    expect(ucFirst('hello')).toBe('Hello')
  })

  it('should be able to convert event name to formal name', () => {
    expect(formalizeEventName('MessageCreateEvent')).toBe('messageCreate')
  })

  it('should be able to check if file is script file', () => {
    expect(isScriptFile('index.js')).toBeTruthy()
    expect(isScriptFile('index.ts')).toBeTruthy()
    expect(isScriptFile('index.txt')).toBeFalsy()
  })

  it('should be able to add leading zero to number', () => {
    expect(leadingZero(1)).toBe('01')
    expect(leadingZero(10)).toBe('10')
  })
})
