import Worker from './Worker';


const RESET_POINT = 5;
// eslint-disable-next-line no-magic-numbers
const DAY = 24 * 3600 * 1000;

class PNJDB {
    constructor(dbLocation) {
        this.worker = new Worker(this, dbLocation, 'PNJ');
        this.cache = {
            celeste: [],
            racine: [],
            blaise: [],
            sarah: [],
            rounard: [],
        };
        this.loadCache();
    }

    async loadCache() {
        this.cache = await this.worker.readDB() || this.cache;
    }

    getAll(pnj) {
        return this.cache[pnj].filter(e => !this.isExpired(pnj, e) );
    }

    get(pnj, userID) {
        const user = this.cache[pnj].find(u => u.id === userID);
        if (!user) {
            return null;
        }

        if (this.isExpired(pnj, user) ) {
            return null;
        }
        
        return user.price;
    }

    add(pnj, userID, state = true) {
        if (state) {
            this.delete(pnj, userID);
            this.cache[pnj].push( {
                id: userID,
                expiryDate: this.getExpiryDate(),
            } );
        } else {
            this.delete(pnj, userID);
        }
    }

    delete(pnj, userID) {
        const index = this.cache[pnj].findIndex(e => e.id === userID);
        if (index !== -1) {
            this.cache[pnj].splice(index, 1);
        }
    }

    isExpired(pnj, user) {
        if (Date.now() > user.expiryDate) {
            this.delete(pnj, user.id);
            return true;
        }
        return false;
    }

    getExpiryDate() {
        const today = new Date();
        const now = Date.now();
        const todayReset = Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate(), RESET_POINT) );
        if (now < todayReset) {
            return todayReset;
        }
        return todayReset + DAY;
    }
}

export default PNJDB;
