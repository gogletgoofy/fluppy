const { MessageEmbed } = require("discord.js")
const config = require("../config")
const db = require("quick.db")

module.exports = {
    name: "guildDelete",
    run: async (client, guild) => {
        const g = new MessageEmbed()
            .setAuthor("Bot został wyrzucony z Serwera!")
            .setColor("RED")
            .setThumbnail(guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL())
            .setDescription(`> Serwer: **${guild.name}**\n> ID: **${guild.id}**\n> Ilość Osób: **${guild.memberCount}**\n> Serwery: **${client.guilds.cache.size}**`)
            .setTimestamp()
        client.channels.cache.get("796769273644187659").send(g)
        client.channels.cache.get("797602858965925918").setName(`📆・Serwery: ${client.guilds.cache.size}`)

        db.delete(`premium_${guild.id}`)
        db.delete(`reklama_do_${guild.id}`)
        db.delete(`reklama_do_${guild.id}_osoba`)
        db.delete(`reklama_do_${guild.id}_name`)
        db.delete(`reklama_${guild.id}_serwera`)
        db.delete(`kanal_reklama_${guild.id}`)
        db.delete(`guild_${guild.id}_prefix`)
        db.delete(`staty_${guild.id}`)

    }
}