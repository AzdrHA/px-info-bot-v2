import type Client from '@/Client'
import verificationSettingRequest from '@/api/VerificationSettingRequest'
import { type IVerificationSetting } from '@interface/IVerificationSetting'
import { type BaseMessageOptions, type Message, type TextChannel } from 'discord.js'
import VerificationButtonBuilder from '@component/button/verfication/VerificationButtonBuilder'

/**
 * Verification setting service
 * @class VerificationSettingService
 */
export default class VerificationSettingService {
  public static readonly DEFAULT_MESSAGE = 'Hello, to access the other channels you need to fullfill the verification. To do this just click the **{CONTENT_BUTTON}** button below this message.'
  public static readonly DEFAULT_BUTTON = 'Verify'

  public updateChannel = async (client: Client, channel: TextChannel): Promise<Message | boolean> => {
    await verificationSettingRequest.updateChannel(channel)
    await verificationSettingRequest.updateMessage(null)
    return await this.__updateMessage(client, channel)
  }

  private readonly __message = async (setting: IVerificationSetting): Promise<BaseMessageOptions> => {
    return {
      content: setting.content.replace('{CONTENT_BUTTON}', setting.contentButton),
      components: await new VerificationButtonBuilder().buildButton()
    }
  }

  private readonly __updateMessage = async (client: Client, channel?: TextChannel): Promise<Message | boolean> => {
    const verificationSetting = await verificationSettingRequest.get()

    if (channel == null) channel = client.channels.cache.get(verificationSetting.channel) as TextChannel
    if (channel == null) return false

    if (verificationSetting.message == null) {
      const message = await channel.send(await this.__message(verificationSetting))
      await verificationSettingRequest.updateMessage(message.id)
      return message
    }

    const message = await channel.messages.fetch(verificationSetting.message)
    if (message == null) return false
    await message.edit(await this.__message(verificationSetting))
    return message
  }
}
