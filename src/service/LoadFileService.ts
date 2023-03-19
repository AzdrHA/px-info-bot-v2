import { readdirSync, statSync } from 'fs'
import { parse, resolve } from 'path'
import AbstractEvent from '../abstract/AbstractEvent'
import { COMMAND_LIST, EVENT_LIST, INTERACTION_LIST } from '../config/Constant'
import { Guild } from 'discord.js'
import { SUPPORT_DISCORD } from '../config/AppConfig'
import { formalizeEventName, isScriptFile } from '../util/UtilStr'
import AppException from '../exception/AppException'
import * as util from 'util'
import UtilLogger from '../util/UtilLogger'
import type Client from '../Client'
import AbstractCommand from '../abstract/AbstractCommand'
import { ENodeEnv } from '../enum/ENodeEnv'
import AbstractInteraction from '../abstract/AbstractInteraction'

/**
 * @class LoadFileService
 */
export default class LoadFileService {
  public client: Client

  /**
   * @constructor
   * @param {client} client
   */
  constructor (client: Client) {
    this.client = client
  }

  /**
   * Load a file
   * @param path
   * @returns {Promise<any>}
   */
  public async searchFolder (path: string): Promise<any> {
    for (const file of readdirSync(path)) {
      const filePath = resolve(path, file)

      if (statSync(filePath).isDirectory()) return await this.searchFolder(filePath)
      await this.loadFile(filePath)
    }
  }

  /**
   * Load a file
   * @param {string} filePath
   * @returns {Promise<any>}
   */
  public async loadFile (filePath: string): Promise<any> {
    // Ignore if file is not a script file (.js) or (.ts)
    if (!isScriptFile(filePath)) return

    const fileName = parse(filePath).name
    const { default: Action } = await import(filePath)

    const event = new Action(this.client)
    if (event.constructor.name !== fileName) {
      throw new AppException(util.format('The file %s and its class name are not identical', fileName))
    }

    if (event instanceof AbstractEvent) {
      await this.loadEvent(fileName, event, Action)
    } else if (event instanceof AbstractCommand) {
      await this.loadCommand(fileName, event, Action)
    } else if (event instanceof AbstractInteraction) {
      await this.loadInteraction(fileName, event, Action)
    }

    console.log(util.format('Loaded %s', fileName))
  }

  /**
   * Load an event
   * @param {string} fileName
   * @param {AbstractEvent} event
   * @param {() => AbstractCommand} Action
   * @returns {Promise<any>}
   * @private
   */
  private async loadEvent (fileName: string, event: AbstractEvent, Action: () => AbstractEvent): Promise<any> {
    if (EVENT_LIST.has(fileName) && process.env.NODE_ENV !== ENodeEnv.TEST) {
      throw new AppException(util.format('The event %s is already registered', fileName))
    }

    EVENT_LIST.set(fileName, Action)

    this.client.on(formalizeEventName(fileName), (...args) => {
      const firstArg = args[0]
      if ((Boolean(firstArg)) && firstArg.guild instanceof Guild && firstArg.guild.id !== SUPPORT_DISCORD) {
        return
      }

      if (!UtilLogger.DISABLE_EVENT_LOG.includes(fileName)) {
        UtilLogger.event(util.format('%s called', fileName))
      }
      event.run(...args)
    })
  }

  /**
   * Load a command
   * @param {string} fileName
   * @param {AbstractCommand} event
   * @param {() => AbstractCommand} Action
   * @private
   */
  private async loadCommand (fileName: string, event: AbstractCommand, Action: () => AbstractCommand): Promise<any> {
    event.alias.forEach((name) => {
      if (COMMAND_LIST.has(name) && process.env.NODE_ENV !== ENodeEnv.TEST) {
        throw new AppException(util.format('The command %s is already registered', fileName))
      }
      COMMAND_LIST.set(name, event)
    })
  }

  /**
   * Load a command
   * @param {string} fileName
   * @param {AbstractCommand} event
   * @param {() => AbstractCommand} Action
   * @private
   */
  private async loadInteraction (fileName: string, event: AbstractInteraction, Action: () => AbstractInteraction): Promise<any> {
    if (INTERACTION_LIST.has(event.id) && process.env.NODE_ENV !== ENodeEnv.TEST) {
      throw new AppException(util.format('The interaction %s is already registered', fileName))
    }
    INTERACTION_LIST.set(event.id, Action)
  }
}
