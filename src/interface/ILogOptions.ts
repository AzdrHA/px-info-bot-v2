import type Client from '@/Client'
import type DefaultEmbedBuilder from '@component/embed-builder/DefaultEmbedBuilder'

export interface ILogOptions {
  client: Client
  embed: Promise<DefaultEmbedBuilder>
  channel: string | null
}
