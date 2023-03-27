import { DiscordAPIError, RESTJSONErrorCodes, type Message, type TextChannel } from 'discord.js'
import AppException from '@exception/AppException'
import translator from '@util/UtilTranslator'

/**
 * @class ExceptionService
 */
export default class ExceptionService {
  private readonly _error: Error
  private readonly _channel: TextChannel

  /**
   * @constructor
   * @param {Error} error
   * @param {TextChannel} channel
   */
  public constructor (error: Error, channel: TextChannel) {
    this._error = error
    this._channel = channel

    void this.handle(this._error)
  }

  /**
   * @public
   * @param {Error} error
   * @returns {Promise<void>}
   */
  private async handle (error: Error): Promise<Message<boolean>> {
    if (error instanceof AppException) {
      return await this._channel.send(error.message)
    }

    if (error instanceof DiscordAPIError) {
      switch (error.code) {
        case RESTJSONErrorCodes.MissingPermissions:
          return await this._channel.send(translator('I do not have the required authorization to perform the action', {}, 'error'))
      }
    }

    console.error(error)
    return await this._channel.send({
      content: translator('There was an error trying to execute that command!', {}, 'error')
    })
  }
}
