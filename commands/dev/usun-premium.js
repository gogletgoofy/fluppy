const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const config = require("../../config");
require("../../ExtendedMessage")

module.exports = {
    name: "usun-premium",
    run: async (client, msg, args) => {
        if (!config.owners.includes(msg.author.id)) return;

        if (!args[0]) {
            return msg.inlineReply("Podaj id serwera!")
        }

        if (!db.get(`premium_${args[0]}`)) {
            return msg.inlineReply("Ten serwer nie posiada premium!")
        }

        db.delete(`premium_${args[0]}`)
        msg.reply("Usunięto premium serwerowi: `" + args[0] + "`!")
        const kanal_reklam = new MessageEmbed()
        
    }
}