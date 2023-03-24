import AbstractInteraction from '@abstract/AbstractInteraction'
import { ESetCommandVerification } from '@enum/command/ESetCommandVerification'
import translator from '@util/UtilTranslator'

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
    const callback = (content: string): void => {
      console.log(content)
    }

    return await this.messageCollector(await this.send({
      content: translator('WRITE_A_MESSAGE')
    }), callback)
  }
}
