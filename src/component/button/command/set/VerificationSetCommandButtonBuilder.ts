import { ButtonBuilder, ButtonStyle } from 'discord.js'
import translator from '@util/UtilTranslator'
import { ESetCommandVerification } from '@enum/command/ESetCommandVerification'
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
        customId: ESetCommandVerification.CHANNEL
      }),
      new ButtonBuilder({
        label: translator('Button content'),
        style: ButtonStyle.Primary,
        customId: ESetCommandVerification.CONTENT_BUTTON,
        disabled: true
      }),
      new ButtonBuilder({
        label: translator('Message content'),
        style: ButtonStyle.Primary,
        customId: ESetCommandVerification.MESSAGE,
        disabled: true
      })
    ]
  }
}
