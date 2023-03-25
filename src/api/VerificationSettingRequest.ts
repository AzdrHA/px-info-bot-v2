import DefaultApiRequest from './DefaultApiRequest'
import { type IVerificationSetting } from '@interface/IVerificationSetting'
import { type TextChannel } from 'discord.js'

/**
 * Role request
 * @class BaseRoleRequest
 * @extends DefaultApiRequest<IVerificationSetting>
 * @property {IVerificationSetting} IVerificationSetting
 */
class BaseVerificationSettingRequest extends DefaultApiRequest<IVerificationSetting> {
  /**
   * Update the channel
   * @param {string} channel
   * @returns {Promise<IVerificationSetting>}
   */
  public async updateChannel (channel: TextChannel): Promise<IVerificationSetting> {
    return await this.update('channel', channel.id)
  }

  /**
   * Update the message
   * @param {?: string | null} message
   * @returns {Promise<IVerificationSetting>}
   */
  public async updateMessage (message?: string | null): Promise<IVerificationSetting> {
    return await this.update('message', message)
  }

  /**
   * Update the content button
   * @param {string} content
   * @returns {Promise<IVerificationSetting>}
   */
  public async updateContentButton (content: string): Promise<IVerificationSetting> {
    return await this.update('contentButton', content)
  }

  /**
   * Update the message content
   * @param {string} content
   * @returns {Promise<IVerificationSetting>}
   */
  public async updateMessageContent (content: string): Promise<IVerificationSetting> {
    return await this.update('content', content)
  }
}

const verificationSettingRequest = new BaseVerificationSettingRequest('/verification')
export default verificationSettingRequest
