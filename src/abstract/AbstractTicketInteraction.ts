import AbstractInteraction from '@abstract/AbstractInteraction'
import translator from '@util/UtilTranslator'
import DefaultButtonRowBuilder from '@component/row-builder/DefaultButtonRowBuilder'
import CancelButton from '@component/button/CancelButton'
import { type ChannelType, TextChannel } from 'discord.js'
import UtilLogger from '@util/UtilLogger'
import { type ITicketSetting } from '@interface/ITicketSetting'
import { getIdFromChannelMention } from '@util/UtilRegex'
import AppException from '@exception/AppException'
import channelRequest from '@/api/ChannelRequest'
import util from 'util'

/**
 * @abstract
 * @class AbstractTicketInteraction
 * @extends AbstractInteraction
 */
export default abstract class AbstractTicketInteraction extends AbstractInteraction {
  public abstract ticket: keyof Pick<ITicketSetting, 'archivedCategory' | 'category' | 'channel'>
  public global: boolean = false
  public abstract type: ChannelType

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
      if (channel == null || channel.type !== this.type) throw new AppException('The value entered is invalid')

      // await channelRequest.update(this.channel, channel.id)
      // await this.success(translator('The **{TYPE}** has been successfully updated', { TYPE: util.format('%s %s', translator(this.channel), translator('Channel')) }))
      // UtilLogger.success('ChannelLogInteraction callback ' + channel.id)

      UtilLogger.success(this.ticket)
      UtilLogger.success(this.type.toString())
      UtilLogger.success('TicketInteraction callback ' + content)
    }

    return await this.messageButtonCollector(await this.send({
      content: translator('Send the ID or mention the **{TYPE}** role you want to use', {
        TYPE: translator(this.ticket)
      }),
      components: [new DefaultButtonRowBuilder().setComponents(new CancelButton())]
    }), callback)
  }
}
