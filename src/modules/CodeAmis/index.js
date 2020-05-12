import { Module, CommandPermissions } from 'axoncore';

import UserDB from '../../lib/UserDB';

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

        this.userDB = new UserDB(this.axon._DBLocation);
    }

    init() {
        return { commands };
    }
}

export default CodeAmis;
