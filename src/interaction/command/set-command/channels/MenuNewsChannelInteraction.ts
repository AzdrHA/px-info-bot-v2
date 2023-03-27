import AbstractChannelInteraction from '@abstract/AbstractChannelInteraction'
import { type IChannels } from '@interface/IChannels'
import { EChannelSetCommand } from '@enum/command/EChannelSetCommand'

/**
 * @class MenuNewsChannelInteraction
 * @extends AbstractChannelInteraction
 */
export default class MenuNewsChannelInteraction extends AbstractChannelInteraction {
  public channel: keyof IChannels = 'menuNews'
  public id: EChannelSetCommand = EChannelSetCommand.MENU_NEWS
}
