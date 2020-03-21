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

        this.hasSubcmd = true;

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

    init() {
        return [
            DS,
            ACPC,
            Switch,
            All,
        ];
    }

    async execute(env) {
        return this.sendHelp(env);
    }
}

export default CodeAmiDelete;
