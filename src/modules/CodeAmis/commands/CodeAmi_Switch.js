import { Command, CommandOptions } from 'axoncore';

class CodeAmiSwitch extends Command {
    constructor(module) {
        super(module);

        this.label = 'switch';
        this.aliases = ['switch'];

        this.isSubcmd = true;
        this.hasSubcmd = false;

        this.info = {
            owners: ['KhaaZ'],
            name: 'ca switch',
            description: 'Ajoute le code ami Switch de la personne qui demande.',
            usage: 'ca switch SW-xxxx-xxxx-xxxx',
            examples: ['ca switch SW-xxxx-xxxx-xxxx'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 0,
        } );
    }

    async execute( { msg } ) {
        return this.sendSuccess(msg.channel, 'Code ami');
    }
}

export default CodeAmiSwitch;
