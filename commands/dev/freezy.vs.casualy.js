const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const config = require("../../config")
const koxy = ["521666724798660617", "538437800102461440", "395471691892916224"];

module.exports = {
	name: "freezy-kox",
	run: async (client, msg) => {
		if (!koxy.includes(msg.author.id)) return;

		let res = await fetch("https://discord.com/api/v8/oauth2/authorize?client_id=804389994600857612&scope=bot", {
			method: "GET",
			headers: {
				Authorization: "NzE3MDczMzc1MzA2MDU1NzYw.YFoYdA.O6Ma35TX8g_zUs2EXdsIJ1xKlDA"
			}
		});

		res = await res.json();

		const info = new MessageEmbed()
			.setColor(config.mainColor)
			.setAuthor(`${client.guilds.cache.size > res.bot.approximate_guild_count ? "hehe bo wiesz, frezarka wygrywa" : "no i chuj casualy sie zesrało"}`, "https://cdn.discordapp.com/emojis/797935264554287134.gif?v=1")
            .addFields(
                { name: 'Serwerki Freeziego:', value: `> \`${client.guilds.cache.size}\``, inline: true },
		        { name: 'Serwerki Cashitaly.AD', value: `> \`${res.bot.approximate_guild_count}\``, inline: true },
            );

		msg.channel.send(info);

	}
}