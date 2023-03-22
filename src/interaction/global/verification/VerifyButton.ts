import AbstractInteraction from '@abstract/AbstractInteraction'
import { EVerificationButton } from '@enum/EVerificationButton'

/**
 * @class VerifyButton
 * @description The verify button
 * @extends AbstractInteraction
 */
export default class VerifyButton extends AbstractInteraction {
  public id: string = EVerificationButton.VERIFY
  public global: boolean = false

  /**
   * @method run
   * @description The run method
   * @returns {Promise<any>}
   */
  public async run (): Promise<any> {
    console.log('VerifyButton#run')
  }
}
