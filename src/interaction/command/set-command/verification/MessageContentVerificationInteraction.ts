import AbstractInteraction from '@abstract/AbstractInteraction'
import { EVerificationSetCommand } from '@enum/command/EVerificationSetCommand'
import translator from '@util/UtilTranslator'
import UtilLogger from '@util/UtilLogger'
import VerificationSettingService from '@service/VerificationSettingService'
import MessageContentVerificationSetCommandButton
  from '@component/button/command/set-command/verification/MessageContentVerificationSetCommandButton'
/**
 * @class MessageContentVerificationInteraction
 * @extends AbstractInteraction
 */
export default class MessageContentVerificationInteraction extends AbstractInteraction {
  public global: boolean = false
  public id: string = EVerificationSetCommand.MESSAGE

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
      components: await new MessageContentVerificationSetCommandButton().buildButton()
    }), callback)
  }
}
