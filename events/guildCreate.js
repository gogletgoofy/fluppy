const { MessageEmbed } = require("discord.js")
const config = require("../config")
const db = require("quick.db")

module.exports = {
    name: "guildCreate",
    run: async (client, guild) => {

        const kanal = guild.channels.cache.find(channel => 
            channel.type === "text" &&
            channel.permissionsFor(client.user).has("CREATE_INSTANT_INVITE"))

        const c = new MessageEmbed()
        .setAuthor("Nowy Serwer!")
        .setColor("GREEN")
        .setDescription(`> Nazwa: **${guild.name}**\n> Ilość Osób: **${guild.memberCount}**\n> ID: **${guild.id}**\n> Serwery: **${client.guilds.cache.size}**`)
        .setTimestamp()
        .setThumbnail(guild.iconURL({dynamic: true}) || client.user.displayAvatarURL())
        client.channels.cache.get("796769273644187659").send(c)
        db.set(`prefix_${guild.id}`, config.prefix)
        client.channels.cache.get("797602858965925918").setName(`📆・Serwery: ${client.guilds.cache.size}`)

    }
}