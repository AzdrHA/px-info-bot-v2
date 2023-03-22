import { type ButtonInteraction, type Message } from 'discord.js'
import ButtonCollector from '@collector/ButtonCollector'
import type DefaultButtonRowBuilder from '@component/row-builder/DefaultButtonRowBuilder'

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
   * @returns {Promise<DefaultButtonRowBuilder[]>}
   * @param {any} DataClass
   */
  public async buildButtons (DataClass: any): Promise<DefaultButtonRowBuilder[]> {
    return [await new DataClass().buildButton()]
  }
}
