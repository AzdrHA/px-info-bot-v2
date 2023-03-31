import { type GuildMember, roleMention, userMention } from 'discord.js';
import DefaultEmbedBuilder from '@component/embed-builder/DefaultEmbedBuilder';
import translator from '@util/UtilTranslator';

/**
 * @function AddGuildMemberEmbedBuilder
 * @description The add guild member embed builder
 * @returns {DefaultEmbedBuilder}
 * @exports
 * @public
 * @async
 * @param {GuildMember} oldMember
 * @param {GuildMember} newMember
 * @param {string} memberRole
 * @constructor
 */
export const UpdateMemberRoleGuildMemberEmbedBuilder = async (
  oldMember: GuildMember,
  newMember: GuildMember,
  memberRole: string
): Promise<DefaultEmbedBuilder> => {
  return new DefaultEmbedBuilder().setDescription(
    translator('Role {ROLE} was juste added to {MEMBER}', {
      MEMBER: userMention(newMember.id),
      ROLE: roleMention(memberRole)
    })
  );
};
