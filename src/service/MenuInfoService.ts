import type Client from "@/Client";
import {
  type BaseMessageOptions,
  type Message,
  type TextChannel
} from "discord.js";
import menuInfoRequest from "@/api/MenuInfoRequest";
import {type IMenuInfo} from "@interface/IMenuInfo";
import {DISCORD_LINK, PX_WHITE_EMOJI, PXL_DOWNLOAD_LINK, VK_LINK, WEBSITE_LINK} from "@config/Constant";
import * as util from "util";
import MenuInfoButton from "@component/button/MenuInfoButton";

/**
 * Menu info service
 * @class MenuInfoService
 * @extends DefaultApiRequest<IMenuInfo>
 */
export default class MenuInfoService {
  /**
   * Update Status
   * @param {Client} client
   * @param {string} status
   * @return {Promise<Message | boolean>}
   */
  public async updateStatus(client: Client, status: string): Promise<Message | boolean>  {
    await menuInfoRequest.update('status', status)
    return await this.__updateMessage(client)
  }

  /**
   * Base Message
   * @param {IMenuInfo} menuInfo
   * @return {Promise<BaseMessageOptions>}
   * @private
   */
  private async __message(menuInfo: IMenuInfo): Promise<BaseMessageOptions> {
    return {
      content:
        util.format(
          '%s**__Phantom-X Menu Information__**%s\n',
          PX_WHITE_EMOJI,
          PX_WHITE_EMOJI
        ) +
        util.format('**Status**: %s/%s\n', menuInfo.status, menuInfo.dStatus) +
        util.format('**Version**: %s\n', menuInfo.version) +
        util.format('**Release Date**: %s\n\n', menuInfo.releaseDate) +
        util.format('**Launcher**: %s\n', menuInfo.launcherVersion) +
        util.format('**PX Server**: %s\n\n', menuInfo.serverStatus) +
        util.format('__Discord Invite:__ %s\n\n', DISCORD_LINK) +
        util.format(
          '__Website__:\n<%s>\n<%s>\n\n',
          VK_LINK,
          WEBSITE_LINK
        ) +
        util.format('__Download__: %s', PXL_DOWNLOAD_LINK),
      components: await new MenuInfoButton().buildButton()
    };
  };

  /**
   * Update Message
   * @return {Promise<Message | boolean>}
   * @param {Client} client
   * @param {TextChannel} channel
   * @private
   */
  private async __updateMessage(client: Client, channel?: TextChannel): Promise<Message | boolean> {
    const menuInfo = await menuInfoRequest.get()

    if (channel == null && menuInfo.channel != null)
      channel = client.channels.cache.get(menuInfo.channel) as TextChannel;
    if (channel == null) return false;

    if (menuInfo.message == null) {
      const message = await channel.send(await this.__message(menuInfo));
      await menuInfoRequest.updateMessage(message.id)
      return message;
    }

    const message = await channel.messages.fetch(menuInfo.message);
    if (message == null) return false;
    console.log('update');
    await message.edit(await this.__message(menuInfo));
    return message;
  }
}