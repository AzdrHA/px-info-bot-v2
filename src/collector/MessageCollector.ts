import { type Message, type MessageCollector as BaseMessageCollector } from 'discord.js'

/**
 * @public
 * Class MessageCollector
 */
export class MessageCollector {
  private readonly clientMessage: Message
  private readonly executorMessage: Message
  private collector: BaseMessageCollector | undefined
  private readonly callback: ((content: Message) => void) | undefined

  /**
   * @public
   * @param clientMessage
   * @param executorMessage
   * @param {Message} callback
   */
  public constructor (
    clientMessage: Message,
    executorMessage: Message,
    callback?: (content: Message) => void
  ) {
    this.clientMessage = clientMessage
    this.executorMessage = executorMessage
    this.callback = callback
    this.__init()
  }

  private __init (): void {
    console.log(this.executorMessage.author.id)
    this.collector = this.executorMessage.channel.createMessageCollector({
      filter: (message: Message) => message.author.id === this.executorMessage.author.id,
      time: 60000,
      max: 1
    })

    this.collector.on('collect', this.__collect)
  }

  private readonly __collect = async (message: Message): Promise<any> => {
    if (this.executorMessage.deletable) await this.executorMessage.delete().catch(() => null)
    if (this.clientMessage.deletable) await this.clientMessage.delete().catch(() => null)
    if (message.deletable) await message.delete().catch(() => null)
    if (this.callback != null) this.callback(message)
  }
}
