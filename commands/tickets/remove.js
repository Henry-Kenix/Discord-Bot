const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let cata = message.guild.channels.cache.find(c => c.name == "support tickets" && c.type == "category")    

    if (message.channel.parentID == cata.id) {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`U kunt dit helaas niet doen vraag een medewerker om hulp`).then(msg => msg.delete({ timeout: 10000 })),
            message.delete();
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!user) return message.channel.send("Ik kon de gebruiker niet vinden").then(msg => msg.delete({ timeout: 10000 })),
            message.delete();

        message.channel.updateOverwrite(user, { VIEW_CHANNEL: false, SEND_MESSAGES: false });

        message.channel.send(`${user} was succesvol geremoved.`).then(msg => msg.delete({ timeout: 10000 })),
            message.delete();

    } else return message.channel.send("Dit is geen ticket.").then(msg => msg.delete({ timeout: 10000 })),
        message.delete();


}

    module.exports.help = {
        name: "remove",
}