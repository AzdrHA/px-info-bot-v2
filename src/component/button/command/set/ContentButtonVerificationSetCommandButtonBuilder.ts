import { ButtonBuilder, ButtonStyle } from 'discord.js'
import translator from '@util/UtilTranslator'
import DefaultCanceledButtonBuilder from '@component/button-builder/DefaultCanceledButtonBuilder'
import { EVerificationButton } from '@enum/EVerificationButton'

/**
 * @class ContentButtonVerificationSetCommandButtonBuilder
 * @extends DefaultButtonBuilder
 */
export default class ContentButtonVerificationSetCommandButtonBuilder extends DefaultCanceledButtonBuilder {
  /**
   * @public
   * @return {Promise<ButtonBuilder[]>}
   */
  public initializeButton = async (): Promise<ButtonBuilder[]> => {
    return [
      new ButtonBuilder({
        label: translator('Default Content Button'),
        style: ButtonStyle.Primary,
        customId: EVerificationButton.DEFAULT_BUTTON
      })
    ]
  }
}
