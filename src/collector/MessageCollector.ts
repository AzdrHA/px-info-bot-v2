import {
  type ButtonInteraction,
  Message,
  type MessageCollector as BaseMessageCollector, type TextChannel
} from 'discord.js'
import { type Callback } from '@abstract/AbstractAction'
import ExceptionService from '@service/ExceptionService'

/**
 * @public
 * Class MessageCollector
 */
export class MessageCollector {
  private readonly clientMessage: Message
  private readonly executorMessage: Message | ButtonInteraction
  private collector: BaseMessageCollector | undefined
  private readonly callback: Callback | undefined

  /**
   * @public
   * @param clientMessage
   * @param executorMessage
   * @param {Message} callback
   */
  public constructor (
    clientMessage: Message,
    executorMessage: Message | ButtonInteraction,
    callback?: Callback
  ) {
    this.clientMessage = clientMessage
    this.executorMessage = executorMessage
    this.callback = callback
    this.__init()
  }

  /**
   * @private
   * @description Initialize the collector
   * @returns {void}
   */
  private __init (): void {
    const author = this.executorMessage instanceof Message ? this.executorMessage.author : this.executorMessage.user
    this.collector = this.clientMessage.channel.createMessageCollector({
      filter: (message: Message) => message.author.id === author.id,
      time: 60000,
      max: 1
    })

    this.collector.on('collect', this.__collect)
  }

  /**
   * @private
   * @description Collect the message
   * @param {Message} message
   * @returns {Promise<any>}
   */
  private readonly __collect = async (message: Message): Promise<any> => {
    // Delete the message from the bot
    if (this.clientMessage.deletable) await this.clientMessage.delete().catch(() => null)
    // Delete the message from the user
    if (message.deletable) await message.delete().catch(() => null)
    // Call the callback if it exists
    try {
      if (this.callback != null) await this.callback(message.content)
    } catch (e) {
      return new ExceptionService(e as Error, this.executorMessage.channel as TextChannel)
    }
  }

  public getCollector = (): BaseMessageCollector | undefined => {
    return this.collector
  }
}
