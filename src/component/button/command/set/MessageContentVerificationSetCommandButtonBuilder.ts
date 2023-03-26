import { ButtonBuilder, ButtonStyle } from 'discord.js'
import translator from '@util/UtilTranslator'
import DefaultCanceledButtonBuilder from '@component/button-builder/DefaultCanceledButtonBuilder'
import { EVerificationSetCommand } from '@enum/command/EVerificationSetCommand'

/**
 * @class MessageContentVerificationSetCommandButtonBuilder
 * @extends DefaultButtonBuilder
 */
export default class MessageContentVerificationSetCommandButtonBuilder extends DefaultCanceledButtonBuilder {
  /**
   * @public
   * @return {Promise<ButtonBuilder[]>}
   */
  public initializeButton = async (): Promise<ButtonBuilder[]> => {
    return [
      new ButtonBuilder({
        label: translator('Default Message Content'),
        style: ButtonStyle.Primary,
        customId: EVerificationSetCommand.DEFAULT_MESSAGE
      })
    ]
  }
}
