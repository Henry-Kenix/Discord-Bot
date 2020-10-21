const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var nieuwEmbed = new Discord.MessageEmbed()
    .setTitle('Number of members')
    .setDescription(`we currently have **__${message.guild.memberCount}__** members`)
    .setColor("#00a846")
    .setFooter("© OldKingdom | 2020")
    .setThumbnail(/*'Logo'*/)
    .setTimestamp();

return message.channel.send(nieuwEmbed);

    
}

    module.exports.help = {
        name: 'members',
    }