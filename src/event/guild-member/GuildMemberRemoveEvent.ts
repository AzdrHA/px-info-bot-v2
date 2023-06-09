import AbstractEvent from '@abstract/AbstractEvent';
import { type GuildMember } from 'discord.js';
import { updateMemberCountRequest } from '@/api/ApiRequest';
import { RemoveGuildMemberEmbedBuilder } from '@component/embed-builder/log/guild-member/RemoveGuildMemberEmbedBuilder';
import channelLogRequest from '@/api/ChannelLogRequest';

/**
 * @class GuildMemberRemoveEvent
 * @description The guild member remove event
 * @extends AbstractEvent
 */
export default class GuildMemberRemoveEvent extends AbstractEvent {
  /**
   * @method run
   * @description The run method
   * @returns {Promise<any>}
   * @async
   * @public
   * @param {GuildMember} member
   */
  public async run(member: GuildMember): Promise<any> {
    await updateMemberCountRequest(member.guild);
    await this.log({
      embed: RemoveGuildMemberEmbedBuilder(member),
      channel: (await channelLogRequest.get()).member
    });
  }
}
