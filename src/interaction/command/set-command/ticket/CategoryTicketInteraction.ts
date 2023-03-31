import { ETicketSetCommand } from '@enum/command/ETicketSetCommand';
import { getIdFromChannelMention } from '@util/UtilRegex';
import AppException from '@exception/AppException';
import translator from '@util/UtilTranslator';
import UtilLogger from '@util/UtilLogger';
import DefaultButtonRowBuilder from '@component/row-builder/DefaultButtonRowBuilder';
import CancelButton from '@component/button/CancelButton';
import AbstractInteraction from '@abstract/AbstractInteraction';
import { CategoryChannel } from 'discord.js';
import TicketSettingService from '@service/TicketSettingService';

/**
 * @class CategoryTicketInteraction
 * @extends AbstractRoleInteraction
 */
export default class CategoryTicketInteraction extends AbstractInteraction {
  public id: string = ETicketSetCommand.CATEGORY;
  public global: boolean = false;

  /**
   * @public
   * @returns {Promise<any>}
   */
  public async run(): Promise<any> {
    /**
     * @param {string} content
     * @returns {void}
     */
    const callback = async (content: string): Promise<void> => {
      const category =
        this.interaction.guild != null
          ? this.interaction.guild.channels.cache.get(
              getIdFromChannelMention(content)
            )
          : null;
      if (category == null || !(category instanceof CategoryChannel))
        throw new AppException('The value entered is invalid');

      const ticketSettingService = new TicketSettingService();
      await ticketSettingService.updateCategory(this.client, category);

      await this.success(
        translator('The **{TYPE}** has been successfully updated', {
          TYPE: translator('Category')
        })
      );
      UtilLogger.success('CategoryTicketInteraction callback' + category.id);
    };

    return await this.messageButtonCollector(
      await this.send({
        content: translator(
          'Send the ID or mention the **{TYPE}** you want to use',
          { TYPE: translator('Category') }
        ),
        components: [
          new DefaultButtonRowBuilder().setComponents(new CancelButton())
        ]
      }),
      callback
    );
  }
}
