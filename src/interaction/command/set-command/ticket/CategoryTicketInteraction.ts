import AbstractTicketInteraction from '@abstract/AbstractTicketInteraction'
import { type ITicketSetting } from '@interface/ITicketSetting'
import { ChannelType } from 'discord.js'
import { ETicketSetCommand } from '@enum/command/ETicketSetCommand'

/**
 * @class CategoryTicketInteraction
 * @extends AbstractRoleInteraction
 */
export default class CategoryTicketInteraction extends AbstractTicketInteraction {
  public id: string = ETicketSetCommand.CATEGORY
  public ticket: keyof Pick<ITicketSetting, 'archivedCategory' | 'category' | 'channel'> = 'category'
  public type: ChannelType = ChannelType.GuildCategory
}
