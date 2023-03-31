import AbstractEvent from '@abstract/AbstractEvent';
import { SUPPORT_DISCORD } from '@config/AppConfig';
import { getPresenceRequest, updateMemberCountRequest } from '@/api/ApiRequest';

/**
 * @class ReadyEvent
 */
export default class ReadyEvent extends AbstractEvent {
  /**
   * @public
   * @returns {void}
   */
  public async run(): Promise<any> {
    const guild = this.client.guilds.cache.get(SUPPORT_DISCORD);
    if (guild != null) await updateMemberCountRequest(guild);
    this.client.user?.setPresence(await getPresenceRequest());
    console.log('Logged in as', this.client.user?.tag);
  }
}
