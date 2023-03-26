import { ButtonBuilder, ButtonStyle } from 'discord.js'
import translator from '@util/UtilTranslator'
import { ESetCommand } from '@enum/command/ESetCommand'
import DefaultCanceledButtonBuilder from '@component/button-builder/DefaultCanceledButtonBuilder'

/**
 * @class SetCommandButtonBuilder
 * @extends DefaultButtonBuilder
 */
export default class SetCommandButtonBuilder extends DefaultCanceledButtonBuilder {
  public initializeButton = async (): Promise<ButtonBuilder[]> => {
    return [
      new ButtonBuilder({
        label: translator('Verification'),
        style: ButtonStyle.Primary,
        customId: ESetCommand.VERIFICATION
      })
    ]
  }
}
