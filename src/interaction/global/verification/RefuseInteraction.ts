import AbstractInteraction from '@abstract/AbstractInteraction';
import { GuildMember } from 'discord.js';
import translator from '@util/UtilTranslator';
import { EGlobalButton } from '@enum/EGlobalButton';

/**
 * @class RefuseInteraction
 * @description The refuse button
 * @extends AbstractInteraction
 */
export default class RefuseInteraction extends AbstractInteraction {
  public id: string = EGlobalButton.REFUSE;
  public global: boolean = true;

  /**
   * @method run
   * @description The run method
   * @returns {Promise<any>}
   */
  public async run(): Promise<any> {
    if (
      this.interaction.member != null &&
      this.interaction.member instanceof GuildMember
    ) {
      if (this.interaction.member.kickable) {
        await this.interaction.member.kick();
      } else
        await this.interaction.reply({
          content: translator("I can't kick this user"),
          ephemeral: true
        });
    }
  }
}
