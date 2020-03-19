import { Command, CommandOptions } from 'axoncore';

class CodeAmiDeleteACPC extends Command {
    constructor(module) {
        super(module);

        this.label = 'acpc';
        this.aliases = ['acpc', 'ACPC'];

        this.isSubcmd = true;
        this.hasSubcmd = false;

        this.info = {
            owners: ['KhaaZ'],
            name: 'ca delete acpc',
            description: 'Supprime le code ami ACPC de la personne qui demande.',
            usage: 'ca delete acpc',
            examples: ['ca delete acpc'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 0,
        } );
    }

    async execute( { msg } ) {
        try {
            await this.axon.userDB.deleteACPC(msg.author.id);
        } catch (err) {
            this.logger.error('CODE-AMIS - ACPC: ', err);
            return this.sendError(msg.channel, 'Erreur de suppression du code, contactez un administrateur');
        }

        return this.sendSuccess(msg.channel, 'Ton code ami Animal Crossing: Pocket Camp a été supprimé de ton profil !');
    }
}

export default CodeAmiDeleteACPC;
