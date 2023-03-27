import AbstractInteraction from '@abstract/AbstractInteraction'
import { type IRole } from '@interface/IRole'
import translator from '@util/UtilTranslator'
import DefaultButtonRowBuilder from '@component/row-builder/DefaultButtonRowBuilder'
import CancelButton from '@component/button/CancelButton'
import { getIdFromRoleMention } from '@util/UtilRegex'
import { Role } from 'discord.js'
import AppException from '@exception/AppException'
import roleRequest from '@/api/RoleRequest'
import UtilLogger from '@util/UtilLogger'

/**
 * @abstract
 * @class AbstractRoleInterface
 * @extends AbstractInteraction
 */
export default abstract class AbstractRoleInterface extends AbstractInteraction {
  public abstract role: keyof IRole
  public global: boolean = false

  /**
   * @method run
   * @description The run method
   * @returns {Promise<any>}
   */
  public async run (): Promise<any> {
    /**
     * @param {string} content
     * @returns {void}
     */
    const callback = async (content: string): Promise<void> => {
      const role = (this.interaction.guild != null) ? this.interaction.guild.roles.cache.get(getIdFromRoleMention(content)) : null
      if (role == null || !(role instanceof Role)) throw new AppException('The value entered is invalid')

      await roleRequest.update(this.role, role.id)
      await this.success(translator('The **{TYPE}** has been successfully updated', { TYPE: translator('Role') }))
      UtilLogger.success('RoleInteraction callback' + role.id)
    }

    return await this.messageButtonCollector(await this.send({
      content: translator('Send the ID or mention the **{TYPE}** role you want to use', {
        TYPE: translator(this.role)
      }),
      components: [new DefaultButtonRowBuilder().setComponents(new CancelButton())]
    }), callback)
  }
}
