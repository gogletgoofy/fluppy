const db = require("quick.db")
const { MessageEmbed } = require("discord.js")
const config = require("../config");

module.exports = {
    name: "ready",
    run: async (client) => {
        setInterval(() => {
            try {
                let numer = db.get(`numer`);

                let id = db.get(`reklama_${numer}_id`);

                if (!db.get(`reklama_${numer}`)) {
                    return db.set(`numer`, 1)
                }

                client.guilds.cache.forEach(servers_each => {
                    if (!db.get(`kanal_reklama_${servers_each.id}`)) return;

                    let channel = client.channels.cache.get(db.get(`kanal_reklama_${servers_each.id}`))
                    let zablokowany = false;

                    const blad4 = new MessageEmbed()
                        .setTitle("Wystąpił błąd!")
                        .setDescription("**Serwer:** `" + servers_each.name + "`\n **ID:** `" + servers_each.id + "`\n**Treść Błędu:** `Serwer Usunął kanał reklam!`")
                        .setThumbnail("https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
                        .setTimestamp()
                        .setColor("RED")

                    if (!channel) return client.channels.cache.get("815924149066661898").send(blad4)

                    channel.permissionOverwrites.forEach(p => {
                        if (!p || !channel.permissionsFor(p.id)) return;
                        const perms = channel.permissionsFor(p.id) ? channel.permissionsFor(p.id).serialize() : null;
                        if (perms === null || perms["VIEW_CHANNEL"] === false || perms["VIEW_CHANNEL"] === null) zablokowany = true
                    });

                    if (zablokowany === true) {
                        const blad2 = new MessageEmbed()
                            .setTitle("Wystąpił błąd!")
                            .setDescription("**Serwer:** `" + servers_each.name + "`\n **ID:** `" + servers_each.id + "`\n**Treść Błędu:** `Kanał reklam jest zablokowany, lub bota tam nie ma.`")
                            .setTimestamp()
                            .setThumbnail("https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
                            .setColor("RED")
                        client.channels.cache.get("815924149066661898").send(blad2)
                    }

                    if (!client.guilds.cache.get(servers_each.id)) {
                        const blad3 = new MessageEmbed()
                            .setTitle("Wystąpił błąd!")
                            .setDescription("**Serwer:** `" + servers_each.name + "`\n **ID:** `" + servers_each.id + "`\n**Treść Błędu:** `Bota nie ma na danym serwerze!`")
                            .setTimestamp()
                            .setThumbnail("https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
                            .setColor("RED")
                        client.channels.cache.get("815924149066661898").send(blad3)
                    }

                    if (!client.channels.cache.get(db.get(`kanal_reklama_${servers_each.id}`))) return;

                    if (db.get(`premium_${id}`)) {
                        const premium1 = new MessageEmbed()
                            .setAuthor(`🔒 Numer: ${numer}・📆 ID: ${id}・⭐ Cykl: PREMIUM`, "https://cdn.discordapp.com/emojis/715894604209324072.gif?v=1")
                            .setColor(db.get(`kolor_${id}`) || config.clr)
                            .setThumbnail(client.user.displayAvatarURL)
                            .setDescription(db.get(`reklama_${numer}`))
                            .setFooter("Reklama Cyklu Premium!\nFreezy © 2021")
                        channel.send(premium1)

                    } else {
                        if (!client.channels.cache.get(db.get(`kanal_reklama_${servers_each.id}`))) return;
                        if (!db.get(`kanal_reklama_${servers_each.id}`)) return;
                        channel.send(` \`🔎 NR: ${numer}; 🧪 ID: ${id}; 🔒 Cykl: Normalny\` \n\n${db.get(`reklama_${numer}`)}`)
                    }
                })

                db.add(`numer`, 1)
                db.add(`staty_${db.get(`reklama_${numer}_id`)}`, 1)
                console.log(`[Kolejka Reklam]: Wysłano reklamę numer: "${numer}"`)

            } catch (err) {
                const bl = new MesageEmbed()
                    .setTitle("Jakis kanal se zesral")
                    .setDescription(`\`\`\`js\n${err}\n\`\`\``)
                    .setColor("RED")
                client.channels.cache.get("819257672544157752").send(bl)
            }
        }, 5 * 60 * 1000)
    }
}