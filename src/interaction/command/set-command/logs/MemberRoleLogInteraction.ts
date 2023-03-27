import AbstractLogInteraction from '@interaction/command/set-command/logs/AbstractLogInteraction'
import { type IChannelLog } from '@interface/IChannelLog'
import { ELogSetCommand } from '@enum/command/ELogSetCommand'

/**
 * @class MemberRoleLogInteraction
 * @extends AbstractLogInteraction
 */
export default class MemberRoleLogInteraction extends AbstractLogInteraction {
  public channel: keyof IChannelLog = 'memberRole'
  public id: ELogSetCommand = ELogSetCommand.MEMBER_ROLE
}
