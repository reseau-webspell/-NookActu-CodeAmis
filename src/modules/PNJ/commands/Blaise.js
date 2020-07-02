import { Command, CommandOptions, CommandPermissions } from 'axoncore';

class Blaise extends Command {
    constructor(module) {
        super(module);

        this.label = 'blaise';
        this.aliases = ['blaise'];

        this.hasSubcmd = false;

        this.info = {
            owners: ['KhaaZ'],
            name: 'blaise',
            description: 'Affiche une liste de personne ayant le PNJ demandé sur leur ile.',
            usage: 'blaise [page]',
            examples: ['blaise', 'blaise 1'],
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
        return this.module.pnj(msg, args[0], 'Blaise');
    }
}

export default Blaise;
