import AbstractLogInteraction from '@abstract/AbstractLogInteraction';
import { type IChannelLog } from '@interface/IChannelLog';
import { ELogSetCommand } from '@enum/command/ELogSetCommand';

/**
 * @class InviteLogInteraction
 * @extends AbstractLogInteraction
 */
export default class InviteLogInteraction extends AbstractLogInteraction {
  public channel: keyof IChannelLog = 'invite';
  public id: ELogSetCommand = ELogSetCommand.INVITE;
}
