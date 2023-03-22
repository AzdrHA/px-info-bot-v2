import DefaultButtonBuilder from '@component/button-builder/DefaultButtonBuilder'
import { ButtonBuilder, ButtonStyle } from 'discord.js'
import translator from '@util/UtilTranslator'
import { ESetCommandButton } from '@enum/command/ESetCommandButton'

/**
 * @class SetCommandButtonBuilder
 * @extends DefaultButtonBuilder
 */
export default class SetCommandButtonBuilder extends DefaultButtonBuilder {
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
