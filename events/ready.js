const config = require("../config");
const db = require("quick.db");

module.exports = {
    name: "ready",
    run: async (client) => {

        client.guilds.cache.forEach(servers_each => {
            db.delete(`cl_b_${servers_each}`)
        })

        console.log(`[Cooldown]: Cooldown Bumpów został usunięty`)

        client.user.setStatus('dnd')

            client.user.setPresence({
                activity: {
                    name: config.status,
                    type: 'WATCHING',
                }
            })

        console.log(`[Ready.JS]: Zalogowano na: ${client.user.tag}!`)
    }
}