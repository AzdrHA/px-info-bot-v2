import { type ButtonInteraction, type Message } from 'discord.js'
import ButtonCollector from '@collector/ButtonCollector'
import { MessageCollector } from '@collector/MessageCollector'
import { type Callback } from '@abstract/AbstractAction'

/**
 * @public
 * @class MessageButtonCollector
 */
export class MessageButtonCollector {
  private readonly clientMessage: Message
  private readonly executorMessage: Message | ButtonInteraction
  private readonly callback: Callback | undefined

  /**
   * @public
   * @constructor
   * @param {Message} clientMessage
   * @param {Message | ButtonInteraction} executorMessage
   * @param {(content: string) => void} callback
   */
  public constructor (clientMessage: Message, executorMessage: Message | ButtonInteraction, callback?: Callback) {
    this.clientMessage = clientMessage
    this.executorMessage = executorMessage
    this.callback = callback
    void this.__init()
  }

  /**
   * @private
   * @description Initialize the collector
   * @returns {MessageCollector}
   */
  private async __init (): Promise<MessageCollector> {
    /**
     * @param content
     * @returns {void}
     */
    const callback = async (content: string): Promise<void> => {
      if (buttonCollector != null) buttonCollector.stop()
      if (this.callback != null) await this.callback(content)
    }

    const buttonCollector = new ButtonCollector(this.clientMessage, this.executorMessage).getCollector()
    const messageCollector = new MessageCollector(this.clientMessage, this.executorMessage, callback)

    buttonCollector?.on('collect', () => {
      messageCollector.getCollector()?.stop()
    })

    return messageCollector
  }
}
