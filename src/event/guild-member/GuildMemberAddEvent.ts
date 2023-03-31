import AbstractEvent from '@abstract/AbstractEvent'
import { type GuildMember } from 'discord.js'
import { updateMemberCountRequest } from '@/api/ApiRequest'
import { AddGuildMemberEmbedBuilder } from '@component/embed-builder/log/guild-member/AddGuildMemberEmbedBuilder'
import channelLogRequest from '@/api/ChannelLogRequest'

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
    await this.log({
      embed: AddGuildMemberEmbedBuilder(member),
      channel: (await channelLogRequest.get()).member
    })
  }
}
