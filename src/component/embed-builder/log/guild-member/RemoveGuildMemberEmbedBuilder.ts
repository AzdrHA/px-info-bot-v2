import { Colors, type GuildMember } from 'discord.js'
import DefaultEmbedBuilder from '@component/embed-builder/DefaultEmbedBuilder'
import util from 'util'
import translator from '@util/UtilTranslator'

/**
 * @function RemoveGuildMemberEmbedBuilder
 * @description The remove guild member embed builder
 * @returns {DefaultEmbedBuilder}
 * @exports
 * @public
 * @async
 * @param {GuildMember} member
 */
export const RemoveGuildMemberEmbedBuilder = async (member: GuildMember): Promise<DefaultEmbedBuilder> => {
  return new DefaultEmbedBuilder().setColor(Colors.Orange)
    .setAuthor({
      name: translator('Member Left'),
      iconURL: member.displayAvatarURL() ?? undefined
    })
    .setDescription(
      util.format('%s %s', member.toString(), member.user.username)
    )
    .setThumbnail(member.displayAvatarURL())
    .setFooter({
      text: translator('User ID: {USER_ID}', {
        USER_ID: member.id
      })
    })
}
