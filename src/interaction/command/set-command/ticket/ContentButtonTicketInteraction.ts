import AbstractInteraction from '@abstract/AbstractInteraction'
import translator from '@util/UtilTranslator'
import UtilLogger from '@util/UtilLogger'
import { ETicketSetCommand } from '@enum/command/ETicketSetCommand'
import TicketSettingService from '@service/TicketSettingService'
import ContentButtonTicketSetCommandButton
  from '@component/button/command/set-command/ticket/ContentButtonTicketSetCommandButton'

/**
 * @class ContentButtonTicketInteraction
 * @extends AbstractInteraction
 */
export default class ContentButtonTicketInteraction extends AbstractInteraction {
  public global: boolean = false
  public id: string = ETicketSetCommand.CONTENT_BUTTON

  /**
   * @public
   * @returns {Promise<any>}
   */
  public async run (): Promise<any> {
    /**
     * @param {string} content
     * @returns {void}
     */
    const callback = async (content: string): Promise<void> => {
      const ticketSettingService = new TicketSettingService()
      await ticketSettingService.updateContentButton(this.client, content)
      await this.success(translator('The **{TYPE}** has been successfully updated', { TYPE: translator('Content Button') }))
      UtilLogger.success('ContentButtonTicketInteraction callback ' + content)
    }

    return await this.messageButtonCollector(await this.send({
      content: translator('Send the new content of the **{TYPE}**', { TYPE: translator('Content Message') }),
      components: await new ContentButtonTicketSetCommandButton().buildButton()
    }), callback)
  }
}
