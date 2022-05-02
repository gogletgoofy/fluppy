const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const config = require("../../config");
require("../../ExtendedMessage")

module.exports = {
    name: "daj-premium",
    run: async (client, msg, args) => {
        if (!config.owners.includes(msg.author.id)) return;

        if (!args[0]) {
            return msg.inlineReply("Podaj id!")
        }

        if (db.get(`premium_${args[0]}`)) {
            return msg.inlineReply("Ten serwer posiada już premium!")
        }

        db.set(`premium_${args[0]}`, "Posiada!") 
        const kanal_reklam = new MessageEmbed()
        .setAuthor("Uwaga!", "https://cdn.discordapp.com/emojis/742822105661571152.gif?v=1")
        .setDescription("Ten serwer uzyskał premium!")
        .setColor("PURPLE")
        client.channels.cache.get(db.get(`kanal_reklama_${args[0]}`)).send(kanal_reklam)
        
        const reply = new MessageEmbed()
        .setAuthor("Uwaga!", "https://cdn.discordapp.com/emojis/742822105661571152.gif?v=1")
        .setDescription("Podany serwer `(" + args[0] + ")` Uzyskał premium!")
        .setColor("PURPLE")
        msg.inlineReply(reply)

    }
}