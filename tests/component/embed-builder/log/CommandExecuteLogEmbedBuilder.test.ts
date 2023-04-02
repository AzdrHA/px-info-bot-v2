import { describe, expect, it, vi } from 'vitest';
import DefaultEmbedBuilder from '@component/embed-builder/DefaultEmbedBuilder';
import translator from '@util/UtilTranslator';
import util from 'util';
import { CommandExecuteLogEmbedBuilder } from '@component/embed-builder/log/CommandExecuteLogEmbedBuilder';
import { bold } from 'discord.js';

describe('CommandExecuteLogEmbedBuilder', () => {
  it('should return an embed', async () => {
    const user = {
      username: 'test',
      discriminator: '0000',
      displayAvatarURL: vi.fn(),
      toString: vi.fn()
    } as any;
    const commandName = 'test';
    const embed = await CommandExecuteLogEmbedBuilder(commandName, user);

    expect(embed).toStrictEqual(
      new DefaultEmbedBuilder({
        color: embed.data.color,
        timestamp: embed.data.timestamp
      })
        .setAuthor({
          name: util.format('%s#%s', user.username, user.discriminator),
          iconURL: user.displayAvatarURL() ?? undefined
        })
        .setDescription(
          translator('{USER} has executed the {COMMAND} command', {
            COMMAND: bold(commandName),
            USER: user.toString()
          })
        )
    );
  });
});
