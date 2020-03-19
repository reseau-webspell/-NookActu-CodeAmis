import { Command, CommandOptions } from 'axoncore';

class CodeAmiDeleteSwitch extends Command {
    constructor(module) {
        super(module);

        this.label = 'switch';
        this.aliases = ['switch'];

        this.isSubcmd = true;
        this.hasSubcmd = false;

        this.info = {
            owners: ['KhaaZ'],
            name: 'ca delete switch',
            description: 'Supprime le code ami Switch de la personne qui demande.',
            usage: 'ca delete switch',
            examples: ['ca delete switch'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 0,
        } );
    }

    async execute( { msg } ) {
        return this.sendSuccess(msg.channel, 'Code ami delete');
    }
}

export default CodeAmiDeleteSwitch;
