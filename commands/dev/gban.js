const db = require("quick.db")
const { MessageEmbed } = require("discord.js")
const config = require("../../config");
require("../../ExtendedMessage")

module.exports = {
    name: "gban",
    aliases: ["globalban"],
    run: async (client, msg, args) => {
        if (!config.owners.includes(msg.author.id)) return;

        if (!args[0]) {
            msg.inlineReply(`Podaj metodę! dodaj/usun`)
        }
        
        if (config.owners.includes(args[1])) {
            if (args[0] === "usun") return;
            msg.inlineReply(`nie możesz zbanować jednego z właścicieli!`)
        }
        
        if (config.owners.includes(args[1])) return;

        if (!args[1]) {
            if (!args[0]) return;
            msg.inlineReply(`Podaj ID!`)
        }

        if (args[0] === "dodaj") {
            if (!args[0]) return;
            if (!args[1]) return;
            db.set(`gban_${args[1]}`, "true")
            db.set(`gpowod_${args[1]}`, args.slice("2").join(" ") || "Administrator nie podał powodu bana")
            msg.inlineReply("Nadano!")
        }

        if (args[0] === "usun") {
            if (!args[0]) return;
            if (!args[1]) return;
            db.delete(`gban_${args[1]}`)
            db.delete(`gpowod_${args[1]}`)
            msg.inlineReply("Usunięto!")
        }
    }
}