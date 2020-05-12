import { Command, CommandOptions, CommandResponse } from 'axoncore';

class All extends Command {
    constructor(module) {
        super(module);

        this.label = 'all';
        this.aliases = ['all'];

        this.hasSubcmd = false;

        this.info = {
            owners: ['KhaaZ'],
            name: 'navet all',
            description: 'Voir tout les cours de navet du moment classés par ordre décroissant.',
            usage: 'navet all',
            examples: ['navet all'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 0,
        } );
    }

    async execute( { msg, args } ) {
        const chunk = args[0] || 1;
        if (this.module.navetDB.cache.length < (chunk - 1) * 10) {
            return this.sendError(msg.channel, 'Page invalide !');
        }
        
        const date = new Date();

        const all = [];
        for (const e of this.module.navetDB.cache) {
            const user = msg.channel.guild.members.get(e.id);
            if (!user) {
                this.axon.navetDB.delete(e.id);
            }
            if (!this.module.navetDB.isExpired(e) ) {
                e.username = user.username;
                all.push(e);
            }
        }
        const display = this.chunk(all, chunk).map( (u, i) => `${( (chunk - 1) * 10) + i + 1}) [${u.username}] - [${u.price}]`);
        await this.sendMessage(msg.channel, {
            embed: {
                timestamp: date,
                title: 'Tous les cours du navet',
                description: `*Classé dans l'ordre des prix décroissants*\n*Journée du [${date.getDate()}/${date.getMonth() + 1}]*\n\n${display.join('\n')}`,
                color: 5301186,
            },
        } );
        return new CommandResponse( { success: true } );
    }

    chunk(arr, i) {
        return arr.slice( (i - 1) * 10, 10);
    }
}

export default All;
