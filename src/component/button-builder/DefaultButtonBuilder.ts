import { ButtonBuilder, type ButtonComponentData } from 'discord.js'
import DefaultButtonRowBuilder from '../row-builder/DefaultButtonRowBuilder'

/**
 * @abstract
 * Class DefaultButtonBuilder
 */
export default abstract class DefaultButtonBuilder {
  /**
   * @protected
   * @param {any|null} data
   * @return {DefaultButtonRowBuilder}
   */
  public async buildButton (data?: any): Promise<DefaultButtonRowBuilder> {
    return new DefaultButtonRowBuilder().setComponents(
      (await this.initializeButton(data)).map((data) => new ButtonBuilder(data))
    )
  }

  public abstract initializeButton (
    data: any
  ): Promise<Array<Partial<ButtonComponentData>>>
}
