import AbstractLogInteraction from '@abstract/AbstractLogInteraction'
import { type IChannelLog } from '@interface/IChannelLog'
import { ELogSetCommand } from '@enum/command/ELogSetCommand'

/**
 * @class VoiceChatLogInteraction
 * @extends AbstractLogInteraction
 */
export default class VoiceChatLogInteraction extends AbstractLogInteraction {
  public channel: keyof IChannelLog = 'voiceChat'
  public id: ELogSetCommand = ELogSetCommand.VOICE_CHAT
}
