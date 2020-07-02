import { Command, CommandOptions } from 'axoncore';

class Delete extends Command {
    constructor(module) {
        super(module);

        this.label = 'delete';
        this.aliases = ['delete'];

        this.hasSubcmd = false;

        this.info = {
            owners: ['KhaaZ'],
            name: 'delete',
            description: 'Indique que le PNJ en question n\'est plus sur ton ile.',
            usage: 'delete [pnj<blaise, celeste, racine, rounard, sarah>]',
            examples: [
                'delete celeste',
                'delete rounard',
                'delete sarah',
            ],
        };

        this.options = new CommandOptions(this, {
            argsMin: 1,
        } );
    }

    async execute( { msg, args } ) {
        const pnj = this.module.PNJs.find(e => e.toLowerCase() === args[0].toLowerCase() );
        if (!pnj) {
            return this.sendError(msg.channel, 'Donnez un PNJ valide !');
        }

        this.module.pnjDB.delete(pnj.toLowerCase(), msg.author.id);

        return this.sendMessage(msg.channel, `:x: ${pnj} n'est plus sur ton île, c'est noté !`);
    }
}

export default Delete;
