const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
const config = require("../../config");
require("../../ExtendedMessage")

module.exports = {
    name: "bump", 
    run: async (client, msg) => {

      if (!db.get(`premium_${msg.guild.id}`)) {
        const pr = new MessageEmbed()
        .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
        .setFooter(`Serwer nie posiada premium!`, msg.author.displayAvatarURL())
        .setColor("RED")
        msg.inlineReply(pr)
        return;
      }

      if (!db.get(`reklama_${msg.guild.id}_serwera`)) {
        const pr2 = new MessageEmbed()
        .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
        .setFooter(`Serwer nie posiada reklamy!`, msg.author.displayAvatarURL())
        .setColor("RED")
        msg.inlineReply(pr2)
        return;
      }

      if (!db.get(`premium_${msg.guild.id}`)) return;
      if (!db.get(`reklama_${msg.guild.id}_serwera`)) return;
      msg.inlineReply("Podbijanie...")

      client.guilds.cache.forEach(servers_each => {
        if (!db.get(`kanal_reklama_${servers_each.id}`)) return;
        if (db.get(`cl_b_${msg.guild.id}`)) return;

        let chnl = client.channels.cache.get(db.get(`kanal_reklama_${servers_each.id}`))

          const premium = new MessageEmbed()
          .setAuthor(`📆 ID: ${msg.guild.id}\n📯 Serwer: ${msg.guild.name}`, "https://cdn.discordapp.com/emojis/715894604209324072.gif?v=1")
          .setColor(config.mainColor)
          .setThumbnail(client.user.displayAvatarURL)
          .setDescription(db.get(`reklama_${msg.guild.id}_serwera`))
          .setImage("https://cdn.discordapp.com/attachments/792159158505963531/823274796937773056/1616354394618.png")
          .setFooter("Podbita Reklama!\nFreezy © 2021")
          chnl.send(premium)

        })

    	Date.prototype.addHours = function(h) {
    	  this.setHours(this.getHours()+h);
    	return this;
	    }

	const date = new Date().addHours(3)

            let godzina = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;


          if (db.get(`cl_b_${msg.guild.id}`)) {
            const cooldwn = new MessageEmbed()
            .setAuthor("Błąd!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
            .setFooter(`Nie możesz jeszcze podbić reklamy! Poczekaj do ${db.get(`cl_b_${msg.guild.id}`)}`, msg.author.displayAvatarURL())
            .setColor("RED")
            msg.inlineReply(cooldwn)
          }

          if (db.get(`cl_b_${msg.guild.id}`)) return;

        db.set(`cl_b_${msg.guild.id}`, godzina)
	db.add(`staty_${msg.guild.id}`, 1)

        const okk = new MessageEmbed()
        .setAuthor("Podbito reklamę!", "https://cdn.discordapp.com/emojis/715894604209324072.gif?v=1")
        .setDescription(`> **Następny raz reklama może zostać podbita o:** \`${db.get(`cl_b_${msg.guild.id}`)}\``)
        .setColor(config.mainColor)
        .setTimestamp()
        .setImage("https://cdn.discordapp.com/attachments/792159158505963531/823274796937773056/1616354394618.png")
        msg.channel.send(okk)

        setTimeout(() => {
          db.delete(`cl_b_${msg.guild.id}`)
        }, 120 * 60 * 1000);

    }
}