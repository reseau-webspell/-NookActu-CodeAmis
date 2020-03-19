import JsonManager from './JsonManager';

import { Store } from 'axoncore';

class UserDB extends Store {
    constructor(dbLocation) {
        super(new Map() );
        this.manager = new JsonManager(dbLocation);
    }

    async getOrFetch(userID) {
        let user = this.get(userID);
        if (!user) {
            user = await this.fetchOrCreate(userID);
            this.set(userID, user);
        }

        return user;
    }

    fetch(userID) {
        return this.manager.fetchUser(userID);
    }

    create(userID) {
        return this.manager.createUser(userID);
    }

    async fetchOrCreate(userID) {
        let user = await this.fetch(userID);
        if (!user) {
            user = await this.create(userID);
        }
        return user;
    }
}

export default UserDB;
