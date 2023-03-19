import AbstractCommand from '../../abstract/AbstractCommand'
import translator from '../../util/UtilTranslator'
import { type Message } from 'discord.js'
import VerificationButtonBuilder from '../../component/button-builder/verfication/VerificationButtonBuilder'

/**
 * @class SetCommand
 * @extends AbstractCommand
 */
export default class SetCommand extends AbstractCommand {
  public alias: string[] = ['set']

  /**
   * @public
   * @returns {Promise<void>}
   */
  public async run (): Promise<Message> {
    await this.delete()

    const message = await this.send({
      content: translator('What **Settings** would you like to change?'),
      components: [await new VerificationButtonBuilder().buildButton()]
    })

    return await this.buttonCollector(message)
  }
}
