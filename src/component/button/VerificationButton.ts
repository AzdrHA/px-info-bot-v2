import { ButtonBuilder, ButtonStyle } from 'discord.js'
import DefaultButtonBuilder from '@component/button-builder/DefaultButtonBuilder'
import translator from '@util/UtilTranslator'
import { EGlobalButton } from '@enum/EGlobalButton'

/**
 * @class VerificationButton
 * @extends DefaultButtonBuilder
 */
export default class VerificationButton extends DefaultButtonBuilder {
  private readonly verifyText: string

  /**
   * @constructor
   * @param verifyText
   */
  public constructor (verifyText: string = translator('Verify')) {
    super()

    this.verifyText = verifyText
  }

  /**
   * @public
   * @return {Promise<ButtonBuilder[]>}
   */
  public initializeButton = async (): Promise<ButtonBuilder[]> => {
    return [
      new ButtonBuilder({
        label: this.verifyText,
        style: ButtonStyle.Success,
        customId: EGlobalButton.VERIFY
      }),
      new ButtonBuilder({
        label: translator('Refuse'),
        style: ButtonStyle.Danger,
        customId: EGlobalButton.REFUSE
      })
    ]
  }
}
