const fs = require("fs");

module.exports = {
    name: "reload",
    run: async (client, msg) => {

        const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith(".js"));
        const eventFiles = fs.readdirSync(`../../events/`).filter(file => file.endsWith(".js"))

        for (const file of commandFiles) {
            delete require.cache[require.resolve("./" + file)];
        }

        for (const file1 of eventFiles) {
            delete require.cache[require.resolve("./" + file1)];
        }
      
        msg.channel.send(`> \`Przeładowano!\``)    

    }
}