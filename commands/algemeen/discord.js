const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
        return message.channel.send('*link*').then(msg => msg.delete({ timeout: 20000 })),
            message.delete();
        
}


    module.exports.help = {
        name: 'discord',
    }