import { ButtonBuilder, ButtonStyle } from 'discord.js';
import translator from '@util/UtilTranslator';
import { describe, it, expect } from 'vitest';
import { ELogSetCommand } from '@enum/command/ELogSetCommand';
import LogSetCommandButton from '@component/button/command/set-command/LogSetCommandButton';

describe('LogSetCommandButton', () => {
  it('should return an array of button', async () => {
    expect(await new LogSetCommandButton().initializeButton()).toEqual([
      new ButtonBuilder({
        label: translator('Member Role'),
        style: ButtonStyle.Primary,
        customId: ELogSetCommand.MEMBER_ROLE
      }),
      new ButtonBuilder({
        label: translator('Ticket'),
        style: ButtonStyle.Primary,
        customId: ELogSetCommand.TICKET
      }),
      new ButtonBuilder({
        label: translator('Message'),
        style: ButtonStyle.Primary,
        customId: ELogSetCommand.MESSAGE
      }),
      new ButtonBuilder({
        label: translator('Member'),
        style: ButtonStyle.Primary,
        customId: ELogSetCommand.MEMBER
      }),
      new ButtonBuilder({
        label: translator('Name'),
        style: ButtonStyle.Primary,
        customId: ELogSetCommand.NAME
      }),
      new ButtonBuilder({
        label: translator('Voice Chat'),
        style: ButtonStyle.Primary,
        customId: ELogSetCommand.VOICE_CHAT
      }),
      new ButtonBuilder({
        label: translator('Invite'),
        style: ButtonStyle.Primary,
        customId: ELogSetCommand.INVITE
      }),
      new ButtonBuilder({
        label: translator('Command'),
        style: ButtonStyle.Primary,
        customId: ELogSetCommand.COMMAND
      })
    ]);
  });
});
