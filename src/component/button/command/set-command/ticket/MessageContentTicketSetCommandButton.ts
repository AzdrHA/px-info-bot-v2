import { ButtonBuilder, ButtonStyle } from 'discord.js'
import translator from '@util/UtilTranslator'
import DefaultCanceledButtonBuilder from '@component/button-builder/DefaultCanceledButtonBuilder'
import { ETicketSetCommand } from '@enum/command/ETicketSetCommand'

/**
 * @class MessageContentTicketSetCommandButton
 * @extends DefaultButtonBuilder
 */
export default class MessageContentTicketSetCommandButton extends DefaultCanceledButtonBuilder {
  /**
   * @public
   * @return {Promise<ButtonBuilder[]>}
   */
  public initializeButton = async (): Promise<ButtonBuilder[]> => {
    return [
      new ButtonBuilder({
        label: translator('Default Message Content'),
        style: ButtonStyle.Primary,
        customId: ETicketSetCommand.DEFAULT_CONTENT_MESSAGE
      })
    ]
  }
}
