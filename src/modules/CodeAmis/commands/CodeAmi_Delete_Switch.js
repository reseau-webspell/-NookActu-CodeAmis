import { Command, CommandOptions } from 'axoncore';

class CodeAmiDeleteSwitch extends Command {
    constructor(module) {
        super(module);

        this.label = 'switch';
        this.aliases = ['switch'];

        this.isSubcmd = true;
        this.hasSubcmd = false;

        this.info = {
            owners: ['KhaaZ'],
            name: 'ca delete switch',
            description: 'Supprime le code ami Switch de la personne qui demande.',
            usage: 'ca delete switch',
            examples: ['ca delete switch'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 0,
        } );
    }

    async execute( { msg } ) {
        try {
            await this.axon.userDB.deleteSwitch(msg.author.id);
        } catch (err) {
            this.logger.error('CODE-AMIS - ACPC: ', err);
            return this.sendError(msg.channel, 'Erreur de suppression du code, contactez un administrateur');
        }

        return this.sendSuccess(msg.channel, 'Ton code ami Switch a été supprimé de ton profil !');
    }
}

export default CodeAmiDeleteSwitch;
