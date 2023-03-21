import AbstractEvent from '@abstract/AbstractEvent'

/**
 * @class ReadyEvent
 */
export default class ReadyEvent extends AbstractEvent {
  /**
   * @public
   * @returns {void}
   */
  public run (): void {
    console.log('Logged in as', this.client.user?.tag)
  }
}
