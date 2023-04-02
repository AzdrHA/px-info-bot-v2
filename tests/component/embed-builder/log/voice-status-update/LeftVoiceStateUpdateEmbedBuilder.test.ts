import { describe, expect, it } from 'vitest';
import DefaultEmbedBuilder from '@component/embed-builder/DefaultEmbedBuilder';
import { channelMention, Colors, userMention } from 'discord.js';
import util from 'util';
import { getNested } from '@util/UtilStr';
import translator from '@util/UtilTranslator';
import { LeftVoiceStateUpdateEmbedBuilder } from '@component/embed-builder/log/voice-status-update/LeftVoiceStateUpdateEmbedBuilder';

describe('LeftVoiceStateUpdateEmbedBuilder', () => {
  it('should return an embed', async () => {
    const newState = {} as any;
    const embed = await LeftVoiceStateUpdateEmbedBuilder(newState, newState);

    expect(embed).toStrictEqual(
      new DefaultEmbedBuilder({
        color: embed.data.color,
        timestamp: embed.data.timestamp
      })
        .setColor(Colors.Red)
        .setAuthor({
          name: util.format(
            '%s#%s',
            getNested('member.user.username', newState, 'Unknown'),
            getNested('member.user.discriminator', newState, 'Unknown')
          ),
          iconURL: newState.member?.displayAvatarURL() ?? undefined
        })
        .setDescription(
          translator('{USER} left voice channel {CHANNEL}', {
            USER: userMention(getNested('member.id', newState, 'Unknown')),
            CHANNEL: channelMention(getNested('channelId', newState, 'Unknown'))
          })
        )
        .setFooter({
          text: translator('User ID: {USER_ID}', {
            USER_ID: getNested('member.id', newState, 'Unknown')
          })
        })
    );
  });
});
