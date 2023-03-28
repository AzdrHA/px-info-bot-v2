import { ETicketSetCommand } from '@enum/command/ETicketSetCommand'
import { getIdFromChannelMention } from '@util/UtilRegex'
import AppException from '@exception/AppException'
import translator from '@util/UtilTranslator'
import UtilLogger from '@util/UtilLogger'
import DefaultButtonRowBuilder from '@component/row-builder/DefaultButtonRowBuilder'
import CancelButton from '@component/button/CancelButton'
import AbstractInteraction from '@abstract/AbstractInteraction'
import { TextChannel } from 'discord.js'
import TicketSettingService from '@service/TicketSettingService'

/**
 * @class ChannelTicketInteraction
 * @extends AbstractRoleInteraction
 */
export default class ChannelTicketInteraction extends AbstractInteraction {
  public id: string = ETicketSetCommand.CHANNEL
  public global: boolean = false

  /**
   * @public
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

      const ticketSettingService = new TicketSettingService()
      await ticketSettingService.updateChannel(this.client, channel)

      await this.success(translator('The **{TYPE}** has been successfully updated', { TYPE: translator('Channel') }))
      UtilLogger.success('ChannelTicketInteraction callback' + channel.id)
    }

    return await this.messageButtonCollector(await this.send({
      content: translator('Send the ID or mention the **{TYPE}** you want to use', { TYPE: translator('Channel') }),
      components: [new DefaultButtonRowBuilder().setComponents(new CancelButton())]
    }), callback)
  }
}
