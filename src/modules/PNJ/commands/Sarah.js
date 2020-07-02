import { Command, CommandOptions, CommandPermissions } from 'axoncore';

class Sarah extends Command {
    constructor(module) {
        super(module);

        this.label = 'sarah';
        this.aliases = ['sarah'];

        this.hasSubcmd = false;

        this.info = {
            owners: ['KhaaZ'],
            name: 'sarah',
            description: 'Affiche une liste de personne ayant le PNJ demandé sur leur ile.',
            usage: 'sarah [page]',
            examples: ['sarah', 'sarah 1'],
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
        return this.module.pnj(msg, args[0], 'Sarah');
    }
}

export default Sarah;
