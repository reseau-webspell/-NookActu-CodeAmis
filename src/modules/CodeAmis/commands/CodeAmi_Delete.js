import { Command, CommandOptions, CommandResponse } from 'axoncore';

class CodeAmi_Delete extends Command {
    constructor(module) {
        super(module);

        this.label = 'delete';
        this.aliases = [
            'remove',
            'suppr',
        ];

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

export default CodeAmi_Delete;
