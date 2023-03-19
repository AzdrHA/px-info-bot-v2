import DefaultButtonRowBuilder from './DefaultButtonRowBuilder'
import { ButtonBuilder, ButtonStyle } from 'discord.js'
import { GlobalButtonEnum } from '../../../type/enum/GlobalButtonEnum'
import UtilMessage from '../../../util/UtilMessage'

/**
 * Class CanceledButtonRowBuilder
 */
export default class DefaultCanceledButtonRowBuilder extends DefaultButtonRowBuilder {
  /**
   * @public
   * @param {ButtonBuilder[]} components
   * @return {this}
   */
  public addComponents (...components): this {
    return super.addComponents(
      ...components[0].concat([
        new ButtonBuilder()
          .setCustomId(GlobalButtonEnum.CANCEL)
          .setLabel(UtilMessage.translation('Cancel'))
          .setStyle(ButtonStyle.Danger)
      ])
    )
  }

  /**
   * @public
   * @param {ButtonBuilder[]} components
   * @return {this}
   */
  public setComponents (...components): this {
    return this.addComponents(...components)
  }
}
