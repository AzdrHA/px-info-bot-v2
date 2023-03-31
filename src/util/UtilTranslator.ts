import * as util from 'util'
import * as fs from 'fs'
import { parse } from 'yaml'
import UtilLogger from './UtilLogger'
import { replace } from './UtilStr'
import { type TUtilTranslatorOptions } from '@/interface/IUtilTranslator'
import { PROJECT_DIR } from '@config/Constant'
const cacheTranslation: Record<string, Record<string, string>> = {}

/**
 * @public
 * @class BaseUtilTranslator
 */
class BaseUtilTranslator {
  private readonly TRANSLATION_DIR: string = util.format('%s/translations', PROJECT_DIR)

  /**
   * @private
   * @param {string} file
   * @returns {string[]}
   * @description Get translation file
   * @example
   * getTranslationFile('message') // ['test: test']
   */
  private getTranslationFile (file: string): Record<string, string> {
    if (cacheTranslation[file] !== undefined) return cacheTranslation[file]
    cacheTranslation[file] = parse(fs.readFileSync(util.format('%s/%s.yml', this.TRANSLATION_DIR, file), 'utf8'))
    return cacheTranslation[file]
  }

  /**
   * @private
   * @param {string} key
   * @param {string} file
   * @returns {string}
   * @description Get translation
   * @example
   * getTranslation('test', 'message') // test
   */
  private getTranslation (key: string, file: string): any {
    const translation = this.getTranslationFile(file)
    if (translation[key] !== undefined) return translation[key]
    UtilLogger.warn(util.format('Translation key "%s" not found in file "%s"', key, file))
    return key
  }

  /**
   * @public
   * @param {string} key
   * @param {TUtilTranslatorOptions} params
   * @param file
   * @returns {string}
   */
  public trans (key: string, params: TUtilTranslatorOptions, file: string): string {
    return replace(this.getTranslation(key, file), params)
  }
}

/**
 * @public
 * @param {string} key
 * @param {TUtilTranslatorOptions} params
 * @param {string} file
 * @returns {string}
 */
const translator = (key: string, params: TUtilTranslatorOptions = {}, file: string = 'message'): string => {
  return new BaseUtilTranslator().trans(key, params, file)
}

export default translator
