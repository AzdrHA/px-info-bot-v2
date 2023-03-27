import { type IRole } from '@interface/IRole'
import { type IVerificationSetting } from '@interface/IVerificationSetting'
import { type ITicketSetting } from '@interface/ITicketSetting'
import { type MenuInfoType } from '@interface/IMenuInfo'
import { type IChannels } from '@interface/IChannels'
import { type IChannelLog } from '@interface/IChannelLog'

export interface ISettings {
  roles: IRole
  verification: IVerificationSetting
  ticketSetting: ITicketSetting
  menuInfo: MenuInfoType
  channels: IChannels
  logs: IChannelLog
}
