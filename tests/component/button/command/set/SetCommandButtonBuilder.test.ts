import SetCommandButtonBuilder from '@component/button/command/set/SetCommandButtonBuilder'
import { ButtonBuilder, ButtonStyle } from 'discord.js'
import translator from '@util/UtilTranslator'
import { ESetCommandButton } from '@enum/command/ESetCommandButton'
import { describe, it, expect } from 'vitest'

describe('SetCommandButtonBuilder', () => {
  it('should return an array of button', async () => {
    const setCommandButtonBuilder = new SetCommandButtonBuilder()
    const button = await setCommandButtonBuilder.initializeButton()

    expect(button).toEqual([
      new ButtonBuilder({
        label: translator('Verification'),
        style: ButtonStyle.Primary,
        customId: ESetCommandButton.VERIFICATION
      })
    ])
  })
})
