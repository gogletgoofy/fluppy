const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const config = require("../config");
require("../ExtendedMessage")

module.exports = {
    name: "message",
    run: async (client, msg) => {

        const prefix = db.get(`guild_${msg.guild.id}_prefix`) || config.prefix;
        const mentionpc = `<@!${client.user.id}>`
        const mentionm = `<@${client.user.id}>`

        if (msg.author.bot) return;
        if (!msg.guild) return;

        const oznacznie = new MessageEmbed()
            .setAuthor("Reakcja na ping!", "https://cdn.discordapp.com/emojis/797490247956430878.gif?v=1")
            .setColor("#037bfc")
            .setThumbnail("https://cdn.discordapp.com/attachments/804040473576210502/804625269553758288/1611818873729.png")
            .setDescription(`> **Prefix:** <:dashboard1:800153059953999933> Mój prefix na tym serwerze to: ** ${prefix} **\n> **Ping:** <:ping:805114861927399424> Mój ping to: ** ${client.ws.ping} **\n> **Serwery:** <a:ostrzezenie:810789420798050355> Ilość serwerów bota: **${client.guilds.cache.size}**\n> **Shard:** <a:config:797935213044301884> **[${client.shard.ids[0] + 1}/${config.shards}]**`)
            .setFooter(`Na życzenie ${msg.author.tag} | Chcesz otrzymać pomoc? użyj ${db.get(`guild_${msg.guild.id}_prefix`) || "."}pomoc`, msg.author.avatarURL())

        if (msg.content.match(mentionpc)) {
            return msg.inlineReply(oznacznie)
        }

        if (msg.content.match(mentionm)) {
            return msg.inlineReply(oznacznie)
        }

    }
}