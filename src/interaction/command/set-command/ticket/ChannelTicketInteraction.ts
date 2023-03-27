import AbstractTicketInteraction from '@abstract/AbstractTicketInteraction'
import { type ITicketSetting } from '@interface/ITicketSetting'
import { ChannelType } from 'discord.js'
import { ETicketSetCommand } from '@enum/command/ETicketSetCommand'

/**
 * @class ChannelTicketInteraction
 * @extends AbstractRoleInteraction
 */
export default class ChannelTicketInteraction extends AbstractTicketInteraction {
  public id: string = ETicketSetCommand.CHANNEL
  public ticket: keyof Pick<ITicketSetting, 'archivedCategory' | 'category' | 'channel'> = 'channel'
  public type: ChannelType = ChannelType.GuildText
}
