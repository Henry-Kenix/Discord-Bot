const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
    var linksEmbed = new Discord.MessageEmbed()
        .setTitle("All our links")
        .setDescription("Soon")
        .setTimestamp()
        .setFooter("Links")
        .setColor(`#00a846`)

        return message.channel.send(linksEmbed).then(msg => msg.delete({ timeout: 20000 })),
            message.delete();
        
}


    module.exports.help = {
        name: 'links',
    }