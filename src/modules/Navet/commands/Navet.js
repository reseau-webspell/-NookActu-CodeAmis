import { Command, CommandOptions } from 'axoncore';

import Delete from './Navet_Delete';
import Top from './Navet_Top';
import All from './Navet_All';

const MIN_NAVET = 15;
const MAX_NAVET = 800;

class Navet extends Command {
    constructor(module) {
        super(module);

        this.label = 'navet';
        this.aliases = ['navet'];

        this.hasSubcmd = true;

        this.info = {
            owners: ['KhaaZ'],
            name: 'navet',
            description: 'Gerer son cours de Navet.',
            usage: 'navet [cours|user]',
            examples: [
                'navet XXX',
                'navet',
                'navet sendaisies',
            ],
        };

        this.options = new CommandOptions(this, {
            argsMin: 0,
        } );
    }

    init() {
        return [
            Delete,
            Top,
            All,
        ];
    }

    async execute( { msg, args } ) {
        if (args[0] && !isNaN(args[0] ) ) {
            if (args[0] < MIN_NAVET || args[0] > MAX_NAVET) {
                return this.sendError(msg.channel, 'Donnez un cours de navet valide !');
            }
            this.module.navetDB.add(msg.author.id, parseInt(args[0] ) );
            return this.sendSuccess(msg.channel, 'Ton cours de navet a été enregistré !');
        }
        const user = args.length > 0
            ? this.Resolver.member(msg.channel.guild, args)
            : msg.member;
        
        if (!user) {
            return this.sendError(msg.channel, 'Mentionnez un utilisateur valide !');
        }

        const price = this.module.navetDB.get(user.id) || 'N/A';

        if (args.length > 0) {
            return this.sendSuccess(msg.channel, `Le cours de navet actuel de ${user.username} est de **${price}** clochettes !`);
        }
        return this.sendSuccess(msg.channel, `Ton cours de navet actuel est de **${price}** clochettes !`);
    }
}

export default Navet;
