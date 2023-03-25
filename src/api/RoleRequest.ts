import DefaultApiRequest from './DefaultApiRequest'
import { type IRole } from '@interface/IRole'

/**
 * Role request
 * @class BaseRoleRequest
 * @extends DefaultApiRequest<IRole>
 * @property {IRole} IRole
 */
class BaseRoleRequest extends DefaultApiRequest<IRole> {}

const roleRequest = new BaseRoleRequest('/roles')
export default roleRequest
