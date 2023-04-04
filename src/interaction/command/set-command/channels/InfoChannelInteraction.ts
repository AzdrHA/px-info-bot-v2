import AbstractChannelInteraction from '@abstract/AbstractChannelInteraction';
import { type IChannels } from '@interface/IChannels';
import { EChannelSetCommand } from '@enum/command/EChannelSetCommand';
import AbstractSaveChannelInteraction from "@abstract/AbstractSaveChannelInteraction";

/**
 * @class InfoChannelInteraction
 * @extends AbstractChannelInteraction
 */
export default class InfoChannelInteraction extends AbstractSaveChannelInteraction {
  public channel: keyof IChannels = 'info';
  public id: EChannelSetCommand = EChannelSetCommand.INFO;
}
