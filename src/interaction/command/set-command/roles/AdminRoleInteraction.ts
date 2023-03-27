import AbstractRoleInteraction from '@interaction/command/set-command/roles/AbstractRoleInteraction'
import { type IRole } from '@interface/IRole'
import { ERoleSetCommand } from '@enum/command/ERoleSetCommand'

/**
 * @class AdminRoleInteraction
 * @extends AbstractRoleInteraction
 */
export default class AdminRoleInteraction extends AbstractRoleInteraction {
  public id: string = ERoleSetCommand.ADMIN
  public role: keyof IRole = 'administrator'
}
