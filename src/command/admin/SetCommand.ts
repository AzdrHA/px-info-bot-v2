import AbstractCommand from '../../abstract/AbstractCommand'
import { type Message } from 'discord.js'
import { EPermission } from '../../enum/EPermission'

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
   * @returns {Promise<Message>}
   */
  public async run (): Promise<Message> {
    return await this.message.reply('Pong!')
  }
}
