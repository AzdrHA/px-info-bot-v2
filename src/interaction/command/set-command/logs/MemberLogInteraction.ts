import AbstractLogInteraction from '@abstract/AbstractLogInteraction';
import { type IChannelLog } from '@interface/IChannelLog';
import { ELogSetCommand } from '@enum/command/ELogSetCommand';

/**
 * @class MemberLogInteraction
 * @extends AbstractLogInteraction
 */
export default class MemberLogInteraction extends AbstractLogInteraction {
  public channel: keyof IChannelLog = 'member';
  public id: ELogSetCommand = ELogSetCommand.MEMBER;
}
