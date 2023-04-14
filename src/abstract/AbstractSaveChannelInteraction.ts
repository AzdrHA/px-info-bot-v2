import AbstractChannelInteraction from "@abstract/AbstractChannelInteraction";
import {type IChannels} from "@interface/IChannels";
import {type EChannelSetCommand} from "@enum/command/EChannelSetCommand";
import {getIdFromChannelMention} from "@util/UtilRegex";
import {TextChannel} from "discord.js";
import AppException from "@exception/AppException";
import channelRequest from "@/api/ChannelRequest";
import translator from "@util/UtilTranslator";
import util from "util";
import UtilLogger from "@util/UtilLogger";

/**
 * @abstract
 * @class AbstractChannelInteraction
 * @extends AbstractInteraction
 */
export default abstract class AbstractSaveChannelInteraction extends AbstractChannelInteraction {
  public abstract channel: keyof IChannels;
  public global: boolean = false;
  public abstract id: EChannelSetCommand;

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

    await channelRequest.update(this.channel, channel.id);
    await this.success(
      translator('The **{TYPE}** has been successfully updated', {
        TYPE: util.format(
          '%s %s',
          translator(this.channel),
          translator('Channel')
        )
      })
    );
    UtilLogger.success('ChannelLogInteraction callback ' + channel.id);
  }
}
