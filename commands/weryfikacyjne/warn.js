const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "warn",
    aliases: ["warn"],
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

        const osoba = new MessageEmbed()
        .setAuthor("Ostrzeżono!", "https://cdn.discordapp.com/emojis/797471968156712981.png?v=1")
        .setDescription("Serwer `" + db.get(`reklama_do_${args[0]}_name`) + "` został ostrzeżony z __**POWODU**__ \n`" + args.slice(1).join(" ") + "`")
        .setFooter(`Weryfikator: ${msg.author.tag} || ${msg.author.id} || Jeśli chcesz ponownie ustawić reklamę, po prostu ustaw ją jeszcze raz stosując się do uwag w powodzie ostrzeżenia`, msg.author.displayAvatarURL())
        .setThumbnail("https://cdn.discordapp.com/emojis/797471968156712981.png?v=1")
        .setColor("#adadad")
        client.users.cache.get(db.get(`reklama_do_${args[0]}_osoba`)).send(osoba)

        const kanal_reklam = new MessageEmbed()
        .setAuthor("Ostrzeżono!", "https://cdn.discordapp.com/emojis/797471968156712981.png?v=1")
        .setDescription("Ten Serwer został ostrzeżony z  __**POWODU**__\n`" + args.slice(1).join(" ") + "`")
        .setColor("#adadad")
        .setThumbnail("https://cdn.discordapp.com/emojis/797471968156712981.png?v=1")
        .setFooter("Jeśli chcesz ponownie ustawić reklamę, po prostu ustaw ją jeszcze raz stosując się do uwag w powodzie ostrzeżenia")
        client.channels.cache.get(db.get(`kanal_reklama_${args[0]}`)).send(kanal_reklam)

        const statusy = new MessageEmbed()
        .setAuthor("Ostrzeżono!", "https://cdn.discordapp.com/emojis/797471968156712981.png?v=1")
        .setDescription("Serwer `" + db.get(`reklama_do_${args[0]}_name`) + "` został ostrzeżony z __**POWODU**__ \n`" + args.slice(1).join(" ") + "`")
        .setFooter(`Weryfikator: ${msg.author.tag} || ${msg.author.id}`, msg.author.displayAvatarURL())
        .setThumbnail("https://cdn.discordapp.com/emojis/797471968156712981.png?v=1")
        .setColor("#adadad")
        client.channels.cache.get("796529170694930442").send(statusy)
        db.delete(`reklama_do_${args[0]}_osoba`)
        db.delete(`reklama_do_${args[0]}`)
        db.delete(`reklama_do_${args[0]}_name`)
        msg.channel.send(statusy)
    }

}