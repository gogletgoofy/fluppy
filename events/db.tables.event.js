const Database = require("better-sqlite3");
const db = new Database('database.db');

module.exports = {
    name: "ready",
    run: async (client) => {
        
        db.prepare(`CREATE TABLE IF NOT EXISTS guilds (guildId, prefix, channel, ad, invite)`).run();

    }
}