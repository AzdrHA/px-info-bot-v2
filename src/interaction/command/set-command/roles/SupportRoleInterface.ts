import AbstractRoleInterface from '@interaction/command/set-command/roles/AbstractRoleInterface'
import { type IRole } from '@interface/IRole'
import { ERoleSetCommand } from '@enum/command/ERoleSetCommand'

/**
 * @class SupportRoleInterface
 * @extends AbstractRoleInterface
 */
export default class SupportRoleInterface extends AbstractRoleInterface {
  public id: string = ERoleSetCommand.SUPPORT
  public role: keyof IRole = 'support'
}
