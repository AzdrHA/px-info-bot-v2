import type Client from '../Client'
import { type Message } from 'discord.js'
import roleRequest from '../api/RoleRequest'
import { EPermission } from '../enum/EPermission'
import { type IRole } from '../interface/IRole'

/**
 * @class AbstractCommand
 * @abstract
 */
export default abstract class AbstractCommand {
  public client: Client
  public message: Message
  public abstract alias: string[]
  public args: string[] = []
  public description: string = 'No description provided.'
  public usage: string = 'No usage provided.'
  public permission: EPermission = EPermission.MEMBER

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
