const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
require("../../ExtendedMessage")

module.exports = {
    name: "ustaw",
    aliases: ["ustawianie"],
    run: async (client, msg, args, guild) => {
    const channel = msg.guild.channels.cache.get(args[0])

        if (!msg.member.hasPermission("MANAGE_GUILD")) {
            const permisja = new Discord.MessageEmbed()
            .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
            .setFooter(`Nie jesteś uprawniony do użycia tej komendy!`, msg.author.displayAvatarURL())
            .setColor("RED")
        return msg.inlineReply(permisja)
        }

        if (!args[0]) {
            const brak_argumentu = new Discord.MessageEmbed()
            .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
            .setFooter(`Aby skonfigurować serwer, musisz podać typ konfiguracji! (.ustaw kanal/reklama)`, msg.author.displayAvatarURL())
            .setColor("RED")
            msg.inlineReply(brak_argumentu)

        }
        
        if (args[0] === "reklama") {
			
		if (!db.get(`kanal_reklama_${msg.guild.id}`)) {
			const brak_kanalu = new MessageEmbed()
            .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
            .setFooter(`Musisz ustawić kanał!`, msg.author.displayAvatarURL())
            .setColor("RED")
            return msg.inlineReply(brak_kanalu)
		}

        if (db.get(`reklama_do_${msg.guild.id}`)) {
            const weryfikowana = new MessageEmbed()
            .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
            .setFooter(`Reklama tego serwera już czeka na zweryfikowanie!`, msg.author.displayAvatarURL())
            .setColor("RED")
            return msg.inlineReply(weryfikowana)
        }

        if (args.join(' ').includes("@here")) {
            const here = new Discord.MessageEmbed()
            .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
            .setFooter(`Reklama nie może zawierać pingu @here!`, msg.author.displayAvatarURL())
            .setColor("RED")
            return msg.inlineReply(here)
        }

        if (args.join(' ').includes("@everyone")) {
            const everyone = new Discord.MessageEmbed()
            .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
            .setFooter(`Reklama nie może zawierać pingu @everyone!`, msg.author.displayAvatarURL())
            .setColor("RED")
            return msg.inlineReply(everyone)
        }

        if (args.join(" ").includes("discord.gg/" || "https://discord.gg/" || "discordapp.com/invite/" || "https://discordapp.com/invite/" || "https://discord.com/invite/")) {
            const blad_link = new Discord.MessageEmbed()
            .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
            .setFooter(`Reklama nie może zawierać linku do serwera ponieważ bot wygeneruuje go sam!`, msg.author.displayAvatarURL())
            .setColor("RED")
           return msg.inlineReply(blad_link)
        }
        
        if (!args[1]) {
            const za_malo = new MessageEmbed()
            .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
            .setFooter(`Aby ustawić reklamę, musisz podać jej treść!`, msg.author.displayAvatarURL())
            .setColor("RED")
        return msg.inlineReply(za_malo)

        } else if (args.join(" ").length > 1000) {
            const za_duzo = new MessageEmbed()
            .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
            .setFooter(`Reklama nie może zawierać więcej niż 1000 znaków!`, msg.author.displayAvatarURL())
            .setColor("RED")
        return msg.inlineReply(za_duzo)

        }

        msg.channel.createInvite({
            maxAge: 0
            }).then(invite => { 
                db.set(`reklama_do_${msg.guild.id}`, args.slice(1).join(" ") + `\n   <:FreezyAdvert:796821441508671550> https://discord.gg/${invite.code}`)
                db.set(`reklama_${msg.guild.id}_serwera`, args.slice(1).join(" ") + `\n https://discord.gg/${invite.code}`)
                db.set(`reklama_do_${msg.guild.id}_name`, msg.guild.name)
                db.set(`reklama_do_${msg.guild.id}_osoba`, msg.author.id)
                db.set(`st_i_${msg.guild.id}`, `${invite.code}`)

            const do_sprawdzenia = new MessageEmbed()
            .setAuthor("Nowa reklama do sprawdzenia!", "https://cdn.discordapp.com/emojis/798946146344763412.png?v=1")
            .setDescription("Serwer: `" + msg.guild.name + " || " + msg.guild.id + "`\nOsoba: `" + msg.author.username + " || " + msg.author.id + "`")
            .addField("Treść:", "`" + db.get(`reklama_do_${msg.guild.id}`) + "`")
            .setColor("#1573ed")
            .addField("Zaproszenie, aby dołączyć kliknij poniżej:", `<:zaproszenie:799399684027842590>  [**Dołącz!**](https://discord.gg/${invite.code})`)
            .setFooter(".ver <id> <numerek> \n.deny <id> <powod>\n.warn <id> <powód>")
          //792399379650576394

          const embed2 = new Discord.MessageEmbed()
          .setAuthor("Ustawiono!", "https://cdn.discordapp.com/emojis/797603478037332009.gif?v=1")
          .setFooter(`Reklama została ustawiona!`, msg.author.displayAvatarURL())
          .setColor("GREEN")
          msg.inlineReply(embed2)
          
          client.channels.cache.get("792399379650576394").send("<@&813821655263870996>")
          client.channels.cache.get("792399379650576394").send(do_sprawdzenia)

            })
        }

        if (args[0] === "kanał" || args[0] === "kanal") {

            const kanal = 
            msg.guild.channels.cache.get(args[1]) ||
            msg.guild.channels.cache.find(x => x.name === args.join("2")) ||
            msg.mentions.channels.first();
    
            if (!kanal) {
                const blad_kanal = new Discord.MessageEmbed()
                .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
                .setFooter(`Aby ustawić kanał musisz go oznaczyć! #kanał`, msg.author.displayAvatarURL())
                .setColor("RED")
            return msg.channel.send(blad_kanal)
            }
        
            if (!msg.guild.channels.cache.get(kanal.id)) {
                const blad_kanal2 = new Discord.MessageEmbed()
                .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
                .setFooter(`Aby ustawić kanał musisz go oznaczyć! #kanał`, msg.author.displayAvatarURL())
                .setColor("RED")
            return msg.channel.send(blad_kanal2)
            }
        
            if (kanal.type !== "text") {
                const oznacz_to = new Discord.MessageEmbed()
                .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
                .setFooter(`Aby ustawić kanał musisz go oznaczyć! #kanał`, msg.author.displayAvatarURL())
                .setColor("RED")
                return msg.channel.send(oznacz_to)
            }
    
            db.set(`kanal_reklama_${msg.guild.id}`, kanal.id)
            const embed = new Discord.MessageEmbed()
            .setAuthor("Ustawiono!", "https://cdn.discordapp.com/emojis/797603478037332009.gif?v=1")
            .setFooter(`Kanał reklam został ustawiony!`, msg.author.displayAvatarURL())
            .setColor("GREEN")
            msg.channel.send(embed), kanal.setTopic("<a:premium:801394948528013313> Na tym kanale wysyłane są reklamy bota reklamowego: **Freezy**"), kanal.updateOverwrite(kanal.guild.roles.everyone, { VIEW_CHANNEL: true, READ_MESSAGE_HISTORY: true, SEND_MESSAGES: false, SEND_TTS_MESSAGES: false, VIEW_CHANNEL: true });
    
        } 
     }
}