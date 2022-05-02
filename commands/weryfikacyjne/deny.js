const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "deny",
    aliases: ["de"],
    run: async (client, msg, args) => {
        if (!msg.member.roles.cache.has("813821655263870996")) return;

        if (!args[0]) {
            return msg.reply("Podaj id!")
        }

        if (!db.get(`reklama_do_${args[0]}`)) {
            return msg.reply("Nie ma takiej reklamy w bazie danych!")
        }

        if (!args[1]) {
            return msg.reply("Podaj powód!")
        }

        const kanal_reklam = new MessageEmbed()
        .setAuthor("Odrzucono!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
        .setDescription("Reklama tego serwera została odrzucona z powodu: \n```" + args.slice(1).join(" ") + "\n```")
        .setColor("RED")
        client.channels.cache.get(db.get(`kanal_reklama_${args[0]}`)).send(kanal_reklam)
        
        const osoba = new MessageEmbed()
        .setAuthor("Odrzucono!", "https://cdn.discordapp.com/emojis/790991889704419379.gif?v=1")
        .setDescription("<:dashboard1:800153059953999933> `Reklama serwera` " + db.get(`reklama_do_${args[0]}_name`) + " `została odrzucona z powodu:`\n```" + args.slice(1).join(" ") + "\n```")
        .setColor("RED")
        .setThumbnail("https://cdn.discordapp.com/emojis/754012743819854005.png?v=1")
        client.users.cache.get(db.get(`reklama_do_${args[0]}_osoba`)).send(osoba)

        const statusy = new MessageEmbed()
        .setAuthor("Odrzucono!", "https://cdn.discordapp.com/emojis/790991889704419379.gif?v=1")
        .setDescription("<:dashboard1:800153059953999933> `Reklama serwera` " + db.get(`reklama_do_${args[0]}_name`) + " `została odrzucona z powodu:`\n```" + args.slice(1).join(" ") + "\n```")
        .setThumbnail("https://cdn.discordapp.com/emojis/754012743819854005.png?v=1")
        .setFooter(`Zweryfikowana przez: ${msg.author.tag} || ${msg.author.id}`, msg.author.displayAvatarURL())
        .setColor("RED")
        client.channels.cache.get("796529170694930442").send(statusy)
        db.delete(`reklama_do_${args[0]}_osoba`)
        db.delete(`reklama_do_${args[0]}`)
        db.delete(`reklama_do_${args[0]}_name`)
        db.delete(`reklama_${args[0]}_serwera`)
        msg.channel.send(statusy)
    }

}