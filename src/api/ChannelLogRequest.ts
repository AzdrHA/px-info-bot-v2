import DefaultApiRequest from './DefaultApiRequest'
import { type IRole } from '@interface/IRole'
import { type IChannelLog } from '@interface/IChannelLog'

/**
 * Role request
 * @class BaseRoleRequest
 * @extends DefaultApiRequest<IRole>
 * @property {IRole} IRole
 */
class BaseChannelLogRequest extends DefaultApiRequest<IChannelLog> {
}

const channelLogRequest = new BaseChannelLogRequest('/channels/logs')
export default channelLogRequest
