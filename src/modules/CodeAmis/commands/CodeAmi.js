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
        } );
    }

    async execute( { msg } ) {
        return this.sendSuccess(msg.channel, 'Code ami');
    }
}

export default CodeAmi;
