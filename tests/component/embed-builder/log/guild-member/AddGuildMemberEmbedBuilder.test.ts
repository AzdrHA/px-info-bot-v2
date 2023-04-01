import { describe, expect, it, vi } from 'vitest';
import DefaultEmbedBuilder from '@component/embed-builder/DefaultEmbedBuilder';
import translator from '@util/UtilTranslator';
import util from 'util';
import { AddGuildMemberEmbedBuilder } from '@component/embed-builder/log/guild-member/AddGuildMemberEmbedBuilder';

describe('AddGuildMemberEmbedBuilder.test', () => {
  it('should return an embed', async () => {
    const member = {
      displayAvatarURL: vi.fn(),
      user: {
        username: 'test'
      }
    } as any;
    const embed = await AddGuildMemberEmbedBuilder(member);

    expect(embed).toStrictEqual(
      new DefaultEmbedBuilder({
        color: embed.data.color,
        timestamp: embed.data.timestamp
      })
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
  });
});
