import AbstractInteraction from '@abstract/AbstractInteraction'
import translator from '@util/UtilTranslator'
import UtilLogger from '@util/UtilLogger'
import { ETicketSetCommand } from '@enum/command/ETicketSetCommand'
import TicketSettingService from '@service/TicketSettingService'

/**
 * @class DefaultContentButtonTicketInteraction
 * @extends AbstractInteraction
 */
export default class DefaultContentButtonTicketInteraction extends AbstractInteraction {
  public global: boolean = false
  public id: string = ETicketSetCommand.DEFAULT_CONTENT_BUTTON

  /**
   * @public
   * @returns {Promise<any>}
   */
  public async run (): Promise<any> {
    this.interaction.message.delete().catch(() => {})
    const ticketSettingService = new TicketSettingService()
    await ticketSettingService.updateContentButton(this.client, TicketSettingService.DEFAULT_BUTTON_CONTENT)
    await this.success(translator('The **{TYPE}** has been successfully updated', { TYPE: translator('Content Button') }))
    UtilLogger.success('DefaultContentButtonTicketInteraction callback ' + TicketSettingService.DEFAULT_BUTTON_CONTENT)
  }
}
