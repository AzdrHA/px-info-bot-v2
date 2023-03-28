import { describe, it, expect } from 'vitest'
import { ButtonBuilder, ButtonStyle } from 'discord.js'
import translator from '@util/UtilTranslator'
import { EVerificationSetCommand } from '@enum/command/EVerificationSetCommand'
import ContentButtonVerificationSetCommandButton
  from '@component/button/command/set-command/verification/ContentButtonVerificationSetCommandButton'

describe('ContentButtonVerificationSetCommandButton', () => {
  it('should return an array of button', async () => {
    const contentButtonVerificationSetCommandButtonBuilder = new ContentButtonVerificationSetCommandButton()
    const button = await contentButtonVerificationSetCommandButtonBuilder.initializeButton()
    expect(button).toEqual([
      new ButtonBuilder({
        label: translator('Default Content Button'),
        style: ButtonStyle.Primary,
        customId: EVerificationSetCommand.DEFAULT_BUTTON
      })
    ])
  })
})
