import { Command, CommandOptions, CommandPermissions, CommandResponse } from 'axoncore';

class Infos extends Command {
    constructor(module) {
        super(module);

        this.label = 'infos';
        this.aliases = ['infos', 'info'];

        this.hasSubcmd = false;

        this.info = {
            owners: ['KhaaZ'],
            name: 'infos',
            description: 'Affiche toutes les commandes.',
            usage: 'infos',
            examples: ['infos'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 0,
        } );

        this.permissions = new CommandPermissions(this, {
            bot: ['sendMessages', 'embedLinks'],
        } );
    }

    async execute( { msg } ) {
        await this.sendDM(msg.author, {
            embed: {
                fields: [
                    {
                        name: 'Codes amis',
                        value: 'Utilise ces commandes dans le salon #codes-amis du serveur.\n\n``!ca`` Affiche tes codes amis\n``!ca @mention`` Affiche les codes amis de la personne mentionnée\n``!ca 3DS xxxx-xxxx-xxxx`` Ajoute ton code ami 3DS\n``!ca acpc xxxx-xxxx-xxx`` Ajoute ton code ami Animal Crossing: Pocket Camp\n``!ca switch SW-xxxx-xxxx-xxxx`` Ajoute ton code ami Switch\n``!ca delete 3DS`` Supprime ton code ami 3DS\n``!ca delete acpc`` Supprime ton code ami Animal Crossing: Pocket Camp\n``!ca delete switch`` Supprime ton code ami Switch\n``!ca delete all`` Supprime tous tes codes amis',
                        inline: false,
                    },
                    {
                        name: 'Navets',
                        value: "Utilise ces commandes dans le salons #navets du serveur.\n\n``!navet XXX`` : Ajouter son cours du navet\n``!navet`` : Voir son cours du navet\n``!navet @user`` : Voir le cours du navet d'un membre\n``!navet delete`` : Supprime son cours du navet actuel\n``!navet all`` : Voir tout les cours du navet du moment classés par ordre décroissant\n``!navet top`` : Afficher les 5 meilleurs cours du navet actuel",
                        inline: false,
                    },
                    {
                        name: 'PNJs',
                        value: "Utilise ces commandes dans le salon PNJ du serveur.\n\n``!add celeste`` / ``!add racine`` / ``!add blaise`` / ``!add sarah`` / ``!add rounard`` \nIndique que tu as le PNJ en question sur ton île\n\n``!delete celeste`` / ``!delete racine`` / ``!delete blaise`` / ``!delete sarah`` / ``!delete rounard``\nIndique que tu as le PNJ en question n'est plus sur ton île\n\n``!celeste`` / ``!racine`` / ``!blaise`` / ``!sarah`` / ``!rounard``\nAffiche une liste des personnes ayant le PNJ demandé sur leur île",
                        inline: false,
                    },
                ],
                title: 'Commandes',
                description: 'Tape !infos dans le salon #bot sur le serveur pour recevoir les commandes du bot en message privé.',
                color: 5301186,
            },
        } ).catch( () => console.log('MISSING DM PERMS') );
        return new CommandResponse( { success: true } );
    }
}

export default Infos;
