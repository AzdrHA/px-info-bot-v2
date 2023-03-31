import AbstractAction from '@abstract/AbstractAction'
import type Client from '@/Client'
import { type Message, type MessageCreateOptions, type MessagePayload } from 'discord.js'
import { EPermission } from '@enum/EPermission'
import roleRequest from '@/api/RoleRequest'
import { type IRole } from '@interface/IRole'

/**
 * @class AbstractCommand
 * @abstract
 */
export default abstract class AbstractCommand extends AbstractAction {
  public message: Message
  public abstract alias: string[]
  public args: string[] = []
  public description: string = 'No description provided.'
  public usage: string = 'No usage provided.'
  public permission: EPermission = EPermission.ADMINISTRATOR

  /**
   * @constructor
   * @param {Client} client
   * @param {Message} message
   * @protected
   */
  public constructor (client: Client, message: Message) {
    super(client, message)
    this.message = message
  }
  public abstract run (): Promise<any>

  /**
   * @public
   * @returns {Promise<Message>}
   * @description Send a message to the channel
   * @param {string | MessagePayload | MessageCreateOptions} options
   * @returns {Promise<Message>}
   */
  public async send (options: string | MessagePayload | MessageCreateOptions): Promise<Message> {
    return await this.message.channel.send(options)
  }

  /**
   * @public
   * @returns {Promise<void>}
   * @description Delete the message if it is deletable
   */
  public async delete (): Promise<void> {
    if (this.message.deletable) await this.message.delete().catch(() => null)
  }

  /**
   * Check if the member has permission to run the command
   * @public
   * @returns {boolean}
   */
  public async hasPermission (): Promise<boolean | undefined> {
    if (this.permission === EPermission.MEMBER) return true
    const roles = await roleRequest.get()
    const resourcePermissionList: Record<keyof IRole, string[]> = {
      administrator: [roles.administrator],
      support: [roles.administrator, roles.support],
      member: [roles.administrator, roles.support, roles.member]
    }
    const resourcePermission = resourcePermissionList[this.permission]
    return this.message.member?.roles.cache.some(userRole => resourcePermission.includes(userRole.id))
  }
}
