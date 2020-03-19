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
            name: 'ca delete',
            description: 'Supprime un code ami.',
            usage: 'ca delete',
            examples: ['ca delete'],
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
