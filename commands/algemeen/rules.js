const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
    var rulesEmbed = new Discord.MessageEmbed()
        .setTitle('Rules')
        .setDescription(`** General Rules **`)
        .addField ("** 1 **", "Insulting each other is not allowed!")
        .addField ("** 2 **", "Pinging our employees is not allowed!")
        .addField ("** 3 **", "Discord swearing is not allowed!")
        .addField ("** 4 **", "It is not allowed to advertise your own channel / discord!")
        .addField ("** 5 **", "PM Advertising is not allowed!")
        .addField ("** 6 **", "Misuse of buggs is not allowed.")
        .setFooter(`${message.guild.memberCount}`)
        .setTimestamp()
        .setColor(`#00a846`)

    return message.channel.send(rulesEmbed).then(msg => msg.delete({ timeout: 20000 })),
        message.delete();
        
}


    module.exports.help = {
        name: 'rules',
    }