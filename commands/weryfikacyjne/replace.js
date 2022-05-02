const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "replace",
    run: async (client, msg, args) => {
        if (!msg.member.roles.cache.has("813821655263870996")) return;

        if (!args[0]) {
            return msg.reply("Podaj id!")
        }

        if (!args[1]) {
            return msg.reply("Podaj numerki!")
        }
		
        db.set(`przechowywanie_rep_${args[0]}`, db.get(`reklama_${args[0]}`))
        db.set(`przechowywanie_id_${args[0]}`, db.get(`reklama_${args[0]}_id`))
        db.set(`reklama_${args[0]}`, db.get(`reklama_${args[1]}`))
        db.set(`reklama_${args[0]}_id`, db.get(`reklama_${args[1]}_id`))
        db.set(`reklama_${args[1]}`, db.get(`przechowywanie_rep_${args[0]}`))
        db.set(`reklama_${args[1]}_id`, db.get(`przechowywanie_id_${args[0]}`))
        db.delete(`przechowywanie_id_${args[0]}`)
        db.delete(`przechowywanie_rep_${args[0]}`)

    	const statusy = new Discord.MessageEmbed()
    		.setAuthor("Zamieniono!", "https://cdn.discordapp.com/emojis/782276001585430558.gif?v=1")
    		.setThumbnail("https://cdn.discordapp.com/emojis/805241143385915453.png?v=1")
    		.setDescription("Reklama o numerze: `" + args[0] + "` została zamieniona miejscem z reklamą o numerze: `" + args[1] + "`")
    		.setFooter(`Zamieniona przez: ${msg.author.tag}`, msg.author.displayAvatarURL())
    		.setColor("#ffea05")
    		client.channels.cache.get("796529170694930442").send(statusy)

        msg.channel.send(statusy)        
    }
}