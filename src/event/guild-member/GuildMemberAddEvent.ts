import AbstractEvent from '@abstract/AbstractEvent'
import { type GuildMember } from 'discord.js'
import { updateMemberCountRequest } from '@/api/ApiRequest'

/**
 * @class GuildMemberAddEvent
 * @description The guild member add event
 * @extends AbstractEvent
 */
export default class GuildMemberAddEvent extends AbstractEvent {
  /**
   * @method run
   * @description The run method
   * @returns {Promise<any>}
   * @async
   * @public
   * @param {GuildMember} member
   */
  public async run (member: GuildMember): Promise<any> {
    await updateMemberCountRequest(member.guild)
  }
}
