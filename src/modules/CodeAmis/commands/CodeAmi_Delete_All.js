import { Command, CommandOptions } from 'axoncore';

class CodeAmiDeleteAll extends Command {
    constructor(module) {
        super(module);

        this.label = 'all';
        this.aliases = ['all'];

        this.isSubcmd = true;
        this.hasSubcmd = false;

        this.info = {
            owners: ['KhaaZ'],
            name: 'ca delete all',
            description: 'Supprime tous les codes amis de la personne qui demande.',
            usage: 'ca delete all',
            examples: ['ca delete all'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 0,
        } );
    }

    async execute( { msg } ) {
        try {
            await this.axon.userDB.deleteAll(msg.author.id);
        } catch (err) {
            this.logger.error('CODE-AMIS - ALL: ', err);
            return this.sendError(msg.channel, 'Erreur de suppression du code, contactez un administrateur');
        }

        return this.sendSuccess(msg.channel, 'Tous tes codes ont été supprimé de ton profil !');
    }
}

export default CodeAmiDeleteAll;
