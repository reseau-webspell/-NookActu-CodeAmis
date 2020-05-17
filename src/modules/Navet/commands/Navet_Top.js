import { Command, CommandOptions, CommandResponse, CommandPermissions } from 'axoncore';

class Top extends Command {
    constructor(module) {
        super(module);

        this.label = 'top';
        this.aliases = ['top'];

        this.hasSubcmd = false;

        this.info = {
            owners: ['KhaaZ'],
            name: 'navet top',
            description: 'Affiche les 5 meilleurs cours de navet actuel.',
            usage: 'navet top',
            examples: ['navet top'],
        };

        this.options = new CommandOptions(this, {
            cooldown: 5000,
            argsMin: 0,
            sendPermissionMessage: true,
            invalidPermissionMessage: 'Cette commande est limitee au serveur NookActus.',
        } );

        this.permissions = new CommandPermissions(this, {
            guilds: ['444277614346108939'],
        } );
    }

    async execute( { msg } ) {
        const date = new Date();

        const top5 = [];
        for (const e of this.module.navetDB.cache) {
            const user = msg.channel.guild.members.get(e.id);
            if (!user) {
                this.module.navetDB.delete(e.id);
            }
            if (!this.module.navetDB.isExpired(e) ) {
                top5.push( { id: e.id, price: e.price } );
            }
            if (top5.length === 5) {
                break;
            }
        }
        const display = top5.map( (u, i) => `${i + 1}) [<@${u.id}>] - [${u.price}]`);
        if (display.length < 1) {
            return this.sendError(msg.channel, 'Personne n\'a de cours de navet enregistré pour le moment.');
        }
        
        await this.sendMessage(msg.channel, {
            embed: {
                timestamp: date,
                title: '5 meilleurs cours du navet',
                description: `*Classé dans l'ordre des prix décroissants*\n*Journée du [${date.getDate()}/${date.getMonth() + 1}]*\n\n${display.join('\n')}`,
                color: 5301186,
            },
        } );

        return new CommandResponse( { success: true } );
    }
}

export default Top;
