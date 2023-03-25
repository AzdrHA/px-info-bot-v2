import AbstractCommand from '@abstract/AbstractCommand'
import translator from '@util/UtilTranslator'
import { EPermission } from '@enum/EPermission'
import { type MessageButtonCollector } from '@collector/MessageButtonCollector'
import VerificationSetCommandButtonBuilder from '@component/button/command/set/VerificationSetCommandButtonBuilder'

/**
 * @class SetCommand
 * @extends AbstractCommand
 */
export default class TestSetCommand extends AbstractCommand {
  public alias: string[] = ['setset']
  public description: string = 'Set a value for a key'
  public usage: string = 'set <key> <value>'
  public permission: EPermission = EPermission.ADMINISTRATOR

  /**
   * @public
   * @returns {Promise<void>}
   */
  public async run (): Promise<MessageButtonCollector> {
    await this.delete()

    /**
     * @param {string} content
     * @returns {void}
     */
    const callback = async (content: string): Promise<void> => {
      console.log(content)
      void this.success(content)
    }

    return await this.messageButtonCollector(await this.send({
      content: translator('WRITE_A_MESSAGE'),
      components: await this.buildButtons(VerificationSetCommandButtonBuilder)
    }), callback)
  }
}
