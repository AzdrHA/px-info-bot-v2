import SetCommandButtonBuilder from '@component/button/command/set/SetCommandButtonBuilder'
import { ButtonBuilder, ButtonStyle } from 'discord.js'
import translator from '@util/UtilTranslator'
import { ESetCommandButton } from '@enum/command/ESetCommandButton'
import { describe, it, expect } from 'vitest'
import DefaultButtonRowBuilder from '@component/row-builder/DefaultButtonRowBuilder'
import { EGlobalButton } from '@enum/EGlobalButton'

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

  it('should return an array of button', async () => {
    const setCommandButtonBuilder = new SetCommandButtonBuilder()
    const build = await setCommandButtonBuilder.buildButton()

    const res: DefaultButtonRowBuilder[] = [
      new DefaultButtonRowBuilder().setComponents([
        new ButtonBuilder({
          label: translator('Verification'),
          style: ButtonStyle.Primary,
          customId: ESetCommandButton.VERIFICATION
        }),
        new ButtonBuilder({
          label: translator('Cancel'),
          style: ButtonStyle.Danger,
          customId: EGlobalButton.CANCEL
        })
      ])
    ]

    expect(build).toEqual(res)
  })
})
