import AbstractInteraction from '@abstract/AbstractInteraction';
import { ESetCommand } from '@enum/command/ESetCommand';
import translator from '@util/UtilTranslator';
import TicketSetCommandButton from '@component/button/command/set-command/ticket/TicketSetCommandButton';

/**
 * @class BaseTicketInteraction
 * @extends AbstractInteraction
 */
export default class BaseTicketInteraction extends AbstractInteraction {
  public global: boolean = false;
  public id: string = ESetCommand.TICKETS;

  /**
   * @method run
   * @description The run method
   * @returns {Promise<any>}
   */
  public async run(): Promise<any> {
    return await this.buttonCollector(
      await this.send({
        content: translator(
          'What **{TYPE}** settings would you like to change?',
          {
            TYPE: translator('Ticket')
          }
        ),
        components: await this.buildButtons(TicketSetCommandButton)
      })
    );
  }
}
