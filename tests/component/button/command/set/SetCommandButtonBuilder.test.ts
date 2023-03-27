import SetCommandButtonBuilder from '@component/button/command/set/SetCommandButtonBuilder'
import { ButtonBuilder, ButtonStyle } from 'discord.js'
import translator from '@util/UtilTranslator'
import { ESetCommand } from '@enum/command/ESetCommand'
import { describe, it, expect } from 'vitest'
import DefaultButtonRowBuilder from '@component/row-builder/DefaultButtonRowBuilder'
import { EGlobalButton } from '@enum/EGlobalButton'
import roleRequest from '@/api/RoleRequest'

describe('SetCommandButtonBuilder', () => {
  it('should return an array of button', async () => {
    const setCommandButtonBuilder = new SetCommandButtonBuilder()
    const button = await setCommandButtonBuilder.initializeButton()
    const roles = (await roleRequest.get())
    const checkRoleCreate = (roles.support != null) && (roles.member != null)

    expect(button).toEqual([
      new ButtonBuilder({
        label: translator('Roles'),
        style: ButtonStyle.Primary,
        customId: ESetCommand.ROLES
      }),
      new ButtonBuilder({
        label: translator('Verification'),
        style: ButtonStyle.Primary,
        customId: ESetCommand.VERIFICATION,
        disabled: !checkRoleCreate
      }),
      new ButtonBuilder({
        label: translator('Channels'),
        style: ButtonStyle.Primary,
        customId: ESetCommand.CHANNELS,
        disabled: !checkRoleCreate
      }),
      new ButtonBuilder({
        label: translator('Logs'),
        style: ButtonStyle.Secondary,
        customId: ESetCommand.LOGS,
        disabled: !checkRoleCreate
      })
    ])
  })

  it('should return an array of button', async () => {
    const setCommandButtonBuilder = new SetCommandButtonBuilder()
    const build = await setCommandButtonBuilder.buildButton()
    const roles = (await roleRequest.get())
    const checkRoleCreate = (roles.support != null) && (roles.member != null)

    const res: DefaultButtonRowBuilder[] = [
      new DefaultButtonRowBuilder().setComponents([
        new ButtonBuilder({
          label: translator('Roles'),
          style: ButtonStyle.Primary,
          customId: ESetCommand.ROLES
        }),
        new ButtonBuilder({
          label: translator('Verification'),
          style: ButtonStyle.Primary,
          customId: ESetCommand.VERIFICATION,
          disabled: !checkRoleCreate
        }),
        new ButtonBuilder({
          label: translator('Channels'),
          style: ButtonStyle.Primary,
          customId: ESetCommand.CHANNELS,
          disabled: !checkRoleCreate
        }),
        new ButtonBuilder({
          label: translator('Logs'),
          style: ButtonStyle.Secondary,
          customId: ESetCommand.LOGS,
          disabled: !checkRoleCreate
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
