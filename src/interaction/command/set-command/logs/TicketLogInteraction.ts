import AbstractLogInteraction from '@abstract/AbstractLogInteraction';
import { type IChannelLog } from '@interface/IChannelLog';
import { ELogSetCommand } from '@enum/command/ELogSetCommand';

/**
 * @class TicketLogInteraction
 * @extends AbstractLogInteraction
 */
export default class TicketLogInteraction extends AbstractLogInteraction {
  public channel: keyof IChannelLog = 'ticket';
  public id: ELogSetCommand = ELogSetCommand.TICKET;
}
