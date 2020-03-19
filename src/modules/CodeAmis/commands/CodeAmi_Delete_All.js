import { Command, CommandOptions } from 'axoncore';

class CodeAmiDeleteAll extends Command {
    constructor(module) {
        super(module);

        this.label = 'all';
        this.aliases = ['all'];

        this.isSubcmd = true;
        this.hasSubcmd = false;

        this.info = {
            owners: ['KhaaZ'],
            name: 'ca delete all',
            description: 'Supprime tous les codes amis de la personne qui demande.',
            usage: 'ca delete all',
            examples: ['ca delete all'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 0,
        } );
    }

    async execute( { msg } ) {
        return this.sendSuccess(msg.channel, 'Code ami delete');
    }
}

export default CodeAmiDeleteAll;
