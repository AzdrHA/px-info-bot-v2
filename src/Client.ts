import { Client as BaseClient } from 'discord.js'
import { type IClientOptions } from './interface/IClientOptions'
import LoadFileService from './service/LoadFileService'
import * as util from 'util'
import { AppDir } from './config/Constant'
import { ucFirst } from './util/UtilStr'

/**
 * @class Client
 * @extends BaseClient
 */
export default class Client extends BaseClient {
  public token: string
  public prefix: string

  /**
   * @constructor
   * @param {IClientOptions} options
   */
  public constructor (options: IClientOptions) {
    super(options)
    this.token = options.token
    this.prefix = options.prefix

    void this._init().then(() => {
      // void this.login(this.token)
    })
  }

  /**
   * @method _init
   * @return {Promise<void>}
   * @description Initialize the client
   * @private
   */
  private async _init (): Promise<void> {
    for (const dir of ['event']) {
      console.log('\n------------------------------')
      console.log(util.format('Loading %s', ucFirst(dir)))
      console.log('------------------------------')
      const loadFileService = new LoadFileService(this)
      await loadFileService.searchFolder(util.format('%s/%s', AppDir, dir))
    }
  }
}
