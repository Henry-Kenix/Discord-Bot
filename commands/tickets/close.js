const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
    const ticketcategoryID = "768425802449682432";

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`Sorry You can't do this.`).then(msg => msg.delete({ timeout: 10000 }));

    if (message.channel.parentID == ticketcategoryID) {
        message.channel.delete();
    } else {

        message.channel.send(`You can't do this in a public channel! \n You can only do this in a ticket!`).then(msg => msg.delete({ timeout: 10000 }));

    }

    if (!args[0]) return message.reply("No reason has been given").then(msg => msg.delete({ timeout: 10000 }));

    var reasonCloseReason = args.slice(0).join(" ");

    var embedCloseTicketLog = new Discord.MessageEmbed()
        .setColor("#520bb0")
        .setTitle(`Ticket, ` + message.channel.name)
        .setDescription(`This ticket has been closed successfully. \n\n Reason: ${reasonCloseReason}`)
        .setFooter("© Bot | 2020")
        .setTimestamp()
        .setThumbnail(`https://cdn.discordapp.com/icons/763468770428846129/bf7629717bb86709e1716b671a05a105.webp?size=128`)

    var ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "log");
    if (!ticketChannel) return message.reply("The channel was not found contact the Discord Manager or the Developer").then(msg => msg.delete({ timeout: 10000 }));


    ticketChannel.send(embedCloseTicketLog);

}

    
    
    module.exports.help = {
        name: 'close',
    }