import { type GuildMember } from 'discord.js'
import { isBadName } from '@util/UtilRegex'
import UtilLogger from '@util/UtilLogger'

/**
 * @class GuildMemberService
 */
export default class GuildMemberService {
  public static RENAME_REASON = 'anti_hoiper'

  /**
   * @param {GuildMember} member
   * @param {boolean} logger
   * @returns {Promise<void>}
   * @memberof GuildMemberService
   * @description Check if the member's nickname starts with a number or special character
   * and rename the member if it does.
   */
  public async checkAntiHoist (member: GuildMember, logger: boolean = false): Promise<boolean> {
    // Check if the member's nickname starts with a number or special character
    if (!isBadName(member.displayName)) await Promise.reject(new Error('Member\'s nickname doesn\'t start with a number or special character'))

    // Check if the member is kickable
    if (!member.kickable) await Promise.reject(new Error('Member is not renameable'))

    // Rename the member
    await member.setNickname('Hoiper', GuildMemberService.RENAME_REASON)

    // Log the member's rename
    if (logger) UtilLogger.info(`${member.user.tag} rename for hoiping`)

    return true
  }
}
