import { type ButtonBuilder } from 'discord.js'
import DefaultButtonRowBuilder from '@component/row-builder/DefaultButtonRowBuilder'

/**
 * @abstract
 * Class DefaultButtonBuilder
 */
export default abstract class DefaultButtonBuilder {
  /**
   * @protected
   * @return {DefaultButtonRowBuilder}
   */
  public buildButton = async (): Promise<DefaultButtonRowBuilder[]> => {
    return [new DefaultButtonRowBuilder().setComponents(await this.initializeButton())]
  }

  public abstract initializeButton (): Promise<ButtonBuilder[]>
}
