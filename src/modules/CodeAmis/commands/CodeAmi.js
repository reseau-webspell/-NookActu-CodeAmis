import { Command, CommandOptions } from 'axoncore';

import Delete from './CodeAmi_Delete';

class CodeAmi extends Command {
    constructor(module) {
        super(module);

        this.label = 'codeami';
        this.aliases = ['ca'];

        this.hasSubcmd = true;
        this.subcmds = [Delete];

        this.info = {
            owners: ['KhaaZ'],
            name: 'ca',
            description: 'Affiche les codes ami d\'une personne.',
            usage: 'ca',
            examples: ['ca'],
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
