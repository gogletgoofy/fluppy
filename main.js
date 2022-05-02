const { Client, Collection } = require("discord.js");
const fs = require("fs");
const { config } = require("dotenv")
const client = new Client({ disableEveryone: true });

config({
    path: "./.env"
});

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

["command.handler", "event.handler"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.login(process.env.TOKEN);