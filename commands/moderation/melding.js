const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply(`You do not have the correct permissions!`).then(msg => msg.delete({ timeout: 10000 })),
        message.delete();

    if (!args[0]) return message.reply(`You have not given a title, such as "Communication" or "Update.""`).then(msg => msg.delete({ timeout: 10000 })),
        message.delete();

    if (!args[1]) return message.reply(`You have not sent a message.`).then(msg => msg.delete({ timeout: 10000 })),
        message.delete();

    var channelTitel = args[0];

    var channelMessage = args.slice(1).join(" ");

    var meldingEmbed = new Discord.MessageEmbed()
        .setColor("#520bb0")
        .setTitle(`${channelTitel}`)
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`${channelMessage}`)
        .setThumbnail(/*'Logo'*/)

        return message.channel.send(meldingEmbed),
            message.delete();


}


    module.exports.help = {
        name: 'melding',
    }