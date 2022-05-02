const db = require("quick.db");
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "message",
    run: async (client, msg) => {

        if (!db.get(`lvl_${msg.guild.id}`)) return;
        if(msg.author.bot || msg.channel.type === "dm" || !msg.guild) return;

        if (db.get(`lvl_${msg.guild.id}`)) {

            if (db.get(`exp_${msg.guild.id}_uu_${msg.author.id}`)) {
                db.add(`exp_${msg.guild.id}_uu_${msg.author.id}`, 1)

            } else {
                db.set(`exp_${msg.guild.id}_uu_${msg.author.id}`, 1)
                db.set(`ulvl_${msg.author.id}`, 1)
                db.set(`lvlpr_${msg.author.id}_${msg.guild.id}`, 1000)
            }

            if (db.get(`exp_${msg.guild.id}_uu_${msg.author.id}`) === db.get(`lvlpr_${msg.author.id}_${msg.guild.id}`)) {
                
                const lvl_channel = client.channels.cache.get(db.get(`lvl_ch_${msg.guild.id}`))
                db.delete(`exp_${msg.guild.id}_uu_${msg.author.id}`)
                db.set(`ulvl_${msg.author.id}_${msg.guild.id}`, db.get(`ulvl_${msg.author.id}_${msg.guild.id}`)+1)
                db.set(`lvlpr_${msg.author.id}_${msg.guild.id}`, db.add(`lvlpr_${msg.author.id}_${msg.guild.id}`, 1000))
                
                if (lvl_channel) {

                    //const lvl_msg = db.get(`lvlmsg_${msg.guild.id}`)
                    //if (lvl_msg) {
                    //lvl_channel.send(lvl_msg)
                    //}

                    const lvlup_embed = new MessageEmbed()
                    .setAuthor("Level Up!", msg.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`> Brawo **${msg.author.tag}**! Wbiłeś **${db.get(`ulvl_${msg.author.id}_${msg.guild.id}`)}** level!`)
                    .setColor("GREEN")
                    .setFooter(`${msg.author.tag} (${msg.author.id})`, msg.author.displayAvatarURL({ dynamic: true }))
                    lvl_channel.send(lvlup_embed)

                } else if (!lvl_channel) {

                    const lvlup_embed = new MessageEmbed()
                    .setAuthor("Level Up!", msg.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`> Brawo **${msg.author.tag}**! Wbiłeś **${db.get(`ulvl_${msg.author.id}_${msg.guild.id}`)}** level!`)
                    .setColor("GREEN")
                    .setFooter(`${msg.author.tag} (${msg.author.id})`, msg.author.displayAvatarURL({ dynamic: true }))
                    msg.channel.send(lvlup_embed)

                }
            }
        }
    }
}