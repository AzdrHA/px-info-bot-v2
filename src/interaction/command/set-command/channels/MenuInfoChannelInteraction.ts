import AbstractChannelInteraction from '@abstract/AbstractChannelInteraction'
import { type IChannels } from '@interface/IChannels'
import { EChannelSetCommand } from '@enum/command/EChannelSetCommand'

/**
 * @class MenuInfoChannelInteraction
 * @extends AbstractChannelInteraction
 */
export default class MenuInfoChannelInteraction extends AbstractChannelInteraction {
  public channel: keyof IChannels = 'menuInfo'
  public id: EChannelSetCommand = EChannelSetCommand.MENU_INFO
}
