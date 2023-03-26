import AbstractInteraction from '@abstract/AbstractInteraction'
import { EVerificationSetCommand } from '@enum/command/EVerificationSetCommand'
import translator from '@util/UtilTranslator'
import UtilLogger from '@util/UtilLogger'
import VerificationSettingService from '@service/VerificationSettingService'
import ContentButtonVerificationSetCommandButtonBuilder
  from '@component/button/command/set/ContentButtonVerificationSetCommandButtonBuilder'

/**
 * @class ContentButtonVerificationInteraction
 * @extends AbstractInteraction
 */
export default class ContentButtonVerificationInteraction extends AbstractInteraction {
  public global: boolean = false
  public id: string = EVerificationSetCommand.CONTENT_BUTTON

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
      await verificationSettingService.updateContentButton(this.client, content)
      await this.success(translator('The **{TYPE}** has been successfully updated', { TYPE: translator('Content Button') }))
      UtilLogger.success('ContentButtonVerificationInteraction callback ' + content)
    }

    return await this.messageButtonCollector(await this.send({
      content: translator('Send the new content of the verification **{TYPE}**', { TYPE: translator('Content Button') }),
      components: await new ContentButtonVerificationSetCommandButtonBuilder().buildButton()
    }), callback)
  }
}
