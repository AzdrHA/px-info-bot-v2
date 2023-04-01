import { ButtonBuilder, ButtonStyle } from 'discord.js';
import translator from '@util/UtilTranslator';
import { describe, it, expect } from 'vitest';
import { ETicketSetCommand } from '@enum/command/ETicketSetCommand';
import MessageContentTicketSetCommandButton from '@component/button/command/set-command/ticket/MessageContentTicketSetCommandButton';

describe('MessageContentSetCommandButton', () => {
  it('should return an array of button', async () => {
    expect(
      await new MessageContentTicketSetCommandButton().initializeButton()
    ).toEqual([
      new ButtonBuilder({
        label: translator('Default Message Content'),
        style: ButtonStyle.Primary,
        customId: ETicketSetCommand.DEFAULT_CONTENT_MESSAGE
      })
    ]);
  });
});
