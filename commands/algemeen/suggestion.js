const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
    if (!args[0]) return message.reply("You have not given up any idea!").then(msg => msg.delete({ timeout: 10000 })),
        message.delete();

    var reasonSuggest = args.slice(0).join(" ");

    var suggestEmbed = new Discord.MessageEmbed()
        .setTitle(`Idea of ${message.author.username}.`)
        .setDescription(`${reasonSuggest}`)
        .setColor("#00a846")
        .setFooter("© Bot | 2020")
        .setThumbnail(`https://cdn.discordapp.com/attachments/718421983951323156/741258810663895160/OKD_Logo.png`)
        .setTimestamp()

    var suggestSendEmbed = new Discord.MessageEmbed()
        .setTitle(`${message.author.username}.`)
        .setDescription(`Your suggestion has been sent successfully.`)
        .setColor("#00a846")
        .setFooter("© Bot | 2020")
        .setThumbnail(/*'Logo'*/)
        .setTimestamp()

    var channelSuggest = message.member.guild.channels.cache.get("765576763748646923");

    return message.channel.send(suggestSendEmbed).then(msg => msg.delete({ timeout: 10000 })),
        message.delete(),
        channelSuggest.send(suggestEmbed).then(MessageEmbed => {
            MessageEmbed.react('👍');
            MessageEmbed.react(`👎`);
        })
}


    module.exports.help = {
        name: 'suggestion',
    }