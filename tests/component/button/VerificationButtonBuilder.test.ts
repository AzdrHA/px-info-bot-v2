import { ButtonBuilder, ButtonStyle } from 'discord.js'
import translator from '@util/UtilTranslator'
import VerificationButtonBuilder from '@component/button/VerificationButtonBuilder'
import { describe, it, expect } from 'vitest'
import { EGlobalButton } from '@enum/EGlobalButton'

describe('SetCommandButtonBuilder', () => {
  it('should return an array of button', async () => {
    const verificationButtonBuilder = new VerificationButtonBuilder()
    const button = await verificationButtonBuilder.initializeButton()

    expect(button).toEqual([
      new ButtonBuilder({
        label: translator('Verify'),
        style: ButtonStyle.Success,
        customId: EGlobalButton.VERIFY
      }),
      new ButtonBuilder({
        label: translator('Refuse'),
        style: ButtonStyle.Danger,
        customId: EGlobalButton.REFUSE
      })
    ])
  })
})
