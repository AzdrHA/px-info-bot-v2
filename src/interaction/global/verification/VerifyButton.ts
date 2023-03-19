import AbstractInteraction from '../../../abstract/AbstractInteraction'
import { EVerificationButton } from '../../../enum/EVerificationButton'

/**
 * @class VerifyButton
 * @description The verify button
 * @extends AbstractInteraction
 */
export default class VerifyButton extends AbstractInteraction {
  public id: string = EVerificationButton.VERIFY

  /**
   * @method run
   * @description The run method
   * @returns {Promise<void>}
   */
  public async run (): Promise<void> {
    console.log('VerifyButton#run')
  }
}
