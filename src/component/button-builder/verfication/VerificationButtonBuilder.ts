import { ButtonBuilder, ButtonStyle } from 'discord.js'
import DefaultButtonBuilder from '../DefaultButtonBuilder'
import { EVerificationButton } from '../../../enum/EVerificationButton'
import translator from '../../../util/UtilTranslator'

/**
 * @class VerificationButtonBuilder
 */
export default class VerificationButtonBuilder extends DefaultButtonBuilder {
  /**
   * @public
   * @return {Promise<ButtonBuilder[]>}
   */
  public initializeButton = async (): Promise<ButtonBuilder[]> => {
    return [
      new ButtonBuilder({
        label: translator('Verify'),
        style: ButtonStyle.Success,
        customId: EVerificationButton.VERIFY
      }),
      new ButtonBuilder({
        label: translator('Refuse'),
        style: ButtonStyle.Danger,
        customId: EVerificationButton.REFUSE
      })
    ]
  }
}
