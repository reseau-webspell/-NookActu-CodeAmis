import { Command, CommandOptions } from 'axoncore';

class CodeAmiDeleteACPC extends Command {
    constructor(module) {
        super(module);

        this.label = 'acpc';
        this.aliases = ['acpc', 'ACPC'];

        this.isSubcmd = true;
        this.hasSubcmd = false;

        this.info = {
            owners: ['KhaaZ'],
            name: 'ca delete acpc',
            description: 'Supprime le code ami ACPC de la personne qui demande.',
            usage: 'ca delete acpc',
            examples: ['ca delete acpc'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 0,
        } );
    }

    async execute( { msg } ) {
        return this.sendSuccess(msg.channel, 'Code ami delete');
    }
}

export default CodeAmiDeleteACPC;
