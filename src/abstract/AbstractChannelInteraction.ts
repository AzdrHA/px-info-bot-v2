import AbstractInteraction from '@abstract/AbstractInteraction';
import translator from '@util/UtilTranslator';
import DefaultButtonRowBuilder from '@component/row-builder/DefaultButtonRowBuilder';
import CancelButton from '@component/button/CancelButton';
import { getIdFromChannelMention } from '@util/UtilRegex';
import { TextChannel } from 'discord.js';
import AppException from '@exception/AppException';
import UtilLogger from '@util/UtilLogger';
import { type IChannels } from '@interface/IChannels';
import channelRequest from '@/api/ChannelRequest';
import { type EChannelSetCommand } from '@enum/command/EChannelSetCommand';
import util from 'util';

/**
 * @abstract
 * @class AbstractChannelInteraction
 * @extends AbstractInteraction
 */
export default abstract class AbstractChannelInteraction extends AbstractInteraction {
  public abstract channel: keyof IChannels;
  public global: boolean = false;
  public abstract id: EChannelSetCommand;

  /**
   * @method run
   * @description The run method
   * @returns {Promise<any>}
   */
  public async run(): Promise<any> {
    /**
     * @param {string} content
     * @returns {void}
     */
    const callback = async (content: string): Promise<void> => {
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
    };

    return await this.messageButtonCollector(
      await this.send({
        content: translator(
          'Send the ID or mention the **{TYPE}** channel you want to use',
          {
            TYPE: translator(this.channel)
          }
        ),
        components: [
          new DefaultButtonRowBuilder().setComponents(new CancelButton())
        ]
      }),
      callback
    );
  }
}
