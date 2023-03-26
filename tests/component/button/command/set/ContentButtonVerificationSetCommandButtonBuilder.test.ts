import { describe, it, expect } from 'vitest'
import { ButtonBuilder, ButtonStyle } from 'discord.js'
import translator from '@util/UtilTranslator'
import { EVerificationButton } from '@enum/EVerificationButton'
import ContentButtonVerificationSetCommandButtonBuilder
  from '@component/button/command/set/ContentButtonVerificationSetCommandButtonBuilder'

describe('ContentButtonVerificationSetCommandButtonBuilder', () => {
  it('should return an array of button', async () => {
    const contentButtonVerificationSetCommandButtonBuilder = new ContentButtonVerificationSetCommandButtonBuilder()
    const button = await contentButtonVerificationSetCommandButtonBuilder.initializeButton()
    expect(button).toEqual([
      new ButtonBuilder({
        label: translator('Default Content Button'),
        style: ButtonStyle.Primary,
        customId: EVerificationButton.DEFAULT_BUTTON
      })
    ])
  })
})
