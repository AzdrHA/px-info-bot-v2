import AbstractEvent from '@abstract/AbstractEvent'
import { type VoiceState } from 'discord.js'
import {
  JoinVoiceStateUpdateEmbedBuilder
} from '@component/embed-builder/log/voice-status-update/JoinVoiceStateUpdateEmbedBuilder'
import {
  LeftVoiceStateUpdateEmbedBuilder
} from '@component/embed-builder/log/voice-status-update/LeftVoiceStateUpdateEmbedBuilder'
import {
  MoveVoiceStateUpdateEmbedBuilder
} from '@component/embed-builder/log/voice-status-update/MoveVoiceStateUpdateEmbedBuilder'

/**
 * @class VoiceStateUpdateEvent
 * @description The voice state update event
 * @extends AbstractEvent
 */
export default class VoiceStateUpdateEvent extends AbstractEvent {
  /**
   * @method run
   * @description The run method
   * @returns {Promise<any>}
   * @async
   * @public
   * @param {VoiceState} oldState
   * @param {VoiceState} newState
   */
  public async run (oldState: VoiceState, newState: VoiceState): Promise<any> {
    if ((oldState.channelId == null) && (newState.channelId != null)) {
      return await JoinVoiceStateUpdateEmbedBuilder(oldState, newState)
    }

    if ((oldState.channelId != null) && (newState.channelId == null)) {
      return await LeftVoiceStateUpdateEmbedBuilder(oldState, newState)
    }

    if ((oldState.channelId != null) && (newState.channelId != null)) {
      return await MoveVoiceStateUpdateEmbedBuilder(oldState, newState)
    }
  }
}
