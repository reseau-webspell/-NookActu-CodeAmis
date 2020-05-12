import { Command, CommandOptions } from 'axoncore';

class Delete extends Command {
    constructor(module) {
        super(module);

        this.label = 'delete';
        this.aliases = ['delete', 'del'];

        this.hasSubcmd = false;

        this.info = {
            owners: ['KhaaZ'],
            name: 'navet delete',
            description: 'Supprime son cours du navet.',
            usage: 'navet delete',
            examples: ['navet delete'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 0,
        } );
    }

    async execute( { msg } ) {
        this.module.navetDB.delete(msg.author.id);
        return this.sendSuccess(msg.channel, 'Ton cours de navet a été supprimé !');
    }
}

export default Delete;
