import 'module-alias/register'
import Client from './Client'
import { IntentsBitField, Partials } from 'discord.js'
import { DISCORD_PREFIX, DISCORD_TOKEN } from '@/config/AppConfig'

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
