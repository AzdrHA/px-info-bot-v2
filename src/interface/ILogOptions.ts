import type DefaultEmbedBuilder from '@component/embed-builder/DefaultEmbedBuilder'

export interface ILogOptions {
  embed: Promise<DefaultEmbedBuilder>
  channel: string | null
}
