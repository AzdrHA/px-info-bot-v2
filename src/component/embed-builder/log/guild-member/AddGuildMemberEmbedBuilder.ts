import { Colors, type GuildMember } from 'discord.js';
import DefaultEmbedBuilder from '@component/embed-builder/DefaultEmbedBuilder';
import util from 'util';
import translator from '@util/UtilTranslator';

/**
 * @function AddGuildMemberEmbedBuilder
 * @description The add guild member embed builder
 * @returns {DefaultEmbedBuilder}
 * @exports
 * @public
 * @async
 * @param {GuildMember} member
 */
export const AddGuildMemberEmbedBuilder = async (
  member: GuildMember
): Promise<DefaultEmbedBuilder> => {
  return (
    new DefaultEmbedBuilder()
      .setColor(Colors.Green)
      .setAuthor({
        name: translator('Member Joined'),
        iconURL: member.displayAvatarURL() ?? undefined
      })
      .setDescription(
        util.format('%s %s', member.toString(), member.user.username)
      )
      .setThumbnail(member.displayAvatarURL())
      // TODO ADD ACCOUNT AGE
      .setFooter({
        text: translator('User ID: {USER_ID}', {
          USER_ID: member.id
        })
      })
  );
};
