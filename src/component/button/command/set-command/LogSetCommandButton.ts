import { ButtonBuilder, ButtonStyle } from 'discord.js'
import translator from '@util/UtilTranslator'
import DefaultCanceledButtonBuilder from '@component/button-builder/DefaultCanceledButtonBuilder'
import { ELogSetCommand } from '@enum/command/ELogSetCommand'

/**
 * @class LogSetCommandButton
 * @extends DefaultButtonBuilder
 */
export default class LogSetCommandButton extends DefaultCanceledButtonBuilder {
  /**
   * @public
   * @return {Promise<ButtonBuilder[]>}
   */
  public initializeButton = async (): Promise<ButtonBuilder[]> => {
    return [
      new ButtonBuilder({
        label: translator('Member Role'),
        style: ButtonStyle.Primary,
        customId: ELogSetCommand.MEMBER_ROLE
      }),
      new ButtonBuilder({
        label: translator('Ticket'),
        style: ButtonStyle.Primary,
        customId: ELogSetCommand.TICKET
      }),
      new ButtonBuilder({
        label: translator('Message'),
        style: ButtonStyle.Primary,
        customId: ELogSetCommand.MESSAGE
      }),
      new ButtonBuilder({
        label: translator('Member'),
        style: ButtonStyle.Primary,
        customId: ELogSetCommand.MEMBER
      }),
      new ButtonBuilder({
        label: translator('Name'),
        style: ButtonStyle.Primary,
        customId: ELogSetCommand.NAME
      }),
      new ButtonBuilder({
        label: translator('Voice Chat'),
        style: ButtonStyle.Primary,
        customId: ELogSetCommand.VOICE_CHAT
      })
    ]
  }
}
