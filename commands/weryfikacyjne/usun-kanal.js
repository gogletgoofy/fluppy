const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "usun-kanal",
    run: async (client, msg, args) => {
        if(!msg.member.roles.cache.has("813821655263870996")) return;

        if (!args[0]) {
            return msg.reply("Podaj ID!")
        }

	if (!client.guilds.cache.get(args[0])) {
	    return msg.reply("Serwer o podanym ID nie istnieje w bazie danych!")
	}

        db.delete(`kanal_reklama_${args[0]}`)
        msg.reply("usunieto")
        
    }
}
