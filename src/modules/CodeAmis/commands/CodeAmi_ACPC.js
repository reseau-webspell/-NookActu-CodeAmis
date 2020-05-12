import { Command, CommandOptions } from 'axoncore';

class CodeAmiACPC extends Command {
    constructor(module) {
        super(module);

        this.label = 'acpc';
        this.aliases = ['acpc', 'ACPC'];

        this.hasSubcmd = false;

        this.info = {
            owners: ['KhaaZ'],
            name: 'ca acpc',
            description: 'Ajoute le code ami pocket camp de la personne qui demande.',
            usage: 'ca acpc xxxx-xxxx-xxx',
            examples: ['ca acpc 0000-0000-000'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 1,
        } );

        this.format = /^[0-9]{4}-[0-9]{4}-[0-9]{3}$/;
    }

    async execute( { msg, args } ) {
        if (!this.format.test(args[0] ) ) {
            return this.sendError(msg.channel, 'Ce code ami n\'est pas du bon format, il doit etre de type: `0000-0000-000`');
        }

        try {
            await this.module.userDB.addACPC(msg.author.id, args[0] );
        } catch (err) {
            this.logger.error('CODE-AMIS - ACPC: ', err);
            return this.sendError(msg.channel, 'Erreur d\'ajout du code, contactez un administrateur');
        }

        return this.sendSuccess(msg.channel, 'Ton code ami Animal Crossing: Pocket Camp a été ajouté !');
    }
}

export default CodeAmiACPC;
