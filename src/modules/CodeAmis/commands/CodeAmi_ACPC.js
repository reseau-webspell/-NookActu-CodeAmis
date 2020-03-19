import { Command, CommandOptions } from 'axoncore';

class CodeAmiACPC extends Command {
    constructor(module) {
        super(module);

        this.label = 'acpc';
        this.aliases = ['acpc', 'ACPC'];

        this.isSubcmd = true;
        this.hasSubcmd = false;

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

export default CodeAmiACPC;
