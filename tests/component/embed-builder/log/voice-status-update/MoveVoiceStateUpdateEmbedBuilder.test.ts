import { describe, expect, it } from 'vitest';
import { MoveVoiceStateUpdateEmbedBuilder } from '@component/embed-builder/log/voice-status-update/MoveVoiceStateUpdateEmbedBuilder';
import DefaultEmbedBuilder from '@component/embed-builder/DefaultEmbedBuilder';
import { channelMention, Colors, userMention } from 'discord.js';
import util from 'util';
import { getNested } from '@util/UtilStr';
import translator from '@util/UtilTranslator';

describe('MoveVoiceStateUpdateEmbedBuilder', () => {
  it('should return an embed', async () => {
    const newState = {} as any;
    const embed = await MoveVoiceStateUpdateEmbedBuilder(newState, newState);

    expect(embed).toStrictEqual(
      new DefaultEmbedBuilder({
        color: embed.data.color,
        timestamp: embed.data.timestamp
      })
        .setColor(Colors.Orange)
        .setAuthor({
          name: util.format(
            '%s#%s',
            getNested('member.user.username', newState, translator('Unknown')),
            getNested(
              'member.user.discriminator',
              newState,
              translator('Unknown')
            )
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
        })
    );
  });
});
