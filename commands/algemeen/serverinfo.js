const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
    var serverinfoEmbed = new Discord.MessageEmbed()
        .setTitle("Server Information.")
        .setDescription(`Here you can see our info of this discord server.`)
        .setColor("#00a846")
        .setThumbnail("https://cdn.discordapp.com/attachments/718421983951323156/741258810663895160/OKD_Logo.png")
        .setFooter("© OldKingdom | 2020")
        .addFields(
            { name: "Bot Name", value:"Bot" },
            { name: "You joint the discord server at: ", value: message.member.joinedAt },
            { name: "Total members", value: message.guild.memberCount },
    );

    return message.channel.send(serverinfoEmbed).then(msg => msg.delete({ timeout: 60000 })),
            message.delete();

}

    
    module.exports.help = {
        name: 'serverinfo',
    }   