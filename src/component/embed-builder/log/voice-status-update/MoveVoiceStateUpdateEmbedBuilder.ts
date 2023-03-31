import {
  channelMention,
  Colors,
  userMention,
  type VoiceState
} from 'discord.js';
import DefaultEmbedBuilder from '@component/embed-builder/DefaultEmbedBuilder';
import util from 'util';
import translator from '@util/UtilTranslator';
import { getNested } from '@util/UtilStr';

/**
 * @constructor
 * @param oldState
 * @param newState
 */
export const MoveVoiceStateUpdateEmbedBuilder = async (
  oldState: VoiceState,
  newState: VoiceState
): Promise<DefaultEmbedBuilder> => {
  return new DefaultEmbedBuilder()
    .setColor(Colors.Orange)
    .setAuthor({
      name: util.format(
        '%s#%s',
        getNested('member.user.username', newState, translator('Unknown')),
        getNested('member.user.discriminator', newState, translator('Unknown'))
      ),
      iconURL: newState.member?.displayAvatarURL() ?? undefined
    })
    .setDescription(
      translator('{USER} moved channel', {
        USER: userMention(
          getNested('member.id', newState, translator('Unknown'))
        )
      })
    )
    .setFields(
      {
        name: translator('Before'),
        value: channelMention(
          getNested('channelId', newState, translator('Unknown'))
        )
      },
      {
        name: translator('After'),
        value: channelMention(
          getNested('channelId', newState, translator('Unknown'))
        )
      }
    )
    .setFooter({
      text: translator('User ID: {USER_ID}', {
        USER_ID: getNested('member.id', newState, translator('Unknown'))
      })
    });
};
