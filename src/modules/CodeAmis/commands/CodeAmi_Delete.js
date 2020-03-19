import { Command, CommandOptions } from 'axoncore';

import DS from './CodeAmi_Delete_DS';
import ACPC from './CodeAmi_Delete_ACPC';
import Switch from './CodeAmi_Delete_Switch';
import All from './CodeAmi_Delete_All';

class CodeAmiDelete extends Command {
    constructor(module) {
        super(module);

        this.label = 'delete';
        this.aliases = ['remove', 'suppr'];

        this.isSubcmd = true;
        this.hasSubcmd = true;
        this.subcmds = [
            DS,
            ACPC,
            Switch,
            All,
        ];

        this.info = {
            owners: ['KhaaZ'],
            name: 'ca delete',
            description: 'Supprime un code ami',
            usage: 'ca delete',
            examples: ['ca delete'],
        };

        this.options = new CommandOptions(this, {
            argsMin: 0,
        } );
    }

    async execute( { msg } ) {
        return this.sendSuccess(msg.channel, 'Code ami delete');
    }
}

export default CodeAmiDelete;
