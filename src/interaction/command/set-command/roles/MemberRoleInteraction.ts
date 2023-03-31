import AbstractRoleInteraction from '@abstract/AbstractRoleInteraction';
import { type IRole } from '@interface/IRole';
import { ERoleSetCommand } from '@enum/command/ERoleSetCommand';

/**
 * @class MemberRoleInteraction
 * @extends AbstractRoleInteraction
 */
export default class MemberRoleInteraction extends AbstractRoleInteraction {
  public id: string = ERoleSetCommand.MEMBER;
  public role: keyof IRole = 'member';
}
