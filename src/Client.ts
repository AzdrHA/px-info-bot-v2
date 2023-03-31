import { Client as BaseClient } from 'discord.js';
import LoadFileService from './service/LoadFileService';
import * as util from 'util';
import { type IClientOptions } from '@interface/IClientOptions';
import { ucFirst } from '@util/UtilStr';
import { APP_DIR } from '@config/Constant';

/**
 * @class Client
 * @extends BaseClient
 */
export default class Client extends BaseClient {
  public token: string;
  public prefix: string;
  public autoStart: boolean;

  /**
   * @constructor
   * @param {IClientOptions} options
   */
  public constructor(options: IClientOptions) {
    super(options);
    this.token = options.token;
    this.prefix = options.prefix;
    this.autoStart = options.autoStart === true;

    void this._init().then(() => {
      void (this.autoStart && this.login(this.token));
    });
  }

  /**
   * @method _init
   * @return {Promise<void>}
   * @description Initialize the client
   * @private
   */
  private async _init(): Promise<void> {
    for (const dir of ['event', 'command', 'interaction']) {
      console.log('\n------------------------------');
      console.log(util.format('Loading %s', ucFirst(dir)));
      console.log('------------------------------');
      const loadFileService = new LoadFileService(this);
      await loadFileService.searchFolder(util.format('%s/%s', APP_DIR, dir));
    }
    console.log('\n');
  }
}
