import AbstractCommand from '@abstract/AbstractCommand'
import translator from '@util/UtilTranslator'
import SetCommandButtonBuilder from '@component/button/command/set/SetCommandButtonBuilder'
import { EPermission } from '@enum/EPermission'
import type ButtonCollector from '@collector/ButtonCollector'

/**
 * @class SetCommand
 * @extends AbstractCommand
 */
export default class SetCommand extends AbstractCommand {
  public alias: string[] = ['set']
  public description: string = 'Set a value for a key'
  public usage: string = 'set <key> <value>'
  public permission: EPermission = EPermission.ADMINISTRATOR

  /**
   * @public
   * @returns {Promise<void>}
   */
  public async run (): Promise<ButtonCollector> {
    await this.delete()

    return await this.buttonCollector(await this.send({
      content: translator('What **Settings** would you like to change?'),
      components: await this.buildButtons(SetCommandButtonBuilder)
    }))
  }
}
