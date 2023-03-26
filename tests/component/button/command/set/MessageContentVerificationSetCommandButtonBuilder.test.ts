import { describe, it, expect } from 'vitest'
import { ButtonBuilder, ButtonStyle } from 'discord.js'
import translator from '@util/UtilTranslator'
import MessageContentVerificationSetCommandButtonBuilder
  from '@component/button/command/set/MessageContentVerificationSetCommandButtonBuilder'
import { EVerificationButton } from '@enum/EVerificationButton'

describe('MessageContentVerificationSetCommandButtonBuilder', () => {
  it('should return an array of button', async () => {
    const messageContentVerificationSetCommandButtonBuilder = new MessageContentVerificationSetCommandButtonBuilder()
    const button = await messageContentVerificationSetCommandButtonBuilder.initializeButton()
    expect(button).toEqual([
      new ButtonBuilder({
        label: translator('Default Message Content'),
        style: ButtonStyle.Primary,
        customId: EVerificationButton.DEFAULT_MESSAGE
      })
    ])
  })
})
