const db = require("quick.db")

module.exports = {
    name: "messageDelete",
    run: async (client, message) => {

        if (message.author.bot) return;

        let text = message.content

        if (text.length > 1024) {
            text = message.content.substr(0,950) + "....."
            db.set(`deleted_msg_${message.guild.id}_${message.channel.id}`, text)
            db.set(`msg_del_tag_${message.guild.id}_${message.channel.id}`, message.author.tag)
            db.set(`msg_au_${message.guild.id}_${message.channel.id}`, message.author.displayAvatarURL({ dynamic: true }))
        }

        db.set(`deleted_msg_${message.guild.id}_${message.channel.id}`, message.content)
        db.set(`msg_del_tag_${message.guild.id}_${message.channel.id}`, message.author.tag)
        db.set(`msg_au_${message.guild.id}_${message.channel.id}`, message.author.displayAvatarURL({ dynamic: true }))

    }

}