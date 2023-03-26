import AbstractEvent from '@abstract/AbstractEvent'
import { SUPPORT_DISCORD } from '@config/AppConfig'
import { updateMemberCountRequest } from '@/api/ApiRequest'

/**
 * @class ReadyEvent
 */
export default class ReadyEvent extends AbstractEvent {
  /**
   * @public
   * @returns {void}
   */
  public async run (): Promise<any> {
    const guild = this.client.guilds.cache.get(SUPPORT_DISCORD)
    if (guild != null) await updateMemberCountRequest(guild)
    console.log('Logged in as', this.client.user?.tag)
  }
}
