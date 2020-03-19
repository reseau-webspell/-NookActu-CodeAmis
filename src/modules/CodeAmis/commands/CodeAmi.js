import { Command, CommandOptions } from 'axoncore';

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
        this.subcmds = [
            Delete,
            DS,
            ACPC,
            Switch,
        ];

        this.info = {
            owners: ['KhaaZ'],
            name: 'ca',
            description: 'Affiche les codes ami d\'une personne.',
            usage: 'ca <user>',
            examples: ['ca', 'ca @Sendaisies'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 0,
            sendUsageMessage: true,
        } );
    }

    async execute( { msg, args } ) {
        console.log('ARGS', args);
        const user = args.length === 0
            ? msg.author
            : this.Resolver.member(msg.channel.guild, args);
        if (!user) {
            return this.sendError(msg.channel, 'Mentionnez un utilisateur valide!');
        }
        const codeAmis = await this.axon.userDB.getOrFetch(user.id);
        return this.sendSuccess(msg.channel, `Code amis pour ${user.username}:\nDS: ${codeAmis.ds}\nACPC: ${codeAmis.acpc}\nSwitch: ${codeAmis.switch}`);
    }
}

export default CodeAmi;
