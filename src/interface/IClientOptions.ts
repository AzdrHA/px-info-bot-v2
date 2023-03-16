import { type ClientOptions } from 'discord.js'

export interface IClientOptions extends ClientOptions {
  token: string
  prefix: string
  autoStart?: boolean
}
