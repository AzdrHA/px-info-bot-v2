import * as util from 'util'

export const PROJECT_DIR = process.cwd()
export const APP_DIR = util.format('%s/src', PROJECT_DIR)
export const COMMAND_LIST = new Map<string, any>()
export const INTERACTION_LIST = new Map<string, any>()
export const EVENT_LIST = new Map()
