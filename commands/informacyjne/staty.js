const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const config = require("../../config")
require("../../ExtendedMessage")

module.exports = {
    name: "staty",
    aliases: ["botinfo"],
    run: async (client, msg, args) => {

        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        let uptime = `${days} (DNI); ${hours} (GODZINY); ${minutes} (MINUTY); ${seconds} (SEKUNDY)`;

        const em = new MessageEmbed()
            .setAuthor("Informacje o Bocie Freezy.GQ", "https://cdn.discordapp.com/emojis/800152980149108737.png?v=1")
            .addFields(
                { name: '📊 Statystyki Bota', value: `> **Ilość Serwerów:** \`${client.guilds.cache.size}\`\n> **Ilość Kanałów:** \`${client.channels.cache.size}\`\n> **Ilość Użytkowników:** \`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}\`\n> **Średnia Ilość Użytkowników Na Serwer:**\`${Math.round(client.guilds.cache.reduce((a, g) => a + g.memberCount, 0) / client.guilds.cache.size)}\``, inline: true },
                { name: '🏓 Zasoby', value: `> **Wersja Discord.JS**: \`${Discord.version}\`\n> **Wersja NodeJS:** \`${process.version}\`\n> **Ping:** \`${client.ws.ping}ms\`\n> **Ram:** \`${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}/2048mb\`\n> **Uptime:** \`${uptime}\``, inline: true },
            )
            .setTimestamp()
            .setColor(config.mainColor)

        msg.inlineReply(em)

    }
}