import AbstractInteraction from '@abstract/AbstractInteraction'
import { ESetCommandVerification } from '@enum/command/ESetCommandVerification'
import translator from '@util/UtilTranslator'
import UtilLogger from '@util/UtilLogger'
import VerificationSettingService from '@service/VerificationSettingService'
import MessageContentVerificationSetCommandButtonBuilder
  from '@component/button/command/set/MessageContentVerificationSetCommandButtonBuilder'

/**
 * @class MessageContentVerificationInteraction
 * @extends AbstractInteraction
 */
export default class MessageContentVerificationInteraction extends AbstractInteraction {
  public global: boolean = false
  public id: string = ESetCommandVerification.MESSAGE

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
      const verificationSettingService = new VerificationSettingService()
      await verificationSettingService.updateMessageContent(this.client, content)
      await this.success(translator('The **{TYPE}** has been successfully updated', { TYPE: translator('Message Content') }))
      UtilLogger.success('ChannelVerificationInteraction callback' + content)
    }

    return await this.messageButtonCollector(await this.send({
      content: translator('Send the new content of the verification **{TYPE}**', { TYPE: translator('Message Content') }),
      components: await new MessageContentVerificationSetCommandButtonBuilder().buildButton()
    }), callback)
  }
}