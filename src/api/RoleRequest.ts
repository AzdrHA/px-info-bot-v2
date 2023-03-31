import DefaultApiRequest from './DefaultApiRequest';
import { type IRole } from '@interface/IRole';

/**
 * Role request
 * @class BaseRoleRequest
 * @extends DefaultApiRequest<IRole>
 * @property {IRole} IRole
 */
class BaseRoleRequest extends DefaultApiRequest<IRole> {
  /**
   * @return {Promise<string>}
   */
  public async getMemberRoles(): Promise<string> {
    return (await this.get()).member;
  }
}

const roleRequest = new BaseRoleRequest('/roles');
export default roleRequest;
