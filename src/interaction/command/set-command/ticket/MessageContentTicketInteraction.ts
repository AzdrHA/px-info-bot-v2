import AbstractInteraction from '@abstract/AbstractInteraction'
import translator from '@util/UtilTranslator'
import UtilLogger from '@util/UtilLogger'
import { ETicketSetCommand } from '@enum/command/ETicketSetCommand'
import MessageContentTicketSetCommandButtonBuilder
  from '@component/button/command/set/ticket/MessageContentTicketSetCommandButtonBuilder'
import TicketSettingService from '@service/TicketSettingService'

/**
 * @class MessageContentTicketInteraction
 * @extends AbstractInteraction
 */
export default class MessageContentTicketInteraction extends AbstractInteraction {
  public global: boolean = false
  public id: string = ETicketSetCommand.CONTENT_MESSAGE

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
      await ticketSettingService.updateContentMessage(this.client, content)
      await this.success(translator('The **{TYPE}** has been successfully updated', { TYPE: translator('Message Content') }))
      UtilLogger.success('MessageContentTicketInteraction callback ' + content)
    }

    return await this.messageButtonCollector(await this.send({
      content: translator('Send the new content of **{TYPE}**', { TYPE: translator('Message Content') }),
      components: await new MessageContentTicketSetCommandButtonBuilder().buildButton()
    }), callback)
  }
}
