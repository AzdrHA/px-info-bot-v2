import { type ButtonInteraction, type Message } from 'discord.js'
import ButtonCollector from '@collector/ButtonCollector'
import { MessageCollector } from '@collector/MessageCollector'

/**
 * @public
 * @class MessageButtonCollector
 */
export class MessageButtonCollector {
  private readonly clientMessage: Message
  private readonly executorMessage: Message | ButtonInteraction
  private readonly callback: ((content: string) => void) | undefined

  /**
   * @public
   * @constructor
   * @param {Message} clientMessage
   * @param {Message | ButtonInteraction} executorMessage
   * @param {(content: string) => void} callback
   */
  public constructor (clientMessage: Message, executorMessage: Message | ButtonInteraction, callback?: (content: string) => void) {
    this.clientMessage = clientMessage
    this.executorMessage = executorMessage
    this.callback = callback
    this.__init()
  }

  /**
   * @private
   * @description Initialize the collector
   * @returns {MessageCollector}
   */
  private __init (): MessageCollector {
    /**
     * @param content
     * @returns {void}
     */
    const callback = (content: string): void => {
      if (buttonCollector != null) buttonCollector.stop()
      if (this.callback != null) this.callback(content)
    }

    const buttonCollector = new ButtonCollector(this.clientMessage, this.executorMessage).getCollector()
    const messageCollector = new MessageCollector(this.clientMessage, this.executorMessage, callback)

    buttonCollector?.on('collect', () => {
      messageCollector.getCollector()?.stop()
      console.log('ufqisfhqisfhqsiofhioqs')
    })

    return messageCollector
  }
}
