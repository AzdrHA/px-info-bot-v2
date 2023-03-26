import AbstractInteraction from '@abstract/AbstractInteraction'
import roleRequest from '@/api/RoleRequest'
import { GuildMember } from 'discord.js'
import translator from '@util/UtilTranslator'
import { EGlobalButton } from '@enum/EGlobalButton'

/**
 * @class VerifyButton
 * @description The verify button
 * @extends AbstractInteraction
 */
export default class VerifyButton extends AbstractInteraction {
  public id: string = EGlobalButton.VERIFY
  public global: boolean = true

  /**
   * @method run
   * @description The run method
   * @returns {Promise<any>}
   */
  public async run (): Promise<any> {
    const memberRole = await roleRequest.getMemberRoles()
    if ((this.interaction.member != null) && this.interaction.member instanceof GuildMember) {
      if (this.interaction.member.roles.cache.has(memberRole)) {
        await this.interaction.reply({ content: translator('You are already verified'), ephemeral: true })
      } else {
        await this.interaction.member.roles.add(memberRole)
        await this.interaction.reply({ content: translator('You are now verified'), ephemeral: true })
      }
    }
  }
}
