import { Command, CommandOptions, CommandPermissions, CommandResponse } from 'axoncore';

import Delete from './CodeAmi_Delete';
import DS from './CodeAmi_DS';
import ACPC from './CodeAmi_ACPC';
import Switch from './CodeAmi_Switch';

class CodeAmi extends Command {
    constructor(module) {
        super(module);

        this.label = 'codeami';
        this.aliases = ['codeami', 'ca'];

        this.hasSubcmd = true;

        this.info = {
            owners: ['KhaaZ'],
            name: 'ca',
            description: 'Affiche les codes amis d\'une personne.',
            usage: 'ca <user>',
            examples: ['ca', 'ca @Sendaisies'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 0,
        } );

        this.permissions = new CommandPermissions(this, {
            bot: ['sendMessages', 'embedLinks'],
        } );
    }

    init() {
        return [
            Delete,
            DS,
            ACPC,
            Switch,
        ];
    }

    async execute( { msg, args } ) {
        const user = args.length === 0
            ? msg.author
            : this.Resolver.member(msg.channel.guild, args);
        if (!user) {
            return this.sendError(msg.channel, 'Mentionnez un utilisateur valide!');
        }
        const codeAmis = await this.module.userDB.getOrFetch(user.id);
        
        this.sendMessage(msg.channel, {
            embed: {
                fields: [
                    { name: '**[CODE 3DS]**', value: codeAmis.ds, inline: true },
                    { name: '**[CODE SWITCH]**', value: codeAmis.switch, inline: true },
                    { name: '**[CODE ACPC]**', value: codeAmis.acpc, inline: false },
                ],
                thumbnail: {
                    url: user.avatarURL,
                },
                author: { name: `Codes amis de ${user.username}#${user.discriminator}`, icon_url: '' },
                color: 10076927,
            },
        } );
        return new CommandResponse( { success: true } );
    }
}

export default CodeAmi;
