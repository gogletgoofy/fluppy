const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "rank",
    aliases: ["ranga", "level"],
    run: async (client, msg) => {

        if (!db.get(`lvl_${msg.guild.id}`)) {
            const wyl = new MessageEmbed()
            .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
            .setFooter(`Levele są wyłączone na tym serwerze!`, msg.author.displayAvatarURL())
            .setColor("RED")
            return msg.inlineReply(wyl)
        }

        const user = msg.mentions.users.first() || msg.author

        const score = db.get(`exp_${msg.guild.id}_uu_${user.id}`)
        const prog_bar = Math.ceil(Math.round(score) / db.get(`lvlpr_${user.id}_${msg.guild.id}`) * 10);
        const counter = "<:lvl_blue:820275935176949830>".repeat(prog_bar) + "<:lvl_empty2:820278098586107924>".repeat(10 - prog_bar) || "<:lvl_empty2:820278098586107924><:lvl_empty2:820278098586107924><:lvl_empty2:820278098586107924><:lvl_empty2:820278098586107924><:lvl_empty2:820278098586107924><:lvl_empty2:820278098586107924><:lvl_empty2:820278098586107924><:lvl_empty2:820278098586107924>";

        const lvl = new MessageEmbed()
        .setAuthor(`Ranga ${user.tag}:`, "https://images-ext-1.discordapp.net/external/mSGlJxTokWA1QQH_guBFQlT_8VLhg5DGX1qkOH1QbI8/https/images-ext-2.discordapp.net/external/Q7ma4BQ4SBRT2k3Unsu7GUl4EUgn60qjattZvk_I-t4/https/cdn.discordapp.com/emojis/799687207647445014.png")
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setColor("#0073ed")
        .setDescription(`> Level: **${db.get(`ulvl_${user.id}_${msg.guild.id}`) || 0}**\n> Ilość XP (Doświadczenia): **${db.get(`exp_${msg.guild.id}_uu_${user.id}`) || 0}/${db.get(`lvlpr_${user.id}_${msg.guild.id}`) || 1000}**\n${counter}`)
        .setFooter(`1 XP = Jedna Wysłana Wiadomość`, msg.author.displayAvatarURL({ dynamic: true }))
        msg.inlineReply(lvl)

    }
}