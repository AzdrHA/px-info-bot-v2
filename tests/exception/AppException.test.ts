import AppException from '../../src/exception/AppException'

describe('AppException', () => {
  it('should be an instance of Error', () => {
    const appException = new AppException()
    expect(appException).toBeInstanceOf(Error)
    expect(appException).toBeInstanceOf(AppException)
    expect(appException.message).toBe('An error has been detected')
  })

  it('should be an instance of Error with custom message', () => {
    const appException = new AppException('Custom message')
    expect(appException).toBeInstanceOf(Error)
    expect(appException).toBeInstanceOf(AppException)
    expect(appException.message).toBe('Custom message')
  })
})
