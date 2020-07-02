import { Command, CommandOptions } from 'axoncore';

class Rounard extends Command {
    constructor(module) {
        super(module);

        this.label = 'rounard';
        this.aliases = ['rounard'];

        this.hasSubcmd = false;

        this.info = {
            owners: ['KhaaZ'],
            name: 'rounard',
            description: 'Affiche une liste de personne ayant le PNJ demandé sur leur ile.',
            usage: 'rounard [page]',
            examples: ['rounard', 'rounard 1'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 0,
        } );
    }

    async execute( { msg, args } ) {
        return this.module.pnj(msg, args[0], 'Rounard');
    }
}

export default Rounard;
