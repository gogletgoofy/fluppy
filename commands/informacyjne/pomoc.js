const { MessageEmbed, Collector, MessageCollector } = require("discord.js")
const db = require("quick.db")
const config = require("../../config")
require("../../ExtendedMessage")

module.exports = {
    name: "pomoc",
    aliases: ["help", "p", "h"],
    run: async (client, message) => {
        const filter = (reaction, user, guild) => {
            return user.id == message.author.id
        }

        const loading = new MessageEmbed()
            .setAuthor("Ładowanie Menu Pomocy...", "https://images-ext-1.discordapp.net/external/WJQozndZZyaL6ISo5p1NkzzFXDinjVCU8Nd7_xUAsTE/https/images-ext-1.discordapp.net/external/ekcXwwuWD6VwuhkVuG4Bx3ZOD3M5BO3Mj1vLGskQ710/%253Fv%253D1/https/cdn.discordapp.com/emojis/715894604209324072.gif")
            .setColor("#0c6ffa")

        const help = new MessageEmbed()
            .setAuthor("Menu Pomocy:", "https://cdn.discordapp.com/attachments/804040473576210502/804625269553758288/1611818873729.png")
            .setColor("#0c6ffa")
            .setThumbnail("https://cdn.discordapp.com/attachments/804040473576210502/804625269553758288/1611818873729.png")
            .setDescription(" <:czeka:797471968156712981> `‣` **Komendy Informacyjne** \n <:config:805097559068246057> `‣` **Komendy Konfiguracyjne**\n <:ver:798946248765472838> `‣` **Komendy Inne**\n <:leveling:819930509697876038> `‣` **System Leveli**\n <:glowna:805094212600463385> `‣` **Strona główna**")
            .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())

        message.inlineReply(loading).then(async m => {
            await m.react("797471968156712981"), await m.react("805097559068246057"), await m.react("798946248765472838"), await m.react("819930509697876038"), await m.react("805094212600463385")
            m.edit(help)
            let status = 0

            const lvl = new MessageEmbed()
                .setAuthor("Lista Komend Systemu Levelowania:", "https://cdn.discordapp.com/attachments/804040473576210502/804625269553758288/1611818873729.png")
                .setColor("#0c6ffa")
                .setDescription(`> <:leveling:819930509697876038> **${db.get(`guild_${message.guild.id}_prefix`) || "."}lvl-config <on/off/kanal> [#kanał]** \`‣\` \n\`\`\`\nW zależności od wybranej opcji, włącza, wyłącza lub ustawia kanał powiadomienia o nowych levelach\n\`\`\`\n\n> <:leveling:819930509697876038> **${db.get(`guild_${message.guild.id}_prefix`) || "."}rank** \`‣\` \n\`\`\`\nPokazuje twoją rangę/level\n\`\`\``)
                .setThumbnail("https://cdn.discordapp.com/attachments/804040473576210502/804625269553758288/1611818873729.png")
                .setFooter(`[] - Argmuent Opcjonalny | ${message.author.tag} (${message.author.id})`, message.author.avatarURL())

            const config = new MessageEmbed()
                .setAuthor("Lista Komend Konfiguracyjnych:", "https://cdn.discordapp.com/attachments/804040473576210502/804625269553758288/1611818873729.png")
                .setColor("#0c6ffa")
                .setDescription(`> <:config:805097559068246057> **${db.get(`guild_${message.guild.id}_prefix`) || "."}ustaw <typ konfiguracji: kanał/reklama> <kanał/reklama || w zależności od poprzeniego wyboru>** \`‣\` \n\`\`\`\nTą komendą ustawisz kanał wysyłania reklam oraz reklamę twojego serwera!\n\`\`\`\n\n> <:config:805097559068246057> **${db.get(`guild_${message.guild.id}_prefix`) || "."}prefix <nowy_prefix>** \`‣\`\n\`\`\`\nUstawia nowy prefix dla serwera\n\`\`\``)
                .setThumbnail("https://cdn.discordapp.com/attachments/804040473576210502/804625269553758288/1611818873729.png")
                .setFooter(`${message.author.tag} (${message.author.id})`, message.author.avatarURL())

            const inne = new MessageEmbed()
                .setAuthor("Inne:", "https://cdn.discordapp.com/attachments/804040473576210502/804625269553758288/1611818873729.png")
                .setColor("#0c6ffa")
                .setDescription(`> <:ver:798946248765472838> **${db.get(`guild_${message.guild.id}_prefix`) || "."}nakladka** \`‣\`  \n\`\`\`\nGeneruje nakładkę na zdjęcie profilowe.\n\`\`\`\n\n> <:ver:798946248765472838> **${db.get(`guild_${message.guild.id}_prefix`) || "."}zglos <tresc>** \`‣\`\n\`\`\`\nKomenda pozwala na zgłoszenie błędu/użytkownika\n\`\`\`\n> <:ver:798946248765472838> **${db.get(`guild_${message.guild.id}_prefix`) || "."}bump** \`‣\`\n\`\`\`\nPodbija Reklamę serwera. Funkcja tylko dla ⭐ Premium\n\`\`\`\n> <:ver:798946248765472838> **${db.get(`guild_${message.guild.id}_prefix`) || "."}snipe** \`‣\`\n\`\`\`\nPokazuje ostatnią usuniętą wiadomość na danym kanale\n\`\`\``)
                .setThumbnail("https://cdn.discordapp.com/attachments/804040473576210502/804625269553758288/1611818873729.png")
                .setFooter(`${message.author.tag} (${message.author.id})`, message.author.avatarURL())

            const info = new MessageEmbed()
                .setAuthor("Lista komend informacyjnych:", "https://cdn.discordapp.com/attachments/804040473576210502/804625269553758288/1611818873729.png")
                .setColor("#0c6ffa")
                .setDescription(`> <:czeka:797471968156712981> **${db.get(`guild_${message.guild.id}_prefix`) || "."}status** \`‣\` \n\`\`\`\nPokazuje reklamę serwera\n\`\`\`\n\n> <:czeka:797471968156712981> **${db.get(`guild_${message.guild.id}_prefix`) || "."}linki** \`‣\` \n\`\`\`\nWysyła potrzebne linki\n\`\`\`\n\n> <:czeka:797471968156712981> **${db.get(`guild_${message.guild.id}_prefix`) || "."}botinfo** \`‣\`\n\`\`\`\nPokazuje statystyki bota\n\`\`\``)
                .setThumbnail("https://cdn.discordapp.com/attachments/804040473576210502/804625269553758288/1611818873729.png")
                .setFooter(`${message.author.tag} (${message.author.id})`, message.author.avatarURL())
            const collector = m.createReactionCollector(filter, { time: 160000 })

            collector.on("collect", (reaction, user) => {
                reaction.users.remove(user.id)
                if (user.id !== message.author.id) return;
                if (reaction.emoji.id === "805097559068246057") {
                    status = 1
                    m.edit(config)

                }
                if (reaction.emoji.id === "797471968156712981") {
                    status = 1
                    m.edit(info)

                }
                if (reaction.emoji.id === "805094212600463385") {
                    status = 1
                    m.edit(help)

                }
                if (reaction.emoji.id === "798946248765472838") {
                    status = 1
                    m.edit(inne)

                }
                if (reaction.emoji.id === "819930509697876038") {
                    status = 1
                    m.edit(lvl)

                }
            })

            collector.on("end", collected => {
                if (status === 1) {
                    const koniec = new MessageEmbed()
                        .setAuthor("Czas na dodanie reakcji minął!", "https://cdn.discordapp.com/emojis/800338532853743646.png?v=1")
                        .setDescription(`\`\`\`fix\nCzas na dodanie reakcji minal! Nadal potrzebujesz pomocy? Uzyj komendy ${db.get(`guild_${message.guild.id}_prefix`) || "."}pomoc!\n\`\`\``)
                        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.avatarURL())
                        .setColor("#cc8800")
                        .setThumbnail("https://cdn.discordapp.com/emojis/794166286883618837.gif?v=1")
                    m.edit(koniec)
                    m.reactions.removeAll()

                } else {
                    const koniec = new MessageEmbed()
                        .setAuthor("Czas na dodanie reakcji minął!", "https://cdn.discordapp.com/emojis/800338532853743646.png?v=1")
                        .setDescription(`\`\`\`fix\nCzas na dodanie reakcji minal! Nadal potrzebujesz pomocy? Uzyj komendy ${db.get(`guild_${message.guild.id}_prefix`) || "."}pomoc!\n\`\`\``)
                        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.avatarURL())
                        .setColor("#cc8800")
                        .setThumbnail("https://cdn.discordapp.com/emojis/794166286883618837.gif?v=1")
                    m.edit(koniec)
                    m.reactions.removeAll()
                }
            })
        })
    }
}