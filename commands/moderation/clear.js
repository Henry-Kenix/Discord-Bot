const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have the permission to do this!").then(msg => msg.delete({ timeout: 10000 })),
        message.delete();
 
    if (!args[0]) return message.reply("Enter a number that you want to remove").then(msg => msg.delete({ timeout: 10000 })),
        message.delete();
 
    if (Number.isInteger(parseInt(args[0]))) {
 
        var aantal = parseInt(args[0]) + 1;
 
        message.channel.bulkDelete(aantal).then(() => {
 
            if (args[0] == 0) {
 
                message.reply(`Are you stupid? I can't delete 0 posts anyway!`).then(msg => msg.delete({ timeout: 10000 }));
           
            } else if (args[0] == 1) {
           
                message.reply(`I deleted 1 post.`).then(msg => msg.delete({ timeout: 10000 }));
           
            } else {
           
                message.reply(`i have ${args[0]} messages deleted.`).then(msg => msg.delete({ timeout: 10000 }));
           
            }
 
        });
 
    } else {
        return message.reply("Enter a number.").then(msg => msg.delete({ timeout: 10000 }));
    }

    }
    
    module.exports.help = {
        name: 'clear',
    }