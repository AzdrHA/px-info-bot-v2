import { describe, it, expect } from 'vitest';
import { ButtonBuilder, ButtonStyle } from 'discord.js';
import translator from '@util/UtilTranslator';
import { EVerificationSetCommand } from '@enum/command/EVerificationSetCommand';
import MessageContentVerificationSetCommandButton from '@component/button/command/set-command/verification/MessageContentVerificationSetCommandButton';

describe('MessageContentVerificationSetCommandButton', () => {
  it('should return an array of button', async () => {
    const messageContentVerificationSetCommandButtonBuilder =
      new MessageContentVerificationSetCommandButton();
    const button =
      await messageContentVerificationSetCommandButtonBuilder.initializeButton();
    expect(button).toEqual([
      new ButtonBuilder({
        label: translator('Default Message Content'),
        style: ButtonStyle.Primary,
        customId: EVerificationSetCommand.DEFAULT_MESSAGE
      })
    ]);
  });
});
