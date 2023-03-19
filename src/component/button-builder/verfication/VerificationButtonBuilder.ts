import { ActionRowBuilder, ButtonBuilder, type ButtonComponentData, ButtonStyle } from 'discord.js'
import DefaultButtonBuilder from '../DefaultButtonBuilder'
import { EVerificationButton } from '../../../enum/EVerificationButton'
import DefaultCanceledButtonBuilder from '../DefaultCanceledButtonBuilder'

/**
 * @class VerificationButtonBuilder
 */
export default class VerificationButtonBuilder extends DefaultButtonBuilder {
  /**
   * @public
   * @return {Partial<ButtonComponentData>[]}
   */
  public initializeButton = async (): Promise<Array<Partial<ButtonComponentData>>> => {
    return [
      {
        label: 'Verify',
        style: ButtonStyle.Success,
        customId: 'VERIFY'
      },
      {
        label: 'Refuse',
        style: ButtonStyle.Danger,
        customId: 'REFUSE'
      }
    ]
  }
}
