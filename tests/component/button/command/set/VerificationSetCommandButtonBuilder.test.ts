import { ButtonBuilder, ButtonStyle } from 'discord.js'
import translator from '@util/UtilTranslator'
import VerificationSetCommandButtonBuilder from '@component/button/command/set/VerificationSetCommandButtonBuilder'
import { describe, it, expect } from 'vitest'
import { EVerificationSetCommand } from '@enum/command/EVerificationSetCommand'

describe('VerificationSetCommandButtonBuilder', () => {
  it('should return an array of button', async () => {
    const verificationSetCommandButtonBuilder = new VerificationSetCommandButtonBuilder()
    const button = await verificationSetCommandButtonBuilder.initializeButton()

    expect(button).toEqual([
      new ButtonBuilder({
        label: translator('Channel'),
        style: ButtonStyle.Primary,
        customId: EVerificationSetCommand.CHANNEL
      }),
      new ButtonBuilder({
        label: translator('Button content'),
        style: ButtonStyle.Primary,
        customId: EVerificationSetCommand.CONTENT_BUTTON
      }),
      new ButtonBuilder({
        label: translator('Message content'),
        style: ButtonStyle.Primary,
        customId: EVerificationSetCommand.MESSAGE
      })
    ])
  })
})
