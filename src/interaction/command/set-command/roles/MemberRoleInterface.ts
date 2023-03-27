import AbstractRoleInterface from '@interaction/command/set-command/roles/AbstractRoleInterface'
import { type IRole } from '@interface/IRole'
import { ERoleSetCommand } from '@enum/command/ERoleSetCommand'

/**
 * @class MemberRoleInterface
 * @extends AbstractRoleInterface
 */
export default class MemberRoleInterface extends AbstractRoleInterface {
  public id: string = ERoleSetCommand.MEMBER
  public role: keyof IRole = 'member'
}
