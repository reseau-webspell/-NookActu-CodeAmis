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
            cooldown: 7000,
            argsMin: 0,
        } );
    }

    async execute( { msg, args } ) {
        const chunk = this.calculateChunk(args[0] || 1);
        if (this.module.navetDB.cache.length < chunk) {
            return this.sendError(msg.channel, 'Page invalide !', { triggerCooldown: false } );
        }
        
        const date = new Date();

        const all = [];
        for (const e of this.module.navetDB.cache) {
            const user = msg.channel.guild.members.get(e.id);
            if (!user) {
                this.module.navetDB.delete(e.id);
            }
            if (!this.module.navetDB.isExpired(e) ) {
                all.push( { username: user.username, price: e.price } );
            }
        }
        const display = this.chunk(all, chunk).map( (u, i) => `${chunk + i + 1}) [${u.username}] - [${u.price}]`);
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

    calculateChunk(i) {
        return (i - 1) * 10;
    }

    chunk(arr, start) {
        const end = start + 10;
        return arr.slice(start, end);
    }
}

export default All;
