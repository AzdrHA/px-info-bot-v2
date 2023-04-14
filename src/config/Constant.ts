import * as util from 'util';

export const PROJECT_DIR = process.cwd();
export const APP_DIR = util.format('%s/src', PROJECT_DIR);
export const COMMAND_LIST = new Map<string, any>();
export const INTERACTION_LIST = new Map<string, any>();
export const EVENT_LIST = new Map();
export const CACHE = new Map<string, any>();


export const MENU_FAQ_LINK = 'https://phantom-x.info/menu-faq';
export const TROUBLESHOOT_LINK = 'https://phantom-x.info/troubleshoot';
export const DISCORD_LINK = 'https://discord.gg/BV7yqg9bRb';
export const VK_LINK = 'https://vk.com/phantomcommunity';
export const WEBSITE_LINK = 'https://phantom-x.info/';
export const PXL_DOWNLOAD_LINK = 'https://phantom-x.info/download'

export const DONT_PING_ME_EMOJI = '<:dontpingme:663925754752663562>';
export const PX_WHITE_EMOJI = '<:PX_White:774766078723096586>';

