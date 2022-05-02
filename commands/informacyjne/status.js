const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const config = require("../../config")
require("../../ExtendedMessage")

module.exports = {
    name: "status",
    run: async (client, msg) => {

        if (db.get(`reklama_do_${msg.guild.id}`)) {
            const czeka = new MessageEmbed()
                .setAuthor("Status konfiguracji serwera " + msg.guild.name + ":", "https://cdn.discordapp.com/emojis/797471968156712981.png?v=1")
                .setThumbnail("https://cdn.discordapp.com/emojis/629794816049283078.gif?v=1")
                .setDescription("```\n$ Reklama tego serwera czeka na zweryfikowanie\n```")
                .setFooter(`${msg.author.tag} (${msg.author.id})`, msg.author.displayAvatarURL())
                .setColor("#b4bfbf")
            return msg.inlineReply(czeka)

        } else if (db.get(`reklama_${msg.guild.id}_serwera`) === null) {
            const brak = new MessageEmbed()
                .setAuthor("Wystąpił problem!", "https://cdn.discordapp.com/emojis/616339629695696927.gif?v=1")
                .setColor("RED")
                .setFooter(`Serwer nie został skonfigurowany!`, msg.author.displayAvatarURL())
            return msg.inlineReply(brak)

        } else if (db.get(`premium_${msg.guild.id}`)) {
            const premium = new MessageEmbed()
                .setAuthor("Status Konfiguracji serwera " + msg.guild.name + ":")
                .setColor("#ffcf24")
                .setDescription(`<:kanal:798946072605098004> **Kanał reklam:** <a:Check_Mark:796683555827613706> Obecnie ustawiony kanał reklam to: <#${db.get(`kanal_reklama_${msg.guild.id}`)}> \n\n<a:premium:801394948528013313> **Premium:** <:on:803920252655763456> Serwer posiada dodatek \`PREMIUM\` \n\n<:czeka:797471968156712981> **Status weryfikacji reklamy:** <a:Check_Mark:796683555827613706> Zweryfikowana.\n\n<:Stats:810950766633680996> **Wysłana:** \`${db.get(`staty_${msg.guild.id}`) || 0}\` razy.\n\n<:reklama:798946146344763412> **Reklama:**\n\`\`\`\n${db.get(`reklama_${msg.guild.id}_serwera`)}\`\`\``)
                .setFooter(`${msg.author.tag} (${msg.author.id})`, msg.author.displayAvatarURL())
            return msg.inlineReply(premium)

        } else {
            const embed2 = new MessageEmbed()
                .setAuthor("Status Konfiguracji serwera " + msg.guild.name + ":")
                .setColor(config.clr)
                .setDescription(`<:kanal:798946072605098004> **Kanał reklam:** <a:Check_Mark:796683555827613706> Obecnie ustawiony kanał reklam to: <#${db.get(`kanal_reklama_${msg.guild.id}`)}> \n\n<a:premium:801394948528013313> **Premium:** <:off:803920287607291916> Serwer nide posiada dodatku \`PREMIUM\` \n\n<:czeka:797471968156712981> **Status weryfikacji reklamy:** <a:Check_Mark:796683555827613706> Zweryfikowana.\n\n<:Stats:810950766633680996> **Wysłana:** \`${db.get(`staty_${msg.guild.id}`) || 0}\` razy.\n\n<:reklama:798946146344763412> **Reklama:**\n\`\`\`\n${db.get(`reklama_${msg.guild.id}_serwera`)}\`\`\``)
                .setFooter(`${msg.author.tag} (${msg.author.id})`, msg.author.displayAvatarURL())
            return msg.inlineReply(embed2)
        }
    }
}