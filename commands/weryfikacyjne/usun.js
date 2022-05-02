const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "usun",
    aliases: ["usuń"],
    run: async (client, msg, args) => {
        if(!msg.member.roles.cache.has("813821655263870996")) return;

	if (!args[0]) {
	   return msg.reply("Podaj Numerek Reklamy!")
	}

        if (!args[1]) {
            return msg.reply("Podaj powód!")
        }

        if (!db.get(`reklama_${args[0]}`)) {
            return msg.reply("W bazie danych nie ma takiej reklamy!")
        }

        db.delete(`reklama_${args[0]}`)
        db.delete(`reklama_${args[0]}_id`)
        db.delete(`reklama_${args[0]}_serwera`)
        const statusy = new MessageEmbed()
        .setAuthor("Usunięto!", "https://media.discordapp.net/attachments/786700077937983549/797610924579487775/recycle-bin.png")
        .setDescription("Reklama o numerze `" + args[0] + "` została usunięta z __**POWODU**__\n`" + args.slice(1).join(" ") + "`")
        .setFooter(`Weryfikator: ${msg.author.tag}`, msg.author.displayAvatarURL())
        .setColor("#f5f5f5")
        client.channels.cache.get("796529170694930442").send(statusy)
        msg.channel.send(statusy)
        
    }
}