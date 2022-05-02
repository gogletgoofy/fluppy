const db = require("quick.db");
const config = require("../../config");
const { MessageEmbed } = require("discord.js")
require("../../ExtendedMessage")

module.exports = {
    name: "snipe",
    run: async (client, msg) => {

        if (!db.get(`msg_del_tag_${msg.guild.id}_${msg.channel.id}`)) {
            const pr = new MessageEmbed()
            .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
            .setFooter(`Brak usuniętych wiadomości!`, msg.author.displayAvatarURL())
            .setColor("RED")
            msg.inlineReply(pr)
        }

        if (db.get(`deleted_msg_${msg.guild.id}_${msg.channel.id}`) === "") {
            const pr = new MessageEmbed()
            .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
            .setFooter(`Brak usuniętych wiadomości!`, msg.author.displayAvatarURL())
            .setColor("RED")
            msg.inlineReply(pr)
        }

        if (!db.get(`msg_del_tag_${msg.guild.id}_${msg.channel.id}`)) return;
        if (db.get(`deleted_msg_${msg.guild.id}_${msg.channel.id}`) === "") return;

        const ok = new MessageEmbed()
        .setAuthor(db.get(`msg_del_tag_${msg.guild.id}_${msg.channel.id}`), db.get(`msg_au_${msg.guild.id}_${msg.channel.id}`))
        .setDescription(db.get(`deleted_msg_${msg.guild.id}_${msg.channel.id}`))
        .setColor(config.mainColor)
        .setFooter("Zapis wiadomości zostanie usunięty z bazy danych w ciągu 10 minut od użycia tej komendy.")
        msg.inlineReply(ok)

        setTimeout(() => {
            db.delete(`msg_del_tag_${msg.guild.id}_${msg.channel.id}`);
            db.delete(`msg_au_${msg.guild.id}_${msg.channel.id}`);
            db.delete(`deleted_msg_${msg.channel.id}_${msg.channel.id}`)
          }, 10 * 60 * 1000);

    }
}