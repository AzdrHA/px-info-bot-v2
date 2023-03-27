import { ButtonBuilder, ButtonStyle } from 'discord.js'
import translator from '@util/UtilTranslator'
import { ESetCommand } from '@enum/command/ESetCommand'
import DefaultCanceledButtonBuilder from '@component/button-builder/DefaultCanceledButtonBuilder'
import roleRequest from '@/api/RoleRequest'

/**
 * @class SetCommandButtonBuilder
 * @extends DefaultButtonBuilder
 */
export default class SetCommandButtonBuilder extends DefaultCanceledButtonBuilder {
  public initializeButton = async (): Promise<ButtonBuilder[]> => {
    const roles = (await roleRequest.get())
    const checkRoleCreate = (roles.support != null) && (roles.member != null)

    return [
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
        label: translator('Logs'),
        style: ButtonStyle.Secondary,
        customId: ESetCommand.LOGS,
        disabled: !checkRoleCreate
      })
    ]
  }
}
