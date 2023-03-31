import AbstractEvent from '@abstract/AbstractEvent'
import { type ButtonInteraction, type GuildMember, type Message } from 'discord.js'
import { updateMemberCountRequest } from '@/api/ApiRequest'
import { AddGuildMemberEmbedBuilder } from '@component/embed-builder/log/guild-member/AddGuildMemberEmbedBuilder'
import channelLogRequest from '@/api/ChannelLogRequest'
import GuildMemberService from '@service/GuildMemberService'
import type Client from '@/Client'

/**
 * @class GuildMemberAddEvent
 * @description The guild member add event
 * @extends AbstractEvent
 */
export default class GuildMemberAddEvent extends AbstractEvent {
  /**
   * @constructor
   * @description The constructor of the guild member add event
   * @param client
   * @param interaction
   * @param guildMemberService
   */
  public constructor (client: Client, interaction: ButtonInteraction | Message, private readonly guildMemberService = new GuildMemberService()) {
    super(client, interaction)
  }

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
    await this.guildMemberService.checkAntiHoist(member, true).catch(() => {})
    await this.log({
      embed: AddGuildMemberEmbedBuilder(member),
      channel: (await channelLogRequest.get()).member
    })
  }
}
