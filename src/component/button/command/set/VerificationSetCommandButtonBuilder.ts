import DefaultButtonBuilder from '@component/button-builder/DefaultButtonBuilder'
import { ButtonBuilder, ButtonStyle } from 'discord.js'
import translator from '@util/UtilTranslator'

/**
 * @class VerificationSetCommandButtonBuilder
 * @extends DefaultButtonBuilder
 */
export default class VerificationSetCommandButtonBuilder extends DefaultButtonBuilder {
  /**
   * @public
   * @return {Promise<ButtonBuilder[]>}
   */
  public initializeButton = async (): Promise<ButtonBuilder[]> => {
    return [
      new ButtonBuilder({
        label: translator('HELLO'),
        style: ButtonStyle.Success,
        customId: 'HELLO'
      })
    ]
  }
}
