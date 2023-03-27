import { ButtonBuilder, ButtonStyle } from 'discord.js'
import translator from '@util/UtilTranslator'
import { EChannelSetCommand } from '@enum/command/EChannelSetCommand'
import DefaultCanceledButtonBuilder from '@component/button-builder/DefaultCanceledButtonBuilder'

/**
 * @class ChannelSetCommandButtonBuilder
 * @extends DefaultButtonBuilder
 */
export default class ChannelSetCommandButtonBuilder extends DefaultCanceledButtonBuilder {
  /**
   * @public
   * @return {Promise<ButtonBuilder[]>}
   */
  public initializeButton = async (): Promise<ButtonBuilder[]> => {
    return [
      new ButtonBuilder({
        label: translator('Info'),
        style: ButtonStyle.Primary,
        customId: EChannelSetCommand.INFO
      }),
      new ButtonBuilder({
        label: translator('Menu News'),
        style: ButtonStyle.Primary,
        customId: EChannelSetCommand.MENU_NEWS
      }),
      new ButtonBuilder({
        label: translator('Menu Info'),
        style: ButtonStyle.Primary,
        customId: EChannelSetCommand.MENU_INFO
      }),
      new ButtonBuilder({
        label: translator('Shop News'),
        style: ButtonStyle.Primary,
        customId: EChannelSetCommand.SHOP_NEWS
      }),
      new ButtonBuilder({
        label: translator('Shop Announcement'),
        style: ButtonStyle.Primary,
        customId: EChannelSetCommand.SHOP_ANNOUNCEMENT
      })
    ]
  }
}
