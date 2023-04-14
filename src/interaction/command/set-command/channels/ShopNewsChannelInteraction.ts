import { type IChannels } from '@interface/IChannels';
import { EChannelSetCommand } from '@enum/command/EChannelSetCommand';
import AbstractSaveChannelInteraction from "@abstract/AbstractSaveChannelInteraction";

/**
 * @class ShopNewsChannelInteraction
 * @extends AbstractChannelInteraction
 */
export default class ShopNewsChannelInteraction extends AbstractSaveChannelInteraction {
  public channel: keyof IChannels = 'shopNews';
  public id: EChannelSetCommand = EChannelSetCommand.SHOP_NEWS;
}
