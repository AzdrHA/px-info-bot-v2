import DefaultEmbedBuilder from '@component/embed-builder/DefaultEmbedBuilder'
import translator from '@util/UtilTranslator'
import { getSettingsRequest } from '@/api/ApiRequest'
import { channelMention, roleMention } from 'discord.js'
import { getNested } from '@util/UtilStr'

/**
 * @function SettingEmbedBuilder
 * @description The setting embed builder
 * @returns {DefaultEmbedBuilder}
 * @exports
 * @public
 */
export const SettingEmbedBuilder = async (): Promise<DefaultEmbedBuilder> => {
  const settings = await getSettingsRequest()
  return new DefaultEmbedBuilder().setDescription(translator('__**My current settings:**__')).setFields([
    {
      name: 'ㅤ',
      value: translator('__**Roles:**__'),
      inline: false
    },
    {
      name: translator('Administrator:'),
      value: roleMention(getNested('roles.administrator', settings, translator('Not yet defined'))),
      inline: true
    },
    {
      name: translator('Support:'),
      value: roleMention(getNested('roles.support', settings, translator('Not yet defined'))),
      inline: true
    },
    {
      name: translator('Member:'),
      value: roleMention(getNested('roles.member', settings, translator('Not yet defined'))),
      inline: true
    },

    {
      name: 'ㅤ',
      value: translator('__**Ticket Settings:**__'),
      inline: false
    },
    {
      name: translator('Ticket Creation channel:'),
      value: channelMention(getNested('ticketSetting.channel', settings, translator('Not yet defined'))),
      inline: true
    },
    {
      name: translator('Ticket Category ID:'),
      value: channelMention(getNested('ticketSetting.category', settings, translator('Not yet defined'))),
      inline: true
    },

    {
      name: 'ㅤ',
      value: translator('__**Channels:**__'),
      inline: false
    },
    {
      name: translator('Verification:'),
      value: channelMention(getNested('verification.channel', settings, translator('Not yet defined'))),
      inline: true
    },
    {
      name: translator('Info:'),
      value: channelMention(getNested('channels.info', settings, translator('Not yet defined'))),
      inline: true
    },
    {
      name: translator('Menu Info:'),
      value: channelMention(getNested('menuInfo.channel', settings, translator('Not yet defined'))),
      inline: true
    },
    {
      name: translator('Menu News:'),
      value: channelMention(getNested('channels.menuNews', settings, translator('Not yet defined'))),
      inline: true
    },
    {
      name: translator('Shop News:'),
      value: channelMention(getNested('channels.shopNews', settings, translator('Not yet defined'))),
      inline: true
    },

    {
      name: 'ㅤ',
      value: translator('__**Logs:**__'),
      inline: false
    },
    {
      name: translator('Member Role:'),
      value: channelMention(getNested('logs.memberRole', settings, translator('Not yet defined'))),
      inline: true
    },
    {
      name: translator('Ticket:'),
      value: channelMention(getNested('logs.ticket', settings, translator('Not yet defined'))),
      inline: true
    },
    {
      name: translator('Message:'),
      value: channelMention(getNested('logs.message', settings, translator('Not yet defined'))),
      inline: true
    },
    {
      name: translator('Member:'),
      value: channelMention(getNested('logs.member', settings, translator('Not yet defined'))),
      inline: true
    },
    {
      name: translator('Name:'),
      value: channelMention(getNested('logs.name', settings, translator('Not yet defined'))),
      inline: true
    },
    {
      name: translator('Voice Chat:'),
      value: channelMention(getNested('logs.voiceChat', settings, translator('Not yet defined'))),
      inline: true
    }
  ])
}
