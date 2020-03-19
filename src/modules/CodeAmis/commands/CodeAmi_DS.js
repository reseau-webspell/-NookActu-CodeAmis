import { Command, CommandOptions } from 'axoncore';

class CodeAmiDS extends Command {
    constructor(module) {
        super(module);

        this.label = 'ds';
        this.aliases = [
            'ds',
            '3ds',
            'DS',
            '3DS',
        ];

        this.isSubcmd = true;
        this.hasSubcmd = false;

        this.info = {
            owners: ['KhaaZ'],
            name: 'ca 3DS',
            description: 'Ajoute le code ami 3DS de la personne qui demande.',
            usage: 'ca 3DS xxxx-xxxx-xxxx',
            examples: ['ca 3DS xxxx-xxxx-xxxx'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 0,
        } );
    }

    async execute( { msg } ) {
        return this.sendSuccess(msg.channel, 'Code ami');
    }
}

export default CodeAmiDS;
