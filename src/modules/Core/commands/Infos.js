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
                title: 'Commandes',
                description: 'Tape ``!info`` dans le salon #paramètres sur le serveur pour recevoir les commandes du bot en message privé.',
                color: 10208253,
                fields: [
                    {
                        name: 'Codes amis',
                        value: '``!ca`` Affiche tes codes amis \n``!ca @mention`` Affiche les codes amis de la personne mentionnée\n``!ca 3DS xxxx-xxxx-xxxx`` Ajoute ton code ami 3DS \n``!ca acpc xxxx-xxxx-xxx`` Ajoute ton code ami Animal Crossing: Pocket Camp\n``!ca switch SW-xxxx-xxxx-xxxx`` Ajoute ton code ami Switch \n``!ca delete 3DS`` Supprime ton code ami 3DS\n``!ca delete acpc`` Supprime ton code ami Animal Crossing: Pocket Camp \n``!ca delete switch`` Supprime ton code ami Switch\n``!ca delete all`` Supprime tous tes codes amis ',
                        inline: false,
                    },
                    {
                        name: 'Navets',
                        value: "``!navet XXX`` : Ajouter son cours du navet\n``!navet`` : Voir son cours du navet\n``!navet @user`` : Voir le cours du navet d'un membre\n``!navet delete`` : Supprime son cours du navet actuel\n``!navet all`` : Voir tout les cours du navet du moment classés par ordre décroissant\n``!navet top`` : Afficher les 5 meilleurs cours du navet actuel",
                        inline: false,
                    },
                ],
            },
        } );
        return new CommandResponse( { success: true } );
    }
}

export default Infos;
