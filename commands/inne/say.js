const db = require("quick.db");
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
const config = require("../../config")

module.exports = {
    name: "say",
    run: async (client, msg, args) => {

        if (!config.owners.includes(msg.author.id)) return;

        const webhook = new Discord.WebhookClient(db.get(`webid_${msg.guild.id}_${msg.channel.id}`), db.get(`webtoken_${msg.guild.id}_${msg.channel.id}`));

        if (!db.get(`webid_${msg.guild.id}_${msg.channel.id}`)) {
            msg.channel.createWebhook("CIyde", {
                avatar: `https://cdn.discordapp.com/avatars/821380849932959754/e54686a75405e47a652e5c9243aa5468.webp?size=1024`
            }).then(webhook => { 
                db.set(`webid_${msg.guild.id}_${msg.channel.id}`, webhook.id)
                db.set(`webtoken_${msg.guild.id}_${msg.channel.id}`, webhook.token)
            })

            msg.channel.send("ok")
            .then(msg => {
            msg.delete()
            }).then(msg.delete())
        }

        if (!args[0]) {
            if (!db.get(`webid_${msg.guild.id}_${msg.channel.id}`)) return;
            msg.reply("Podaj treœæ!")
        }

        if (args[0] === "embed") {
            const hlep = new MessageEmbed()
            .setAuthor("Clyde", "https://cdn.discordapp.com/avatars/821380849932959754/e54686a75405e47a652e5c9243aa5468.webp?size=1024")
            .setColor("#6d89ea")
            .setDescription(args.slice("1").join(" "))
            .setTimestamp()
    
            webhook.send({
                allowedMentions: { users: []},
                username: `CIyde`,
                avatarURL: `https://cdn.discordapp.com/avatars/821380849932959754/e54686a75405e47a652e5c9243aa5468.webp?size=1024`,
                embeds: [hlep]
            }).then(msg.delete())
        }

        if (!db.get(`webid_${msg.guild.id}_${msg.channel.id}`)) return;
        if (!args[0]) return;
        if (args[0] === "embed") return;
        webhook.send(`${args.join(" ")}`, {
            allowedMentions: { users: []},
            username: `CIyde`,
            avatarURL: `https://cdn.discordapp.com/avatars/821380849932959754/e54686a75405e47a652e5c9243aa5468.webp?size=1024`,
        }).then(msg.delete())

    }
}