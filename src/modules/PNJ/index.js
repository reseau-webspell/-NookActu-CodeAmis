import { Module } from 'axoncore';

import * as commands from './commands/index';
import PNJDB from '../../lib/PNJDB';

class PNJ extends Module {
    constructor(...args) {
        super(...args);

        this.label = 'Pnj';

        this.enabled = true;
        this.serverBypass = true;

        this.info = {
            name: 'pnj',
            description: 'The PNJ module (check pnj status).',
        };

        this.pnjDB = new PNJDB(this.axon.custom.DBLocation);

        this.PNJs = [
            'Blaise',
            'Celeste',
            'Racine',
            'Rounard',
            'Sarah',
        ];
    }

    init() {
        return { commands };
    }

    pnj(msg, page, pnj) {
        const chunk = this.calculateChunk(page || 1);
    
        const users = this.pnjDB.getAll(pnj.toLowerCase() );
        if (users.length < chunk) {
            return this.sendError(msg.channel, 'Page invalide !', { triggerCooldown: false } );
        }

        const date = new Date();

        const all = users.map(u => {
            const user = msg.channel.guild.members.get(u.id);
            if (!user) {
                this.module.navetDB.delete(u.id);
            }
            return user.username;
        } );

        const display = this.chunk(all, chunk)
            .map( (u, i) => `${chunk + i + 1}) [${u}]`);
        
        if (display.length < 1) {
            return this.sendError(msg.channel, `Personne n'a enregistré avoir ${pnj} sur son ile pour le moment.`);
        }

        return this.sendMessage(msg.channel, {
            embed: {
                timestamp: date,
                title: 'Céleste',
                description: `*Liste des joueurs ayant ${pnj} sur leur île !*\n\n${display.join('\n')}`,
                color: 5301186,
            },
        } );
    }

    calculateChunk(i) {
        return (i - 1) * 10;
    }

    chunk(arr, start) {
        const end = start + 10;
        return arr.slice(start, end);
    }
}

export default PNJ;
