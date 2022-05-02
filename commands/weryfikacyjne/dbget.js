const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const config = require("../../config")
require("../../ExtendedMessage")

module.exports = {
    name: "dbget",
    run: async (client, msg, args) => {
        
    if (!msg.member.roles.cache.has("813821655263870996")) return;

    if (args[0] !== "id") {

    if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
        msg.inlineReply("Podaj poprawny argument! (numerek reklamy)")
        return;
    }

    if (!db.get(`reklama_${args[0]}_id`)) {
        msg.inlineReply("Nie ma takiej reklamy w bazie danych!")
        return;
    }

    const numer = args[0]
    const id = db.get(`reklama_${args[0]}_id`)

    //
        
        const dbget = new MessageEmbed()
        .setDescription(`\`🔎 NR: ${numer}; 🧪 ID: ${id}\`\n\n${db.get(`reklama_${args[0]}`)}`)
        .setColor(config.mainColor)
        msg.inlineReply(dbget)

        return;
    }

    if (args[0] === "id") {

    }
    
    }
}