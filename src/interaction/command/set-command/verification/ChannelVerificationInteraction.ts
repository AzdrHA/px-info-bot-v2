import AbstractInteraction from '@abstract/AbstractInteraction'
import { ESetCommandVerification } from '@enum/command/ESetCommandVerification'

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
    await this.send('hello world')
  }
}
