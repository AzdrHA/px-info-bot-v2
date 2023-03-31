import { type TUtilTranslatorOptions } from '@interface/IUtilTranslator';
import translator from '@util/UtilTranslator';

/**
 * @class AppException
 * @extends Error
 */
export default class AppException extends Error {
  /**
   * @constructor
   * @param {string} message
   * @param {TUtilTranslatorOptions} params
   */
  public constructor(
    message: string = 'An error has been detected',
    params: TUtilTranslatorOptions = {}
  ) {
    super(translator(message, params, 'error'));
  }
}
