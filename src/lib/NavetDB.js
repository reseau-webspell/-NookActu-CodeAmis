import NavetWorker from './NavetWorker';


const RESET_POINT_NOON = 12;
const RESET_POINT_EVENING = 22;
// eslint-disable-next-line no-magic-numbers
const DAY = 24 * 3600 * 1000;

const PARIS_TIME = 2; // UTC+2

class NavetDB {
    constructor(dbLocation) {
        this.worker = new NavetWorker(this, dbLocation);
        this.cache = [];
        this.loadCache();
    }

    async loadCache() {
        this.cache = await this.worker.readDB() || [];
    }

    get(userID) {
        const user = this.cache.find(u => u.id === userID);
        if (!user) {
            return null;
        }

        if (this.isExpired(user) ) {
            return null;
        }
        
        return user.price;
    }

    add(userID, price) {
        const index = this.cache.findIndex(e => e.id === userID);
        if (index !== -1) {
            this.cache.splice(index, 1);
        }
        this.insertOrdered( {
            id: userID,
            price,
            expiryDate: this.getExpiryDate(),
        } );
    }

    insertOrdered(user) {
        const index = this.cache.findIndex(e => e.price <= user.price);
        if (index === -1) {
            this.cache.push(user);
        } else {
            this.cache.splice(index, 0, user);
        }
    }

    delete(userID) {
        const index = this.cache.findIndex(e => e.id === userID);
        this.cache.splice(index, 1);
    }

    isExpired(user) {
        if (Date.now() > user.expiryDate) {
            this.delete(user.id);
            return true;
        }
        return false;
    }

    getExpiryDate() {
        const today = new Date();
        const now = Date.now();
        const todayNoon = Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate(), RESET_POINT_NOON + PARIS_TIME) );
        const todayEvening = Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate(), RESET_POINT_EVENING + PARIS_TIME) );
        if (now < todayNoon) {
            return todayNoon;
        }
        if (now < todayEvening) {
            return todayEvening;
        }
        return todayNoon + DAY;
    }
}

export default NavetDB;
