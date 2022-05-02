const { MessageEmbed } = require("discord.js");
const db = require("quick.db")
const config = require("../config");

module.exports = {
    name: "message",
    run: async (client, message) => {

        // GIGA MAGICZNA BLOKADA KOMEND, BOT REAGUJE TYLKO NA OWNERÓW -> POTEM TO USUN JAPON
        // GIGA MAGICZNA BLOKADA KOMEND, BOT REAGUJE TYLKO NA OWNERÓW -> POTEM TO USUN JAPON

        if (message.author.id !== config.owners) return;
        
        // GIGA MAGICZNA BLOKADA KOMEND, BOT REAGUJE TYLKO NA OWNERÓW -> POTEM TO USUN JAPON
        // GIGA MAGICZNA BLOKADA KOMEND, BOT REAGUJE TYLKO NA OWNERÓW -> POTEM TO USUN JAPON

        const prefix = db.get(`guild_${message.guild.id}_prefix`) || config.prefix;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        let command = client.commands.get(cmd);

        if (message.author.bot) return;
        if (!message.guild) return;
        if (!message.content.startsWith(prefix)) return;
        if (!message.member) message.member = await message.guild.fetchMember(message);

        if (db.get(`gban_${message.author.id}`)) {
            const g = new MessageEmbed()
                .setAuthor("Nie możesz używać komend, ponieważ jesteś globalnie zbanowany!", "https://cdn.discordapp.com/emojis/797471177068380210.gif?v=1")
                .setDescription(`> **Powód Bana Globalnego:**\n> ${db.get(`gpowod_${message.author.id}`) || "Administrator nie podał powodu Bana Globalnego"}\n`)
                .setColor("RED")
                .setFooter("Uważasz, że global ban nie został nadany słusznie? Skontaktuj się z nami!")
                .setTimestamp()
            message.channel.send(g)
        }

        if (db.get(`gban_${message.author.id}`)) return;
        if (message.author.bot) return;
        if (!message.guild) return;
        if (!message.content.startsWith(prefix)) return;
        if (!message.member) message.member = await message.guild.fetchMember(message);

        if (cmd.length === 0) return;

        if (!command) command = client.commands.get(client.aliases.get(cmd));

        if (command)
            command.run(client, message, args);
    }
}