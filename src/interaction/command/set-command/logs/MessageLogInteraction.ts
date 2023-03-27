import AbstractLogInteraction from '@interaction/command/set-command/logs/AbstractLogInteraction'
import { type IChannelLog } from '@interface/IChannelLog'
import { ELogSetCommand } from '@enum/command/ELogSetCommand'

/**
 * @class MessageLogInteraction
 * @extends AbstractLogInteraction
 */
export default class MessageLogInteraction extends AbstractLogInteraction {
  public channel: keyof IChannelLog = 'message'
  public id: ELogSetCommand = ELogSetCommand.MESSAGE
}
