import { Command, CommandOptions } from 'axoncore';

class Add extends Command {
    constructor(module) {
        super(module);

        this.label = 'add';
        this.aliases = ['add'];

        this.hasSubcmd = false;

        this.info = {
            owners: ['KhaaZ'],
            name: 'add',
            description: 'Indique que tu as le PNJ en question sur ton ile.',
            usage: 'add [pnj<blaise, celeste, racine, rounard, sarah>]',
            examples: [
                'add celeste',
                'add rounard',
                'add sarah',
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

        this.module.pnjDB.add(pnj.toLowerCase(), msg.author.id);

        return this.sendMessage(msg.channel, `:white_check_mark: ${pnj} se trouve actuellement sur ton île, c'est noté !`);
    }
}

export default Add;
