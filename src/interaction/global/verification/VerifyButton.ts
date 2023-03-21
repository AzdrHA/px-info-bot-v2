import AbstractInteraction from '@abstract/AbstractInteraction'
import { EVerificationButton } from '@enum/EVerificationButton'
import { type BaseInteraction } from 'discord.js'

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
   * @returns {Promise<BaseInteraction>}
   */
  public async run (): Promise<BaseInteraction> {
    console.log('VerifyButton#run')
    return this.interaction
  }
}
