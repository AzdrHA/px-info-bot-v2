import AbstractChannelInteraction from '@abstract/AbstractChannelInteraction';
import { type IChannels } from '@interface/IChannels';
import { EChannelSetCommand } from '@enum/command/EChannelSetCommand';
import AbstractSaveChannelInteraction from "@abstract/AbstractSaveChannelInteraction";

/**
 * @class ShopAnnouncementChannelInteraction
 * @extends AbstractChannelInteraction
 */
export default class ShopAnnouncementChannelInteraction extends AbstractSaveChannelInteraction {
  public channel: keyof IChannels = 'shopAnnouncement';
  public id: EChannelSetCommand = EChannelSetCommand.SHOP_ANNOUNCEMENT;
}
