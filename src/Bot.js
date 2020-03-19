import Eris from 'eris';

import { AxonOptions } from 'axoncore';

import NookClient from './NookClient';

import botConfig from './configs/config.json';
import secret from './configs/secret.json';
import lang from './configs/lang.json';

import NookUtils from './NookUtils';

const axonOptions = new AxonOptions( {
    prefixes: botConfig.prefixes,
    settings: botConfig.settings,
    lang,
    logo: null,

    info: botConfig.info,
    staff: botConfig.staff,
    template: botConfig.template,
    custom: { },
},
secret.webhooks,
{
    utils: NookUtils, // use your own Utils
    logger: null, // custom Logger
    DBProvider: null, // custom DB Service
    DBLocation: `${__dirname}/../database/`,

    axonConfig: null,
    guildConfig: null,
} );

/**
 * new AxonClient(token, erisOptions, AxonOptions, modules)
 *
 * new Client(token, erisOptions, AxonOptions) => Modules imported in Client
 */
const client = new Eris.Client(
    secret.bot.token,
    {
        autoreconnect: true,
        defaultImageFormat: 'png',
        defaultImageSize: 512,
        disableEveryone: true,
        getAllUsers: true,
        messageLimit: 100,
        restMode: true,
        disableEvents: {
            TYPING_START: true,
        },
    },
);

const Bot = new NookClient(
    client,
    axonOptions,
);

export default Bot;
