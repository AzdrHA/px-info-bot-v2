import { ButtonBuilder, ButtonStyle } from 'discord.js'
import translator from '@util/UtilTranslator'
import VerificationSetCommandButtonBuilder from '@component/button/command/set/VerificationSetCommandButtonBuilder'
import { describe, it, expect } from 'vitest'
import { ESetCommandVerification } from '@enum/command/ESetCommandVerification'

describe('VerificationSetCommandButtonBuilder', () => {
  it('should return an array of button', async () => {
    const verificationSetCommandButtonBuilder = new VerificationSetCommandButtonBuilder()
    const button = await verificationSetCommandButtonBuilder.initializeButton()

    expect(button).toEqual([
      new ButtonBuilder({
        label: translator('Channel'),
        style: ButtonStyle.Primary,
        customId: ESetCommandVerification.CHANNEL
      }),
      new ButtonBuilder({
        label: translator('Button content'),
        style: ButtonStyle.Primary,
        customId: ESetCommandVerification.CONTENT_BUTTON
      }),
      new ButtonBuilder({
        label: translator('Message content'),
        style: ButtonStyle.Primary,
        customId: ESetCommandVerification.MESSAGE
      })
    ])
  })
})
