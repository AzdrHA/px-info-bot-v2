import DefaultButtonBuilder from '@component/button-builder/DefaultButtonBuilder'
import { ButtonBuilder, ButtonStyle } from 'discord.js'
import translator from '@util/UtilTranslator'
import ticketSettingRequest from '@/api/TicketSettingRequest'
import { EGlobalButton } from '@enum/EGlobalButton'
import { MENU_FAQ_LINK, TROUBLESHOOT_LINK } from '@config/Constant'

/**
 * @class TicketButton
 * @extends DefaultButtonBuilder
 */
export default class TicketButton extends DefaultButtonBuilder {
  /**
   * @public
   * @returns {Promise<ButtonBuilder[]>}
   */
  public async initializeButton (): Promise<ButtonBuilder[]> {
    const ticketSetting = await ticketSettingRequest.get()

    return [
      new ButtonBuilder({
        label: ticketSetting.contentButton,
        style: ButtonStyle.Success,
        customId: EGlobalButton.CREATE_TICKET,
        disabled: ticketSetting.category == null
      }),
      new ButtonBuilder({
        label: translator('Menu FAQ'),
        style: ButtonStyle.Link,
        url: MENU_FAQ_LINK
      }),
      new ButtonBuilder({
        label: translator('Troubleshoot'),
        style: ButtonStyle.Link,
        url: TROUBLESHOOT_LINK
      })
    ]
  }
}
