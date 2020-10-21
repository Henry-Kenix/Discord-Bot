const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
    if (!args[0]) return message.reply(`You have not sent a message.`).then(msg => msg.delete({ timeout: 10000 })),
        message.delete();

    var reasonSuggest = args.slice(0).join(" ");

    var suggestEmbed = new Discord.MessageEmbed()
        .setTitle(`Idea From ${message.author.username}.`)
        .setDescription(`${reasonSuggest}`)
        .setColor(`#00a846`)
        .setThumbnail("")
        .setFooter("© Bot | 2020")
        .setTimestamp()

    var suggestSendEmbed = new Discord.MessageEmbed()
        .setTitle(`${message.author.username}.`)
        .setDescription(`Your suggestion has been sent successfully.`)
        .setColor(`#00a846`)
        .setThumbnail("")
        .setFooter("© Bot | 2020")
        .setTimestamp()

    var channelSuggest = message.member.guild.channels.cache.get('765576763748646923');

    return message.channel.send(suggestSendEmbed).then(msg => msg.delete({ timeout: 10000 })),
        message.delete(),
        channelSuggest.send(suggestEmbed).then(MessageEmbed => {
            MessageEmbed.react('👍');
            MessageEmbed.react(`👎`);
        })
        

}


    module.exports.help = {
        name: 'idea',
    }