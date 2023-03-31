import DefaultApiRequest from './DefaultApiRequest';
import { type ITicketSetting } from '@interface/ITicketSetting';
import { type CategoryChannel, type TextChannel } from 'discord.js';

/**
 * Role request
 * @class BaseTicketRequest
 * @extends DefaultApiRequest<ITicketSetting>
 * @property {ITicketSetting} ITicketSetting
 */
class BaseTicketSettingRequest extends DefaultApiRequest<ITicketSetting> {
  /**
   * Update the channel
   * @param {TextChannel} channel
   * @returns {Promise<ITicketSetting>}
   */
  public async updateChannel(channel: TextChannel): Promise<ITicketSetting> {
    return await this.update('channel', channel.id);
  }

  /**
   * Update the category
   * @param {CategoryChannel} category
   * @returns {Promise<ITicketSetting>}
   */
  public async updateCategory(
    category: CategoryChannel
  ): Promise<ITicketSetting> {
    return await this.update('category', category.id);
  }

  /**
   * Update the archived category
   * @param {CategoryChannel} category
   * @returns {Promise<ITicketSetting>}
   */
  public async updateArchivedCategory(
    category: CategoryChannel
  ): Promise<ITicketSetting> {
    return await this.update('archivedCategory', category.id);
  }

  /**
   * Update the message
   * @param {Message | null} message
   * @returns {Promise<ITicketSetting>}
   */
  public async updateMessage(message?: string | null): Promise<ITicketSetting> {
    return await this.update('message', message != null ? message : null);
  }

  /**
   * Update the content
   * @param {string} contentButton
   * @returns {Promise<ITicketSetting>}
   */
  public async updateContentButton(
    contentButton: string
  ): Promise<ITicketSetting> {
    return await this.update('contentButton', contentButton);
  }

  /**
   * Update the content
   * @param {string} content
   * @returns {Promise<ITicketSetting>}
   */
  public async updateContentMessage(content: string): Promise<ITicketSetting> {
    return await this.update('content', content);
  }
}

const ticketSettingRequest = new BaseTicketSettingRequest('/ticket_setting');
export default ticketSettingRequest;
