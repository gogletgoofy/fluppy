const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "zglos",
    run: async (client, msg, args) => {

        if (!args[0]) {
            const brak_tresc = new MessageEmbed()
            .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
            .setFooter(`Aby zgłosić błąd musisz podać jego treść!`, msg.author.displayAvatarURL())
            .setColor("RED")
        return msg.inlineReply(brak_tresc)
        }
            
               
        if (db.get(`bug_${msg.author.id}_id`) === msg.author.id) {
            const wyslane_juz = new MessageEmbed()
            .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
            .setFooter(`Obecnie jeszcze nie odpowiedziano na twoje poprzednie zgłoszenie!`, msg.author.displayAvatarURL())
            .setColor("RED")
        return msg.inlineReply(wyslane_juz)
        }

	    else if (args.join(" ").length > 1000) {
            const za_duzo = new MessageEmbed()
            .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
            .setFooter(`Zgłoszenie może mieć maksymalnie 1000 znaków!`, msg.author.displayAvatarURL())
            .setColor("RED")
        return msg.inlineReply(za_duzo)
        }

         else {
           msg.channel.createInvite({
            maxAge: 0
            }).then(invite => { 
                db.set(`bug_${msg.author.id}`, args.join(" "))
                db.set(`bug_${msg.author.id}_id`, msg.author.id)
            
            const reply = new MessageEmbed()
            .setAuthor("Gotowe!", "https://cdn.discordapp.com/emojis/797603478037332009.gif?v=1")
            .setFooter(`Zgłoszenie zostało wsyłane!`, msg.author.displayAvatarURL())
            .setColor("GREEN")
            msg.inlineReply(reply)

            const bledy = new MessageEmbed()
            .setAuthor("Ktoś chce się skontaktować!", "https://cdn.discordapp.com/emojis/778667952458825769.png?v=1")
            .setDescription("Osoba: `" + msg.author.username + " || " + msg.author.id + "`")
            .addField("Treść Zgłoszenia:", "`" + db.get(`bug_${msg.author.id}`) + "`")
            .setColor("PURPLE")
            .addField(" Zaproszenie na serwer z którego zgłoszono błąd:", `<:zaproszenie:799399684027842590> [**Dołącz!**](https://discord.gg/${invite.code})`)
            client.channels.cache.get("792399379650576394").send(bledy)
            client.channels.cache.get("792399379650576394").send("<@&778584137627074571>")

            })
        }
    }
}
