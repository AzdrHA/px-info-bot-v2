import type Client from '@/Client'
import { type ILogOptions } from '@interface/ILogOptions'
import AbstractAction from '@abstract/AbstractAction'
import { type Message } from 'discord.js'

/**
 * @class AbstractEvent
 */
export default abstract class AbstractEvent extends AbstractAction {
  public client: Client

  /**
   * @constructor
   * @param {Client} client
   * @protected
   */
  public constructor (client: Client) {
    super()
    this.client = client
  }

  public abstract run (...args: any[]): Promise<any>

  /**
   * @public
   * @param { Omit<ILogOptions, 'client'>} options
   * @returns {Promise<Message | false>}
   */
  public async log (options: Omit<ILogOptions, 'client'>): Promise<Message | false> {
    return await super.log(Object.assign(options, { client: this.client }))
  }
}
