import { Command, CommandOptions } from 'axoncore';

class CodeAmiDS extends Command {
    constructor(module) {
        super(module);

        this.label = 'ds';
        this.aliases = [
            'ds',
            '3ds',
            'DS',
            '3DS',
        ];

        this.hasSubcmd = false;

        this.info = {
            owners: ['KhaaZ'],
            name: 'ca 3DS',
            description: 'Ajoute le code ami 3DS de la personne qui demande.',
            usage: 'ca 3DS xxxx-xxxx-xxxx',
            examples: ['ca 3DS 0000-0000-0000'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 1,
            sendUsageMessage: true,
        } );

        this.format = /^[0-9]{4}-[0-9]{4}-[0-9]{4}$/;
    }

    async execute( { msg, args } ) {
        if (!this.format.test(args[0] ) ) {
            return this.sendError(msg.channel, 'Ce code ami n\'est pas du bon format, il doit etre de type: `0000-0000-0000`');
        }

        try {
            await this.axon.userDB.addDS(msg.author.id, args[0] );
        } catch (err) {
            this.logger.error('CODE-AMIS - 3DS: ', err);
            return this.sendError(msg.channel, 'Erreur d\'ajout du code, contactez un administrateur');
        }

        return this.sendSuccess(msg.channel, 'Ton code ami 3DS a été ajouté !');
    }
}

export default CodeAmiDS;
