import AbstractLogInteraction from '@abstract/AbstractLogInteraction';
import { type IChannelLog } from '@interface/IChannelLog';
import { ELogSetCommand } from '@enum/command/ELogSetCommand';

/**
 * @class NameLogInteraction
 * @extends AbstractLogInteraction
 */
export default class NameLogInteraction extends AbstractLogInteraction {
  public channel: keyof IChannelLog = 'name';
  public id: ELogSetCommand = ELogSetCommand.NAME;
}
