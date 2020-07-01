import fs from 'fs';
import util from 'util';

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const SAVE_ROTATION = 10;
// eslint-disable-next-line no-magic-numbers
const MINUTE = 60 * 1000;

class Worker {
    constructor(DBcache, dbLocation, dbName) {
        this.db = DBcache;
        this.interval = SAVE_ROTATION * MINUTE;
        this.dbName = dbName;
        this.path = `${dbLocation}${dbName}DB.json`;

        if (!fs.existsSync(dbLocation) ) {
            console.log('The DB directory doesn\'t exist. Creating...');
            fs.mkdirSync(dbLocation, { recursive: true } );
            console.log('DB directory created');
        }
        this.init();
    }

    init() {
        setInterval( () => {
            this.saveDB();
            console.log(`Saving ${this.dbName} DB...`);
        }, this.interval);
    }

    async saveDB() {
        try {
            await writeFileAsync(this.path, this.toString(this.db.cache), 'utf8');
            return true;
        } catch (err) {
            return false;
        }
    }

    async readDB() {
        try {
            const res = await readFileAsync(this.path);
            return this.toJSON(res);
        } catch (err) {
            return null;
        }
    }

    toJSON(string) {
        if (!string) {
            return null;
        }
        try {
            return JSON.parse(string);
        } catch (e) {
            return string;
        }
    }

    toString(json) {
        if (!json) {
            return null;
        }
        try {
            return JSON.stringify(json, null, '\t');
        } catch (e) {
            return json;
        }
    }
}

export default Worker;
