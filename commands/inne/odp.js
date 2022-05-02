const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "odp",
    aliases: ["o"],
    run: async (client, msg, args) => {
        if (!msg.member.roles.cache.has("778584137627074571")) return;

        if (!args[0]) {
            return msg.reply("Podaj id osoby!")
        }

        if (!db.get(`bug_${args[0]}_id`)) {
            return msg.reply("Nie ma takiego zgłoszenia w bazie danych!")
        }

        if (!args[1]) {
            return msg.reply("Podaj treść odpowiedzi!")
        }
        
        const osoba = new MessageEmbed()
        .setAuthor("Odpowiedź!", "https://cdn.discordapp.com/emojis/778667952458825769.png?v=1")
        .setThumbnail("https://cdn.discordapp.com/emojis/754012743819854005.png?v=1")
        .setDescription("Uzyskałeś odpowiedź na twoje zgłoszenie!: \n```Diff\n- " + args.slice(1).join(" ") + "\n```")
        .setColor("RED")
        .setFooter(`Supporter: ${msg.author.tag}`, msg.author.displayAvatarURL())
        client.users.cache.get(db.get(`bug_${args[0]}_id`)).send(osoba)
        db.delete(`bug_${args[0]}_id`)
        db.delete(`bug_${args[0]}`)
        msg.reply("Odpowiedziano!")
    }

}