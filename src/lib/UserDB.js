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

    async addACPC(userID, code) {
        await this.getOrFetch(userID);

        const user = await this.manager.updateUserKey(userID, 'acpc', code);
        this.set(userID, user);
        return user;
    }

    async addDS(userID, code) {
        await this.getOrFetch(userID);

        const user = await this.manager.updateUserKey(userID, 'ds', code);
        this.set(userID, user);
        return user;
    }

    async addSwitch(userID, code) {
        await this.getOrFetch(userID);

        const user = await this.manager.updateUserKey(userID, 'switch', code);
        this.set(userID, user);
        return user;
    }

    async deleteACPC(userID) {
        await this.getOrFetch(userID);

        const user = await this.manager.updateUserKey(userID, 'acpc', 'xxxx-xxxx-xxx');
        this.set(userID, user);
        return user;
    }

    async deleteDS(userID) {
        await this.getOrFetch(userID);

        const user = await this.manager.updateUserKey(userID, 'ds', 'xxxx-xxxx-xxxx');
        this.set(userID, user);
        return user;
    }

    async deleteSwitch(userID) {
        await this.getOrFetch(userID);

        const user = await this.manager.updateUserKey(userID, 'switch', 'SW-xxxx-xxxx-xxxx');
        this.set(userID, user);
        
        return user;
    }

    async deleteAll(userID) {
        const user = await this.getOrFetch(userID);

        user.ds = 'xxxx-xxxx-xxxx';
        user.switch = 'SW-xxxx-xxxx-xxxx';
        user.acpc = 'xxxx-xxxx-xxx';
        this.set(userID, user);
        return this.manager.writeUser(userID, user);
    }
}

export default UserDB;
