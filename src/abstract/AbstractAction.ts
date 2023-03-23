import ButtonCollector from '@collector/ButtonCollector'
import type DefaultButtonRowBuilder from '@component/row-builder/DefaultButtonRowBuilder'
import { type ButtonInteraction, type Message } from 'discord.js'
import { MessageCollector } from '@collector/MessageCollector'

/**
 * @abstract
 * @class AbstractAction
 */
export default abstract class AbstractAction {
  /**
   * @public
   * @param {Message} message
   * @param {Message | ButtonInteraction} interaction
   * @param {boolean} autoDeletion
   * @returns {Promise<Message>}
   */
  public async parentButtonCollector (message: Message, interaction: Message | ButtonInteraction, autoDeletion: boolean = false): Promise<Message> {
    // eslint-disable-next-line no-new
    new ButtonCollector(message, interaction, autoDeletion)
    return message
  }

  /**
   * @public
   * @param {Message} clientMessage
   * @param {Message} executorMessage
   * @param {(message: Message) => void} callback
   * @returns {Promise<Message>}
   */
  public async parentMessageCollector (clientMessage: Message, executorMessage: Message, callback?: (message: Message) => void): Promise<Message> {
    // eslint-disable-next-line no-new
    const buttonCollector = new ButtonCollector(clientMessage, executorMessage, true).getCollector()

    const secondCallback = (message: Message) => {
      try {
        if (buttonCollector != null) buttonCollector.stop()
        if (callback != null) callback(message)
      } catch (e) {
        console.log(e)
      }
    }

    new MessageCollector(clientMessage, executorMessage, secondCallback)
    return clientMessage
  }

  /**
   * @public
   * @returns {Promise<DefaultButtonRowBuilder[]>}
   * @param {any} DataClass
   */
  public async buildButtons (DataClass: any): Promise<DefaultButtonRowBuilder[]> {
    return new DataClass().buildButton()
  }
}
