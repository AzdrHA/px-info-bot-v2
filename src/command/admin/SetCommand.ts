import { type Message } from 'discord.js'
import AbstractCommand from '@abstract/AbstractCommand'
import translator from '@util/UtilTranslator'
import SetCommandButtonBuilder from '@component/button/command/set/SetCommandButtonBuilder'

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

    return await this.buttonCollector(await this.send({
      content: translator('What **Settings** would you like to change?'),
      components: await this.buildButtons(SetCommandButtonBuilder)
    }))
  }
}
