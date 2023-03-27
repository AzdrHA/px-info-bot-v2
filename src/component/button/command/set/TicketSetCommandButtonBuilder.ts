import { ButtonBuilder, ButtonStyle } from 'discord.js'
import translator from '@util/UtilTranslator'
import DefaultCanceledButtonBuilder from '@component/button-builder/DefaultCanceledButtonBuilder'
import { ETicketSetCommand } from '@enum/command/ETicketSetCommand'

/**
 * @class TicketSetCommandButtonBuilder
 * @extends DefaultButtonBuilder
 */
export default class TicketSetCommandButtonBuilder extends DefaultCanceledButtonBuilder {
  /**
   * @public
   * @return {Promise<ButtonBuilder[]>}
   */
  public initializeButton = async (): Promise<ButtonBuilder[]> => {
    return [
      new ButtonBuilder({
        label: translator('Archived Category'),
        style: ButtonStyle.Primary,
        customId: ETicketSetCommand.ARCHIVED_CATEGORY
      }),
      new ButtonBuilder({
        label: translator('Category'),
        style: ButtonStyle.Primary,
        customId: ETicketSetCommand.CATEGORY
      }),
      new ButtonBuilder({
        label: translator('Channel'),
        style: ButtonStyle.Primary,
        customId: ETicketSetCommand.CHANNEL
      })
    ]
  }
}
