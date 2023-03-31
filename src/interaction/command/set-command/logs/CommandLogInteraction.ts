import AbstractLogInteraction from '@abstract/AbstractLogInteraction';
import { type IChannelLog } from '@interface/IChannelLog';
import { ELogSetCommand } from '@enum/command/ELogSetCommand';

/**
 * @class CommandLogInteraction
 * @extends AbstractLogInteraction
 */
export default class CommandLogInteraction extends AbstractLogInteraction {
  public channel: keyof IChannelLog = 'command';
  public id: ELogSetCommand = ELogSetCommand.COMMAND;
}
