const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "ver",
    run: async (client, msg, args) => {
        if (!msg.member.roles.cache.has("813821655263870996")) return;

        if (!args[0]) {
            return msg.reply("Podaj id!")
        }

        if (!db.get(`reklama_do_${args[0]}`)) {
            return msg.reply("Nie ma takiej reklamy do zaakceptowania!")
        }

        if (!args[1]) {
            return msg.reply("Podaj numer!")
        }

        if (db.get(`reklama_${args[1]}`)) {
            return msg.reply("Ta reklama jest zajęta!")
        }

        db.set(`reklama_${args[1]}`, db.get(`reklama_do_${args[0]}`))
        db.set(`reklama_${args[1]}_id`, args[0])


        const rekkan = new Discord.MessageEmbed()
    .setAuthor("Dodano!", "https://cdn.discordapp.com/emojis/804417685654863893.png?v=1")
    .setThumbnail("https://cdn.discordapp.com/emojis/804417685654863893.png?v=1")
    .setDescription("Reklama tego serwera została dodana pod numer `" + args[1] + "`!")
    .setColor("GREEN")
    .setFooter(`Zweryfikowana przez: ${msg.author.tag}`, msg.author.displayAvatarURL())
    client.channels.cache.get(db.get(`kanal_reklama_${args[0]}`)).send(rekkan)

    const statusy = new Discord.MessageEmbed()
    .setAuthor("Dodano!", "https://cdn.discordapp.com/emojis/804417685654863893.png?v=1")
    .setThumbnail("https://cdn.discordapp.com/emojis/804417685654863893.png?v=1")
    .setDescription("<:dashboard1:800153059953999933> **Reklama serwera** `" + db.get(`reklama_do_${args[0]}_name`) + "` **Została dodana pod numer** \n```\n" + args[1] + "\n```\n\n> **Zaproszenie:** [Dołącz!](https://discord.gg/" + db.get(`st_i_${args[0]}`) + ")")
    .setFooter(`Zweryfikowana przez: ${msg.author.tag}`, msg.author.displayAvatarURL())
    .setColor("GREEN")
    .setThumbnail("https://cdn.discordapp.com/emojis/790991988232028160.gif?v=1")
    client.channels.cache.get("796529170694930442").send(statusy)
        db.delete(`reklama_do_${args[0]}_osoba`)
        db.delete(`reklama_do_${args[0]}`)
        db.delete(`reklama_do_${args[0]}_name`)
        db.delete(`st_i_${args[0]}`)
        msg.channel.send(statusy)
        
    }
}