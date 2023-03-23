import * as util from 'util'
import chalk from 'chalk'
import UtilLogger from '@util/UtilLogger'
import { describe, it, expect, vi } from 'vitest'

describe('util/logger', () => {
  it('should be able to log to console', () => {
    console.log = vi.fn()
    const type = 'INFO'
    const message = 'Hello'
    UtilLogger.log(type, message)
    expect(console.log).toHaveBeenCalledWith(
      util.format('[%s] %s: %s', type, UtilLogger.dateFormat(), message)
    )
  })

  it('should be able to info log to console', () => {
    console.log = vi.fn()
    const message = 'Hello'
    UtilLogger.info(message)
    expect(console.log).toHaveBeenCalledWith(
      util.format(
        '[%s] %s: %s',
        chalk.cyan('INFO'),
        UtilLogger.dateFormat(),
        message
      )
    )
  })

  it('should be able to success log to console', () => {
    console.log = vi.fn()
    const message = 'Hello'
    UtilLogger.success(message)
    expect(console.log).toHaveBeenCalledWith(
      util.format(
        '[%s] %s: %s',
        chalk.green('SUCCESS'),
        UtilLogger.dateFormat(),
        message
      )
    )
  })

  it('should be able to event log to console', () => {
    console.log = vi.fn()
    const message = 'Hello'
    UtilLogger.event(message)
    expect(console.log).toHaveBeenCalledWith(
      util.format(
        '[%s] %s: %s',
        chalk.magenta('EVENT'),
        UtilLogger.dateFormat(),
        message
      )
    )
  })

  it('should be able to command log to console', () => {
    console.log = vi.fn()
    const message = 'Hello'
    UtilLogger.command(message)
    expect(console.log).toHaveBeenCalledWith(
      util.format(
        '[%s] %s: %s',
        chalk.yellow('COMMAND'),
        UtilLogger.dateFormat(),
        message
      )
    )
  })

  it('should be able to interaction log to console', () => {
    console.log = vi.fn()
    const message = 'Hello'
    UtilLogger.interaction(message)
    expect(console.log).toHaveBeenCalledWith(
      util.format(
        '[%s] %s: %s',
        chalk.blue('INTERACTION'),
        UtilLogger.dateFormat(),
        message
      )
    )
  })

  it('should be able to error log to console', () => {
    console.log = vi.fn()
    const message = 'Hello'
    UtilLogger.error(message)
    expect(console.log).toHaveBeenCalledWith(
      util.format(
        '[%s] %s: %s',
        chalk.red('ERROR'),
        UtilLogger.dateFormat(),
        message
      )
    )
  })

  it('should be able to warn log to console', () => {
    console.log = vi.fn()
    const message = 'Hello'
    UtilLogger.warn(message)
    expect(console.log).toHaveBeenCalledWith(
      util.format(
        '[%s] %s: %s',
        chalk.yellow('WARN'),
        UtilLogger.dateFormat(),
        message
      )
    )
  })

  it('should be able to api request log to console', () => {
    console.log = vi.fn()
    const message = 'Hello'
    UtilLogger.apiRequest(message)
    expect(console.log).toHaveBeenCalledWith(
      util.format(
        '[%s] %s: %s',
        chalk.blue('API REQUEST'),
        UtilLogger.dateFormat(),
        message
      )
    )
  })

  it('should be able to cache request log to console', () => {
    console.log = vi.fn()
    const message = 'Hello'
    UtilLogger.cacheRequest(message)
    expect(console.log).toHaveBeenCalledWith(
      util.format(
        '[%s] %s: %s',
        chalk.magenta('CACHE REQUEST'),
        UtilLogger.dateFormat(),
        message
      )
    )
  })
})
