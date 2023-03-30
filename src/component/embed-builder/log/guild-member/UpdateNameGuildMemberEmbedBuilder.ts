import { Colors, type GuildMember, userMention } from 'discord.js'
import DefaultEmbedBuilder from '@component/embed-builder/DefaultEmbedBuilder'
import util from 'util'
import translator from '@util/UtilTranslator'

/**
 * @function AddGuildMemberEmbedBuilder
 * @description The add guild member embed builder
 * @returns {DefaultEmbedBuilder}
 * @exports
 * @public
 * @async
 * @param {GuildMember} oldMember
 * @param {GuildMember} newMember
 * @constructor
 */
export const AddGuildMemberEmbedBuilder = async (oldMember: GuildMember, newMember: GuildMember): Promise<DefaultEmbedBuilder> => {
  return new DefaultEmbedBuilder()
    .setColor(Colors.Blue)
    .setAuthor({
      name: util.format(
        '%s#%s',
        newMember.user.username,
        newMember.user.discriminator
      ),
      iconURL: newMember.avatarURL() ?? undefined
    })
    .setDescription(
      translator('{MEMBER} nickname changed', {
        MEMBER: userMention(newMember.id)
      })
    )
    .setTimestamp(new Date())
    .setFields(
      {
        name: translator('Before'),
        value: oldMember.displayName,
        inline: false
      },
      {
        name: translator('After'),
        value: newMember.displayName,
        inline: false
      }
    )
    .setFooter({
      text: translator('User ID: {USER_ID}', {
        USER_ID: newMember.id
      })
    })
}
