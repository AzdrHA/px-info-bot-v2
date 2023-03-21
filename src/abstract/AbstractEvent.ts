import type Client from '@/Client'

/**
 * @class AbstractEvent
 */
export default abstract class AbstractEvent {
  public client: Client

  /**
   * @constructor
   * @param {Client} client
   * @protected
   */
  public constructor (client: Client) {
    this.client = client
  }
  public abstract run (...args: any[]): void
}
