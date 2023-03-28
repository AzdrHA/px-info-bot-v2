import { ButtonBuilder, ButtonStyle } from 'discord.js'
import translator from '@util/UtilTranslator'
import DefaultCanceledButtonBuilder from '@component/button-builder/DefaultCanceledButtonBuilder'
import { EVerificationSetCommand } from '@enum/command/EVerificationSetCommand'

/**
 * @class ContentButtonVerificationSetCommandButton
 * @extends DefaultButtonBuilder
 */
export default class ContentButtonVerificationSetCommandButton extends DefaultCanceledButtonBuilder {
  /**
   * @public
   * @return {Promise<ButtonBuilder[]>}
   */
  public initializeButton = async (): Promise<ButtonBuilder[]> => {
    return [
      new ButtonBuilder({
        label: translator('Default Content Button'),
        style: ButtonStyle.Primary,
        customId: EVerificationSetCommand.DEFAULT_BUTTON
      })
    ]
  }
}
