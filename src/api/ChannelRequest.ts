import DefaultApiRequest from './DefaultApiRequest'
import { type IChannels } from '@interface/IChannels'

/**
 * Role request
 * @class BaseChannelRequest
 * @extends DefaultApiRequest<IRole>
 * @property {IRole} IRole
 */
class BaseChannelRequest extends DefaultApiRequest<IChannels> {
}

const channelRequest = new BaseChannelRequest('/channels')
export default channelRequest
