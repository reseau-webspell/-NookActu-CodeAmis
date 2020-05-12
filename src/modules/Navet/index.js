import { Module } from 'axoncore';

import * as commands from './commands/index';
import NavetDB from '../../lib/NavetDB';

class Navet extends Module {
    constructor(...args) {
        super(...args);

        this.label = 'Navet';

        this.enabled = true;
        this.serverBypass = true;

        this.info = {
            name: 'navet',
            description: 'The Navet module (check navet trend).',
        };

        this.navetDB = new NavetDB(this.axon.custom.DBLocation);
    }

    init() {
        return { commands };
    }
}

export default Navet;
