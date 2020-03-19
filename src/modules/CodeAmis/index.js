import { Module, CommandPermissions } from 'axoncore';

import * as commands from './commands/index';
// import * as listeners from './commands/index';

class CodeAmis extends Module {
    constructor(...args) {
        super(...args);

        this.label = 'CodeAmis';

        this.enabled = true;
        this.serverBypass = true;

        this.info = {
            name: 'Code-Amis',
            description: 'Code Amis module - add / remove code amis',
        };

        this.permissions = new CommandPermissions(this, {}, true);
    }

    init() {
        return { commands };
    }
}

export default CodeAmis;
