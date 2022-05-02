const { readdirSync } = require('fs');
const loadedevents = [];

module.exports = (client) => {
        for (const file of readdirSync(`./events/`).filter(d => d.endsWith(`.js`))) {
            client.on(require(`../events/${file}`).name, require(`../events/${file}`).run.bind(null, client));
           loadedevents.push(file.split(`.`)[0]);
            }
    console.log(`[Event Handler]: Eventy zostały załadowane!`);
}     