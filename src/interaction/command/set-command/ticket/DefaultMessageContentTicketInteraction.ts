import AbstractInteraction from '@abstract/AbstractInteraction';
import translator from '@util/UtilTranslator';
import UtilLogger from '@util/UtilLogger';
import { ETicketSetCommand } from '@enum/command/ETicketSetCommand';
import TicketSettingService from '@service/TicketSettingService';

/**
 * @class DefaultMessageContentTicketInteraction
 * @extends AbstractInteraction
 */
export default class DefaultMessageContentTicketInteraction extends AbstractInteraction {
  public global: boolean = false;
  public id: string = ETicketSetCommand.DEFAULT_CONTENT_MESSAGE;

  /**
   * @public
   * @returns {Promise<any>}
   */
  public async run(): Promise<any> {
    this.interaction.message.delete().catch(() => {});
    const ticketSettingService = new TicketSettingService();
    await ticketSettingService.updateContentMessage(
      this.client,
      TicketSettingService.DEFAULT_MESSAGE_CONTENT
    );
    await this.success(
      translator('The **{TYPE}** has been successfully updated', {
        TYPE: translator('Message Content')
      })
    );
    UtilLogger.success(
      'DefaultContentButtonVerificationInteraction callback ' +
        TicketSettingService.DEFAULT_MESSAGE_CONTENT
    );
  }
}
