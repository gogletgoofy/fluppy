const { MessageEmbed } = require("discord.js")
const config = require("../../config")
require("../../ExtendedMessage")

module.exports = {
    name: "linki",
    aliases: ["link"],
    run: async (client, msg) => {

        const linki = new MessageEmbed()
            .setAuthor("Najważniejsze linki bota Freezy", "https://cdn.discordapp.com/emojis/796821441508671550.png?v=1")
            .setDescription(`> Strona WWW: **[Zobacz!](https://freezy.gq/)**\n> Autoryzacja Bota: **[Autoryzuj!](https://discord.com/api/oauth2/authorize?client_id=799984339948666880&permissions=8&scope=bot%20applications.commands)**\n> Serwer Support: **[Dołącz!](https://discord.gg/Qdvvvn737C)**`)
            .setColor(config.mainColor)
            .setTimestamp()
            .setThumbnail("https://cdn.discordapp.com/emojis/804028069639749652.png?v=1")
        msg.inlineReply(linki)

    }
}