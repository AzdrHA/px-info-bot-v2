import AbstractInteraction from '@abstract/AbstractInteraction'
import { ESetCommand } from '@enum/command/ESetCommand'
import translator from '@util/UtilTranslator'
import VerificationSetCommandButtonBuilder from '@component/button/command/set/VerificationSetCommandButtonBuilder'

/**
 * @class BaseVerificationInteraction
 * @extends AbstractInteraction
 */
export default class BaseVerificationInteraction extends AbstractInteraction {
  public global: boolean = false
  public id: string = ESetCommand.VERIFICATION

  /**
   * @public
   * @returns {Promise<any>}
   */
  public async run (): Promise<any> {
    return await this.buttonCollector(await this.send({
      content: translator('What **{TYPE}** settings would you like to change?', {
        TYPE: translator('Verification')
      }),
      components: await this.buildButtons(VerificationSetCommandButtonBuilder)
    }))
  }
}
