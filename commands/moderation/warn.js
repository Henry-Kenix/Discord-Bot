const Discord = require("discord.js");
const fs = require("fs");
const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry You cannot do this.").then(msg => msg.delete({ timeout: 10000 })),
        message.delete();

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry You cannot do this.").then(msg => msg.delete({ timeout: 10000 })),
        message.delete();

    if (!args[0]) return message.reply("You have not specified a member!").then(msg => msg.delete({ timeout: 10000 })),
        message.delete();

    if (!args[1]) return message.reply("You have not given a reason!").then(msg => msg.delete({ timeout: 10000 })),
        message.delete();

    var warnUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    var reasonwarn = args.slice(1).join(" ");

    if (warnUser.hasPermission("MANAGE_MESSAGES")) return message.reply("You cannot warn this user!"),
        message.delete();

    if (!warnUser) return message.reply("Can't find the user."),
        message.delete();

    if (!warns[warnUser.id]) warns[warnUser.id] = {
        warns: 0
    };

    warns[warnUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
        if (err) console.log(`Something went wrong while saving the warn!`);
    });

    var embedWarn = new Discord.MessageEmbed()
        .setColor("#520bb0")
        .setFooter(message.member.displayName)
        .setTimestamp()
        .setThumbnail(`https://cdn.discordapp.com/attachments/556490607443312672/740626009367511188/image0.jpg`)
        .setDescription(`**Gewarned: ** ${warnUser} (${warnUser.id})
    **Gewarned By:** ${message.author}
    **Reason:** ${reasonwarn}`)
        .addField("Number of warns", warns[warnUser.id].warns);

    var channelWarn = message.member.guild.channels.cache.get(/*'channle ID'*/);

    if (!channelWarn) return console.log(`The log channel was not found!`);

    message.reply(`You have ${warnUser} gewarned.`).then(msg => msg.delete({ timeout: 10000 })),
    channelWarn.send(embedWarn);

}


    module.exports.help = {
        name: 'warn',
    }