import AbstractRoleInteraction from '@interaction/command/set-command/roles/AbstractRoleInteraction'
import { type IRole } from '@interface/IRole'
import { ERoleSetCommand } from '@enum/command/ERoleSetCommand'

/**
 * @class SupportRoleInteraction
 * @extends AbstractRoleInteraction
 */
export default class SupportRoleInteraction extends AbstractRoleInteraction {
  public id: string = ERoleSetCommand.SUPPORT
  public role: keyof IRole = 'support'
}
