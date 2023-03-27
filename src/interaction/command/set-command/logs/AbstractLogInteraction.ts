import AbstractInteraction from '@abstract/AbstractInteraction'
import translator from '@util/UtilTranslator'
import DefaultButtonRowBuilder from '@component/row-builder/DefaultButtonRowBuilder'
import CancelButton from '@component/button/CancelButton'
import { type IChannelLog } from '@interface/IChannelLog'
import { type ELogSetCommand } from '@enum/command/ELogSetCommand'
import { getIdFromChannelMention } from '@util/UtilRegex'
import { TextChannel } from 'discord.js'
import AppException from '@exception/AppException'
import UtilLogger from '@util/UtilLogger'
import channelLogRequest from '@/api/ChannelLogRequest'

/**
 * @abstract
 * @class AbstractLogInteraction
 * @extends AbstractInteraction
 */
export default abstract class AbstractLogInteraction extends AbstractInteraction {
  public abstract channel: keyof IChannelLog
  public global: boolean = false
  public abstract id: ELogSetCommand

  /**
   * @method run
   * @description The run method
   * @returns {Promise<any>}
   */
  public async run (): Promise<any> {
    /**
     * @param {string} content
     * @returns {void}
     */
    const callback = async (content: string): Promise<void> => {
      const channel = (this.interaction.guild != null) ? this.interaction.guild.channels.cache.get(getIdFromChannelMention(content)) : null
      if (channel == null || !(channel instanceof TextChannel)) throw new AppException('The value entered is invalid')

      await channelLogRequest.update(this.channel, channel.id)
      await this.success(translator('The **{TYPE}** has been successfully updated', { TYPE: translator('Channel Log') }))
      UtilLogger.success('ChannelLogInteraction callback' + channel.id)
    }

    return await this.messageButtonCollector(await this.send({
      content: translator('Send the ID or mention the **{TYPE}** log channel you want to use', {
        TYPE: translator(this.channel)
      }),
      components: [new DefaultButtonRowBuilder().setComponents(new CancelButton())]
    }), callback)
  }
}
