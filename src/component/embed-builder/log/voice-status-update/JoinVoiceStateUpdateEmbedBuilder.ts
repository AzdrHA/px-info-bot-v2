import { channelMention, Colors, userMention, type VoiceState } from 'discord.js'
import DefaultEmbedBuilder from '@component/embed-builder/DefaultEmbedBuilder'
import util from 'util'
import translator from '@util/UtilTranslator'
import { getNested } from '@util/UtilStr'

/**
 * @constructor
 * @param oldState
 * @param newState
 */
export const JoinVoiceStateUpdateEmbedBuilder = async (oldState: VoiceState, newState: VoiceState): Promise<DefaultEmbedBuilder> => {
  return new DefaultEmbedBuilder()
    .setColor(Colors.Green)
    .setAuthor({
      name: util.format(
        '%s#%s',
        getNested('newState.member.user.username', newState, 'Unknown'),
        getNested('newState.member.user.discriminator', newState, 'Unknown')
      ),
      iconURL: getNested('newState.member.user.avatarURL', newState, undefined)
    })
    .setDescription(
      translator('{USER} joined voice channel {CHANNEL}', {
        USER: userMention(getNested('newState.member.id', newState, 'Unknown')),
        CHANNEL: channelMention(getNested('newState.channelId', newState, 'Unknown'))
      })
    )
    .setFooter({
      text: translator('User ID: {USER_ID}', {
        USER_ID: getNested('newState.member.id', newState, 'Unknown')
      })
    })
}
