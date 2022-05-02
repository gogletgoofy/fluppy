const Discord = require("discord.js")
require("../../ExtendedMessage")

const { inspect } = require('util');
module.exports = {
    name: "eval",
    run: async (client, msg, args) => {
    if (msg.author.id !== "521666724798660617") return;
    let evaled;
    try {
      evaled = await eval(args.join(' '));
      //msg.channel.send(evaled);
      let value;
      if (evaled === undefined) {
          value = "<none>"
      } else {
          value = evaled
      }
      console.log(inspect(evaled));
      const embedgit = new Discord.MessageEmbed()
      .setAuthor("Wykonano pomyślnie!", "https://images-ext-2.discordapp.net/external/Q7ma4BQ4SBRT2k3Unsu7GUl4EUgn60qjattZvk_I-t4/https/cdn.discordapp.com/emojis/799687207647445014.png")
      .addField("`🧬` Kod:", "```js\n" + args.join(" ") + "```")
      .addField("`🛒` Zwrócona wartość:", "```" + (value) + "```")
      .setColor("PURPLE")
      msg.inlineReply(embedgit)
      //console.log(evaled)
    }
    catch (error) {
      console.log(error);
      const evalerror = new Discord.MessageEmbed()
      .setAuthor("Wystąpił błąd!", client.user.displayAvatarURL())
      .setDescription("Błąd:\n```" + error + "```")
      .setColor("RED")
      msg.inlineReply(evalerror)
    }
  }

    
}