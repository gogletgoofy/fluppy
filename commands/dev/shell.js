const { MessageEmbed } = require('discord.js');
const { exec } = require('child_process');
const config = require("../../config");
require("../../ExtendedMessage");

module.exports = {
	name: 'shell',
	aliases: ['sh', 'cmd'],
	run: async (client, msg, args) => {
		if (!config.owners.includes(msg.author.id)) return;

		const cmd = args.join(' ');
		if (cmd === '') {
            const m = new MessageEmbed()
            .setAuthor('Shell', "https://images-ext-2.discordapp.net/external/Q7ma4BQ4SBRT2k3Unsu7GUl4EUgn60qjattZvk_I-t4/https/cdn.discordapp.com/emojis/799687207647445014.png")
			.setColor("RED")
            .setFooter(`Nie Podano argumentów!`)
            msg.channel.send(m)
		}

		const embed = new MessageEmbed()
			.setAuthor('Shell', "https://images-ext-2.discordapp.net/external/Q7ma4BQ4SBRT2k3Unsu7GUl4EUgn60qjattZvk_I-t4/https/cdn.discordapp.com/emojis/799687207647445014.png")
			.setColor(config.mainColor);

		exec(cmd, async (error, data, getter) => {

			if (error) {
				if (error.length > 1012) error = error.substring(0, 1012) + '...';
				embed.setDescription(`\`\`\`\n${error.message}\`\`\``).setColor("RED").setFooter("Błąd!")
				return msg.channel.send(embed);
			}

			if (getter) {
				if (data.length > 1012) data = data.substring(0, 1012) + '...';
				embed.setDescription(`\`\`\`\n${data}\`\`\``).setColor(config.mainColor);
				return msg.channel.send(embed);
			}

			if (data) {
				if (data.length > 1012) data = data.substring(0, 1012) + '...';
				embed.setDescription(`\`\`\`\n${data}\`\`\``);
				return msg.channel.send(embed);
			}

		});
	},
};