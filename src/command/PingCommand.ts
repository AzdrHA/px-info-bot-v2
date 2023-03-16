import AbstractCommand from '../abstract/AbstractCommand'
import { type Message } from 'discord.js'

/**
 * @class PingCommand
 * @extends AbstractCommand
 */
export default class PingCommand extends AbstractCommand {
  public alias: string[] = ['ping']
  /**
   * @public
   * @returns {Promise<Message>}
   */
  public async run (): Promise<Message> {
    return await this.message.reply('Pong!')
  }
}
