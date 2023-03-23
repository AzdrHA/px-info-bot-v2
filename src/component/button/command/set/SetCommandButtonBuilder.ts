import { ButtonBuilder, ButtonStyle } from 'discord.js'
import translator from '@util/UtilTranslator'
import { ESetCommandButton } from '@enum/command/ESetCommandButton'
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
        customId: ESetCommandButton.VERIFICATION
      })
    ]
  }
}
