import type Client from '@/Client'
import { type BaseMessageOptions, type CategoryChannel, type Message, type TextChannel } from 'discord.js'
import { type ITicketSetting } from '@interface/ITicketSetting'
import ticketSettingRequest from '@/api/TicketSettingRequest'
import TicketButtonBuilder from '@component/button/TicketButtonBuilder'

/**
 * Ticket setting service
 * @class TicketSettingService
 */
export default class TicketSettingService {
  public static readonly DEFAULT_MESSAGE_CONTENT = 'Open a ticket by clicking on `{CONTENT_BUTTON}` button.\n*Make sure to read https://phantom-x.info/menu-faq and https://phantom-x.info/troubleshoot before you open a ticket!*'
  public static readonly DEFAULT_BUTTON_CONTENT = 'Create Ticket'
  public updateChannel = async (client: Client, channel: TextChannel): Promise<Message | boolean> => {
    await ticketSettingRequest.updateChannel(channel)
    await ticketSettingRequest.updateMessage(null)
    return await this.__updateMessage(client, channel)
  }

  public updateCategory = async (client: Client, category: CategoryChannel): Promise<Message | boolean> => {
    await ticketSettingRequest.updateCategory(category)
    return await this.__updateMessage(client)
  }

  public updateArchivedCategory = async (client: Client, category: CategoryChannel): Promise<Message | boolean> => {
    await ticketSettingRequest.updateArchivedCategory(category)
    return await this.__updateMessage(client)
  }

  public updateContentButton = async (client: Client, contentButton: string): Promise<Message | boolean> => {
    await ticketSettingRequest.updateContentButton(contentButton)
    return await this.__updateMessage(client)
  }

  public updateContentMessage = async (client: Client, content: string): Promise<Message | boolean> => {
    await ticketSettingRequest.updateContentMessage(content)
    return await this.__updateMessage(client)
  }

  private readonly __message = async (ticket: ITicketSetting): Promise<BaseMessageOptions> => {
    return {
      content: ticket.content.replace(/\{CONTENT_BUTTON}/, ticket.contentButton),
      components: await new TicketButtonBuilder().buildButton()
    }
  }

  private readonly __updateMessage = async (client: Client, channel?: TextChannel): Promise<Message | boolean> => {
    const ticketSetting = await ticketSettingRequest.get()

    if (channel == null) channel = client.channels.cache.get(ticketSetting.channel) as TextChannel
    if (channel == null) return false

    if (ticketSetting.message == null) {
      const ticketSetting = await ticketSettingRequest.get()
      const message = await channel.send(await this.__message(ticketSetting))
      await ticketSettingRequest.updateMessage(message.id)
      return message
    }

    const message = await channel.messages.fetch(ticketSetting.message)
    if (message == null) return false
    console.log('update')
    await message.edit(await this.__message(ticketSetting))
    return message
  }
}
