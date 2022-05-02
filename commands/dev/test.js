const Database = require('better-sqlite3');
const db = new Database('database.db');

module.exports = {
    name: "t",
    run: async (client, msg, args) => {

        msg.inlineReply("jd")
    }
}