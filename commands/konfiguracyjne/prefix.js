const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
require("../../ExtendedMessage")

module.exports = {
    name: "prefix",
    aliases: ["set-prefix", "set prefix"],
    run: async (client, msg, args) => {

        if (!msg.member.hasPermission('MANAGE_GUILD')) {
            const brak_permow = new MessageEmbed()
                .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
                .setFooter(`Nie jesteś uprawniony do użycia tej komendy!`, msg.author.displayAvatarURL())
                .setColor("RED")
            return msg.inlineReply(brak_permow)
        }

        if (!args[0]) {
            const nie_wpisane = new MessageEmbed()
                .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
                .setFooter(`Musisz podać prefix, który chcesz ustawić!`, msg.author.displayAvatarURL())
                .setColor("RED")
            return msg.inlineReply(nie_wpisane)
        }

        if (args[0].length > 3) {
            const za_dlugi = new MessageEmbed()
                .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
                .setFooter(`Prefix może zawierać maksymalnie 3 znaki!`, msg.author.displayAvatarURL())
                .setColor("RED")
            return msg.inlineReply(za_dlugi)
        }

        if (args[0]) {
            db.delete(`guild_${msg.guild.id}_prefix`)
            db.set(`guild_${msg.guild.id}_prefix`, args[0])
            const sukces = new MessageEmbed()
                .setAuthor("Ustawiono!", "https://cdn.discordapp.com/emojis/797603478037332009.gif?v=1")
                .setFooter(`Prefix został ustawiony na: ${args[0]}!`, msg.author.displayAvatarURL())
                .setColor("GREEN")
            return msg.inlineReply(sukces)
        }
    }
}
