const Discord = require('discord.js')

module.exports = {
    name: "nakladka",
    aliases: [],
    run: async (client, msg) => {
        const Canvas = require('canvas')
        const canvas = Canvas.createCanvas(1000, 1000);
        const ctx = canvas.getContext('2d');
        const applyText = (canvas, text) => {
            const ctx = canvas.getContext('2d');


            // Declare a base size of the font
            let fontSize = 70;

            do {
                // Assign the font to the context and decrement it so it can be measured again
                ctx.font = `${fontSize -= 10}px sans-serif`;
                // Compare pixel width of the text to the canvas minus the approximate avatar size
            } while (ctx.measureText(text).width > canvas.width - 300);

            // Return the result to use in the actual canvas
            return ctx.font;
        };
        const background = await Canvas.loadImage(msg.author.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }));
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        // Slightly smaller text placed above the member's display name

        // Add an exclamation point here and below




        const avatar = await Canvas.loadImage('./bot/nakladka.png');
        ctx.drawImage(avatar, 0, 0, 1000, 1000);

        const koniec = new Discord.MessageAttachment(canvas.toBuffer(), 'nakładka.png');

        msg.channel.send("Generowanie...")
        msg.channel.send(koniec)
        msg.channel.send("Wygenerowano!")
    }
}