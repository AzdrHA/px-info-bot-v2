import { ButtonBuilder, ButtonStyle } from 'discord.js'
import translator from '@util/UtilTranslator'
import { EVerificationSetCommand } from '@enum/command/EVerificationSetCommand'
import DefaultCanceledButtonBuilder from '@component/button-builder/DefaultCanceledButtonBuilder'

/**
 * @class VerificationSetCommandButtonBuilder
 * @extends DefaultButtonBuilder
 */
export default class VerificationSetCommandButtonBuilder extends DefaultCanceledButtonBuilder {
  /**
   * @public
   * @return {Promise<ButtonBuilder[]>}
   */
  public initializeButton = async (): Promise<ButtonBuilder[]> => {
    return [
      new ButtonBuilder({
        label: translator('Channel'),
        style: ButtonStyle.Primary,
        customId: EVerificationSetCommand.CHANNEL
      }),
      new ButtonBuilder({
        label: translator('Button content'),
        style: ButtonStyle.Primary,
        customId: EVerificationSetCommand.CONTENT_BUTTON
      }),
      new ButtonBuilder({
        label: translator('Message content'),
        style: ButtonStyle.Primary,
        customId: EVerificationSetCommand.MESSAGE
      })
    ]
  }
}
