import AbstractRoleInterface from '@interaction/command/set-command/roles/AbstractRoleInterface'
import { type IRole } from '@interface/IRole'
import { ERoleSetCommand } from '@enum/command/ERoleSetCommand'

/**
 * @class AdminRoleInterface
 * @extends AbstractRoleInterface
 */
export default class AdminRoleInterface extends AbstractRoleInterface {
  public id: string = ERoleSetCommand.ADMIN
  public role: keyof IRole = 'administrator'
}
