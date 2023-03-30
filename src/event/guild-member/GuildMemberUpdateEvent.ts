import AbstractEvent from '@abstract/AbstractEvent'
import { type GuildMember } from 'discord.js'
import roleRequest from '@/api/RoleRequest'
import channelLogRequest from '@/api/ChannelLogRequest'
import {
  UpdateMemberRoleGuildMemberEmbedBuilder
} from '@component/embed-builder/log/guild-member/UpdateMemberRoleGuildMemberEmbedBuilder'

/**
 * @class GuildMemberUpdateEvent
 * @description The guild member update event
 * @extends {AbstractEvent}
 */
export default class GuildMemberUpdateEvent extends AbstractEvent {
  /**
   * @constructor
   * @description The constructor of the guild member update event
   * @param {GuildMember} oldMember
   * @param {GuildMember} newMember
   */
  public async run (oldMember: GuildMember, newMember: GuildMember): Promise<any> {
    const memberRole = await roleRequest.getMemberRoles()

    if (!oldMember.roles.cache.has(memberRole) && newMember.roles.cache.has(memberRole)) {
      return await this.log({
        channel: (await channelLogRequest.get()).member,
        embed: UpdateMemberRoleGuildMemberEmbedBuilder(oldMember, newMember, memberRole)
      })
    }

    // TODO ADD RENAME EVENT
  }
}
