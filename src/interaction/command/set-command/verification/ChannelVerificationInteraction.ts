import AbstractInteraction from '@abstract/AbstractInteraction'
import { ESetCommandVerification } from '@enum/command/ESetCommandVerification'
import translator from '@util/UtilTranslator'
import DefaultButtonRowBuilder from '@component/row-builder/DefaultButtonRowBuilder'
import CancelButton from '@component/button/CancelButton'
import UtilLogger from '@util/UtilLogger'
import { getIdFromChannelMention } from '@util/UtilRegex'
import { TextChannel } from 'discord.js'
import AppException from '@exception/AppException'
import VerificationSettingService from '@service/VerificationSettingService'

/**
 * @class ChannelVerificationInteraction
 * @extends AbstractInteraction
 */
export default class ChannelVerificationInteraction extends AbstractInteraction {
  public global: boolean = false
  public id: string = ESetCommandVerification.CHANNEL

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
      const verificationSettingService = new VerificationSettingService()
      await verificationSettingService.updateChannel(this.client, channel)
      await this.success(translator('The **{TYPE}** has been successfully updated', { TYPE: translator('Verification') }))
      UtilLogger.success('ChannelVerificationInteraction callback' + channel.id)
    }

    return await this.messageButtonCollector(await this.send({
      content: translator('Send the ID or mention the **{TYPE}** channel you want to use', { TYPE: translator('Verification') }),
      components: [new DefaultButtonRowBuilder().setComponents(new CancelButton())]
    }), callback)
  }
}
