const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
    const ms = require("ms");

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry You cannot do this.").then(msg => msg.delete({ timeout: 10000 })),
        message.delete();

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry You cannot do this.").then(msg => msg.delete({ timeout: 10000 })),
        message.delete();

    if (!args[0]) return message.reply("You have not specified a member!").then(msg => msg.delete({ timeout: 10000 })),
        message.delete();

    if (!args[2]) return message.reply("You have not given a reason!").then(msg => msg.delete({ timeout: 10000 })),
        message.delete();

    var tempMuteUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    var reasonTempMute = args.slice(2).join(" ");

    if (tempMuteUser.hasPermission("MANAGE_MESSAGES")) return message.reply("You cannot mute this user!").then(msg => msg.delete({ timeout: 10000 })),
        message.delete();

    if (!tempMuteUser) return message.reply("Cannot find the user.").then(msg => msg.delete({ timeout: 10000 })),
        message.delete();

    var muteRole = message.guild.roles.cache.get(/*'Mute ID role'*/);
    if (!muteRole) return message.channel.send(`The mute role was not found!`).then(msg => msg.delete({ timeout: 10000 })),
        message.delete();

    var muteTime = args[1];

    if (!muteTime) return message.channel.send(`No time specified.`).then(msg => msg.delete({ timeout: 10000 })),
        message.delete();

    var channelTempMute = message.member.guild.channels.cache.get(/*Channle ID*/);

    var embedTempMute = new Discord.MessageEmbed()
        .setColor("#520bb0")
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setThumbnail(`https://cdn.discordapp.com/attachments/556490607443312672/740626009367511188/image0.jpg`)
        .setDescription(`** GeTempMute:** ${tempMuteUser}
        **GeTempMuted By:** ${message.author}
        **Reason: ** ${reasonTempMute}`);

    await (tempMuteUser.roles.add(muteRole.id));
    message.channel.send(embedTempMute).then(msg => msg.delete({ timeout: 10000 })), //${tempMuteUser} is gemute voor ${muteTime} en de reden is ${reasonTempMute}
        channelTempMute.send(embedTempMute);

    setTimeout(() => {

        tempMuteUser.roles.remove(muteRole.id);

        message.channel.send(`${tempMuteUser} is geunmute!`).then(msg => msg.delete({ timeout: 10000 }));

    }, ms(muteTime));


}


    module.exports.help = {
        name: 'tempmute',
    }