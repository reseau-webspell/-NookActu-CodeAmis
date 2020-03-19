import { Command, CommandOptions } from 'axoncore';

class CodeAmiDeleteDS extends Command {
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
            name: 'ca delete 3DS',
            description: 'Supprime le code ami 3DS de la personne qui demande.',
            usage: 'ca delete 3DS',
            examples: ['ca delete 3DS'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 0,
        } );
    }

    async execute( { msg } ) {
        return this.sendSuccess(msg.channel, 'Code ami delete');
    }
}

export default CodeAmiDeleteDS;
