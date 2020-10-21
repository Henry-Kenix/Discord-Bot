const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

    var helpEmbed = new Discord.MessageEmbed()
    .setTitle("Help Menu.")
    .setColor("#00a846")
    .setThumbnail(/*'Logo'*/)
    .setFooter("© bot | 2020")
    .setTimestamp()
    .addFields(
        {
            name: `General Commands`,
            value: `!help => show this help menu. \n!discord => shows the invite link of the discord. \n!idea => leave an idea. \n!serverinfo => shows the info of the server. \n!suggest => leave an idea. \n!instagram => returns the link of the instagram \n!links => returns all links. \n!mail => shows the email address. \n!rules => show the rules. \n!website => returns the link of the website \n!youtube => returns the link of the youtube channel.`,
            inline: true
        },
        {
            name: `Ticket Commands.`,
            value: "!ticket => create a ticket. \n! new => create a ticket. \n!create => create a ticket. \n!add => add someone to the ticket. \n!remove => remove someone from the ticket. \n!close => closes a ticket\n",
            inline: false
        },
        {
            name: `Moderation Commando's`,
            value: `!warn => give someone a warn. \n!tempmute => give someone a temporary mute \n!clear => delete messages. \n!notification => create a notification. \n!lockdown => lock all channels. \n!giveaway => create a giveaway. \n`,
            inline: false
        })

    var helpEmbedChannel = new Discord.MessageEmbed()
    .setTitle("Help Menu.")
    .setDescription(`You have received the commands in your DM!`)
    .setColor(`#00a846`)
    .setThumbnail(/*'Logo'*/)
    .setFooter("© Bot | 2020")
    .setTimestamp()

    return message.author.send(helpEmbed),
        message.delete(),
        message.channel.send(helpEmbedChannel).then(msg => msg.delete({ timeout: 10000 }));

}

    module.exports.help = {
        name: 'help',
    }