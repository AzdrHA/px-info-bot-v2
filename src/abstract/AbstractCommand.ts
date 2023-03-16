import type Client from '../Client'
import { type Message } from 'discord.js'

/**
 * @class AbstractCommand
 * @abstract
 */
export default abstract class AbstractCommand {
  public client: Client
  public message: Message
  public abstract alias: string[]
  public args: string[] = []

  /**
   * @constructor
   * @param {Client} client
   * @param {Message} message
   * @protected
   */
  public constructor (client: Client, message: Message) {
    this.client = client
    this.message = message
  }
  public abstract run (): Promise<Message>
}
