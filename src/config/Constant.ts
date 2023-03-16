import * as util from 'util'

export const ProjectDir = process.cwd()
export const AppDir = util.format('%s/src', ProjectDir)
export const commandsList = new Map<string, any>()
export const interactionList = new Map<string, any>()
export const eventList = new Map()
