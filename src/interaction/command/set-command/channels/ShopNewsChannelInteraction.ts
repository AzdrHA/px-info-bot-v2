import AbstractChannelInteraction from '@abstract/AbstractChannelInteraction';
import { type IChannels } from '@interface/IChannels';
import { EChannelSetCommand } from '@enum/command/EChannelSetCommand';

/**
 * @class ShopNewsChannelInteraction
 * @extends AbstractChannelInteraction
 */
export default class ShopNewsChannelInteraction extends AbstractChannelInteraction {
  public channel: keyof IChannels = 'shopNews';
  public id: EChannelSetCommand = EChannelSetCommand.SHOP_NEWS;
}
