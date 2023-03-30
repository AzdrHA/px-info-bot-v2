import 'module-alias/register'
import { IntentsBitField, Partials } from 'discord.js'
import { DISCORD_PREFIX, DISCORD_TOKEN } from '@/config/AppConfig'
import Client from '@/Client'
import roleRequest from '@/api/RoleRequest'
import AppException from '@exception/AppException'
import channelLogRequest from '@/api/ChannelLogRequest'

roleRequest.get().then((r) => {
  // eslint-disable-next-line no-new
  new Client({
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.MessageContent,
      IntentsBitField.Flags.GuildVoiceStates,
      IntentsBitField.Flags.GuildPresences,
      IntentsBitField.Flags.GuildInvites
    ],
    partials: [Partials.Message, Partials.GuildMember, Partials.User],
    token: DISCORD_TOKEN,
    prefix: DISCORD_PREFIX,
    autoStart: true
  })
}).catch((e) => {
  console.log(e)
  throw new AppException('Impossible to start the bot, please check your API connection')
})
