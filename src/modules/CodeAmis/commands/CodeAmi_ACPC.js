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
            name: 'ca acpc',
            description: 'Ajoute le code ami pocket camp de la personne qui demande.',
            usage: 'ca acpc xxxx-xxxx-xxx',
            examples: ['ca acpc xxxx-xxxx-xxx'],
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
