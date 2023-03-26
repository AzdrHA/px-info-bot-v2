import { type APIButtonComponent, type ButtonComponentData, ButtonStyle, ComponentType } from 'discord.js'
import { describe, it, expect } from 'vitest'
import CancelButton from '@component/button/CancelButton'
import { EGlobalButton } from '@enum/EGlobalButton'
import translator from '@util/UtilTranslator'

describe('CancelButtonBuilder', () => {
  it('should return an array of button', async () => {
    const button: Partial<ButtonComponentData> | Partial<APIButtonComponent> = {
      custom_id: EGlobalButton.CANCEL,
      label: translator('Cancel'),
      style: ButtonStyle.Danger,
      type: ComponentType.Button,
      emoji: undefined
    }
    expect(new CancelButton().data).toStrictEqual(button)
  })
})
