import { Command, CommandOptions } from 'axoncore';

class CodeAmiSwitch extends Command {
    constructor(module) {
        super(module);

        this.label = 'switch';
        this.aliases = ['switch'];

        this.hasSubcmd = false;

        this.info = {
            owners: ['KhaaZ'],
            name: 'ca switch',
            description: 'Ajoute le code ami Switch de la personne qui demande.',
            usage: 'ca switch SW-xxxx-xxxx-xxxx',
            examples: ['ca switch SW-0000-0000-0000'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 1,
            sendUsageMessage: true,
        } );

        this.format = /^SW-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;
    }

    async execute( { msg, args } ) {
        if (!this.format.test(args[0] ) ) {
            return this.sendError(msg.channel, 'Ce code ami n\'est pas du bon format, il doit etre de type: `SW-0000-0000-0000`');
        }

        try {
            await this.axon.userDB.addSwitch(msg.author.id, args[0] );
        } catch (err) {
            this.logger.error('CODE-AMIS - Switch: ', err);
            return this.sendError(msg.channel, 'Erreur d\'ajout du code, contactez un administrateur');
        }

        return this.sendSuccess(msg.channel, 'Ton code ami Switch a été ajouté !');
    }
}

export default CodeAmiSwitch;
