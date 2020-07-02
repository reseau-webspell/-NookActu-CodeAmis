import { Command, CommandOptions } from 'axoncore';

class Racine extends Command {
    constructor(module) {
        super(module);

        this.label = 'racine';
        this.aliases = ['racine'];

        this.hasSubcmd = false;

        this.info = {
            owners: ['KhaaZ'],
            name: 'racine',
            description: 'Affiche une liste de personne ayant le PNJ demandé sur leur ile.',
            usage: 'racine [page]',
            examples: ['racine', 'racine 1'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 0,
        } );
    }

    async execute( { msg, args } ) {
        return this.module.pnj(msg, args[0], 'Racine');
    }
}

export default Racine;
