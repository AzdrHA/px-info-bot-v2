import { EChannelSetCommand } from '@enum/command/EChannelSetCommand';
import AbstractChannelInteraction from "@abstract/AbstractChannelInteraction";
import {getIdFromChannelMention} from "@util/UtilRegex";
import {TextChannel} from "discord.js";
import AppException from "@exception/AppException";
import {type IMenuInfo} from "@interface/IMenuInfo";
import menuInfoRequest from "@/api/MenuInfoRequest";
import translator from "@util/UtilTranslator";
import UtilLogger from "@util/UtilLogger";

/**
 * @class MenuInfoChannelInteraction
 * @extends AbstractChannelInteraction
 */
export default class MenuInfoChannelInteraction extends AbstractChannelInteraction {
  protected channel: keyof IMenuInfo = 'channel';
  public global: boolean = false;
  public id: string = EChannelSetCommand.MENU_INFO;


  /**
   * @param {string} content
   * @returns {void}
   */
  protected  callback = async (content: string): Promise<void> => {
    const channel =
      this.interaction.guild != null
        ? this.interaction.guild.channels.cache.get(
          getIdFromChannelMention(content)
        )
        : null;
    if (channel == null || !(channel instanceof TextChannel))
      throw new AppException('The value entered is invalid');

    await menuInfoRequest.update(this.channel, channel.id);
    await this.success(
      translator('The **{TYPE}** has been successfully updated', {
        TYPE: translator('Channel')
      })
    );
    UtilLogger.success('ChannelLogInteraction callback ' + channel.id);
  }
}
