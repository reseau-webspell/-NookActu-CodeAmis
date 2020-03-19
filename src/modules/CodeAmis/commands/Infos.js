import { Command, CommandOptions, CommandPermissions } from 'axoncore';

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
        return this.sendDM(msg.author, {
            embed: {
                title: 'Commandes',
                description: '``!ca`` Affiche tes codes amis \n``!ca @mention`` Affiche les codes amis de la personne mentionnée\n``!ca 3DS xxxx-xxxx-xxxx`` Ajoute ton code ami 3DS \n``!ca acpc xxxx-xxxx-xxx`` Ajoute ton code ami Animal Crossing: Pocket Camp\n``!ca switch SW-xxxx-xxxx-xxxx`` Ajoute ton code ami Switch \n``!ca delete 3DS`` Supprime ton code ami 3DS\n``!ca delete acpc`` Supprime ton code ami Animal Crossing: Pocket Camp \n``!ca delete switch`` Supprime ton code ami Switch\n``!ca delete all`` Supprime tous tes codes amis \n``!info`` Afficher les commandes du bot ',
                color: 10208253,
            },
        } );
    }
}

export default Infos;
