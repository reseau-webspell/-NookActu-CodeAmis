import { Command, CommandOptions, CommandPermissions } from 'axoncore';

class Celeste extends Command {
    constructor(module) {
        super(module);

        this.label = 'celeste';
        this.aliases = ['celeste'];

        this.hasSubcmd = false;

        this.info = {
            owners: ['KhaaZ'],
            name: 'celeste',
            description: 'Affiche une liste de personne ayant le PNJ demandé sur leur ile.',
            usage: 'celeste [page]',
            examples: ['celeste', 'celeste 1'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 0,
        } );

        this.permissions = new CommandPermissions(this, {
            guilds: {
                needed: ['444277614346108939'],
            },
        } );
    }

    async execute( { msg, args } ) {
        return this.module.pnj(msg, args[0], 'Celeste');
    }
}

export default Celeste;
