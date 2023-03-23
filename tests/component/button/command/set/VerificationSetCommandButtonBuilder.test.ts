import { ButtonBuilder, ButtonStyle } from 'discord.js'
import translator from '@util/UtilTranslator'
import VerificationSetCommandButtonBuilder from '@component/button/command/set/VerificationSetCommandButtonBuilder'
import { describe, it, expect } from 'vitest'

describe('VerificationSetCommandButtonBuilder', () => {
  it('should return an array of button', async () => {
    const verificationSetCommandButtonBuilder = new VerificationSetCommandButtonBuilder()
    const button = await verificationSetCommandButtonBuilder.initializeButton()

    expect(button).toEqual([
      new ButtonBuilder({
        label: translator('HELLO'),
        style: ButtonStyle.Success,
        customId: 'HELLO'
      })
    ])
  })
})
