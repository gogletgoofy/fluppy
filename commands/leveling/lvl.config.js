const db = require("quick.db")
const { MessageEmbed } = require("discord.js")
require("../../ExtendedMessage")

module.exports = {
    name: "lvl-config",
    aliases: ["lvl-conf", "lvl"],
    run: async (client, msg, args) => {

        if (!msg.member.hasPermission("MANAGE_GUILD")) {
            const permisja = new MessageEmbed()
            .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
            .setFooter(`Nie jesteś uprawniony do użycia tej komendy!`, msg.author.displayAvatarURL())
            .setColor("RED")
        return msg.inlineReply(permisja)
        }

        if (!args[0]) {
            const brak_argumentu = new MessageEmbed()
            .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
            .setFooter(`Aby skonfigurować levele, musisz podać typ ich konfiguracji! (.lvl-config kanal/off/on)`, msg.author.displayAvatarURL())
            .setColor("RED")
            msg.inlineReply(brak_argumentu)

        }

        if (args[0] === "kanał" || args[0] === "kanal") {

            const kanal = 
            msg.guild.channels.cache.get(args[1]) ||
            msg.guild.channels.cache.find(x => x.name === args.join("2")) ||
            msg.mentions.channels.first();
    
            if (!kanal) {
                const blad_kanal = new MessageEmbed()
                .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
                .setFooter(`Aby ustawić kanał musisz go oznaczyć! #kanał`, msg.author.displayAvatarURL())
                .setColor("RED")
                msg.inlineReply(blad_kanal)
            }
        
            if (!msg.guild.channels.cache.get(kanal.id)) {
                const blad_kanal2 = new MessageEmbed()
                .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
                .setFooter(`Aby ustawić kanał musisz go oznaczyć! #kanał`, msg.author.displayAvatarURL())
                .setColor("RED")
            return msg.inlineReply(blad_kanal2)
            }
        
            if (kanal.type !== "text") {
                const oznacz_to = new MessageEmbed()
                .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
                .setFooter(`Aby ustawić kanał musisz go oznaczyć! #kanał`, msg.author.displayAvatarURL())
                .setColor("RED")
                return msg.inlineReply(oznacz_to)
            }
    
            db.set(`lvl_ch_${msg.guild.id}`, kanal.id)
            db.get(`lvl_${msg.guild.id}`, "true")
            const embed = new MessageEmbed()
            .setAuthor("Ustawiono!", "https://cdn.discordapp.com/emojis/797603478037332009.gif?v=1")
            .setFooter(`Kanał leveli został ustawiony!`, msg.author.displayAvatarURL())
            .setColor("GREEN")
            msg.inlineReply(embed)
    
        } 

        if (args[0] === "off") {
            db.delete(`lvl_${msg.guild.id}`)
            const embed2 = new MessageEmbed()
            .setAuthor("Gotowe!", "https://cdn.discordapp.com/emojis/797603478037332009.gif?v=1")
            .setFooter(`Levele zostały wyłączone!`, msg.author.displayAvatarURL())
            .setColor("GREEN")
            msg.inlineReply(embed2)
        }

        if (args[0] === "on") {
            db.set(`lvl_${msg.guild.id}`, "true")
            const embed3 = new MessageEmbed()
            .setAuthor("Gotowe!", "https://cdn.discordapp.com/emojis/797603478037332009.gif?v=1")
            .setFooter(`Levele zostały włączone!`, msg.author.displayAvatarURL())
            .setColor("GREEN")
            msg.inlineReply(embed3)
        }

    }
}