import AbstractTicketInteraction from '@abstract/AbstractTicketInteraction'
import { type ITicketSetting } from '@interface/ITicketSetting'
import { ChannelType } from 'discord.js'
import { ETicketSetCommand } from '@enum/command/ETicketSetCommand'

/**
 * @class ArchivedCategoryTicketInteraction
 * @extends AbstractRoleInteraction
 */
export default class ArchivedCategoryTicketInteraction extends AbstractTicketInteraction {
  public id: string = ETicketSetCommand.ARCHIVED_CATEGORY
  public ticket: keyof Pick<ITicketSetting, 'archivedCategory' | 'category' | 'channel'> = 'archivedCategory'
  public type: ChannelType = ChannelType.GuildCategory
}
