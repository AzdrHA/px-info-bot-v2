import { ButtonBuilder, ButtonStyle } from 'discord.js';
import translator from '@util/UtilTranslator';
import { describe, it, expect } from 'vitest';
import { ETicketSetCommand } from '@enum/command/ETicketSetCommand';
import ContentButtonTicketSetCommandButton from '@component/button/command/set-command/ticket/ContentButtonTicketSetCommandButton';

describe('ContentButtonTicketSetCommandButton', () => {
  it('should return an array of button', async () => {
    expect(
      await new ContentButtonTicketSetCommandButton().initializeButton()
    ).toEqual([
      new ButtonBuilder({
        label: translator('Default Content Button'),
        style: ButtonStyle.Primary,
        customId: ETicketSetCommand.DEFAULT_CONTENT_BUTTON
      })
    ]);
  });
});
