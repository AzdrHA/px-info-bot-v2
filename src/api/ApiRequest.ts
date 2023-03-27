import { type Guild, type PresenceData } from 'discord.js'
import { MakeRequest } from '@/api/MakeRequest'
import * as process from 'process'
import UtilLogger from '@util/UtilLogger'
import { ENodeEnv } from '@enum/ENodeEnv'
import { type ISettings } from '@interface/ISettings'

/**
 * @method updateMemberCountRequest
 * @description Update the member count
 * @returns {Promise<void>}
 * @async
 * @public
 * @param {Guild} guild
 * @param {boolean} force
 */
export const updateMemberCountRequest = async (guild: Guild, force: boolean = false): Promise<void> => {
  if (process.env.NODE_ENV === ENodeEnv.DEVELOPMENT && !force) {
    UtilLogger.info('Member count update skipped in development mode')
    return
  }
  return await MakeRequest('/members', 'POST', { members: guild.memberCount })
}

/**
 * @method getPresenceRequest
 * @description Get the presence
 * @returns {Promise<PresenceData>}
 * @async
 */
export const getPresenceRequest = async (): Promise<PresenceData> => {
  return await MakeRequest('/presence', 'GET')
}

/**
 * @method getSettingsRequest
 * @description Get the settings
 * @returns {Promise<ISettings>}
 * @async
 */
export const getSettingsRequest = async (): Promise<ISettings> => {
  return await MakeRequest('/settings', 'GET')
}
