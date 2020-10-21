const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let cata = message.guild.channels.cache.find(c => c.name == "support tickets" && c.type == "category")    

    if (message.channel.parentID == cata.id) {

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!user) return message.channel.send("I could not find the user").then(msg => msg.delete({ timeout: 10000 })),
            message.delete();

        message.channel.updateOverwrite(user, { VIEW_CHANNEL: true, SEND_MESSAGES: true });

        message.channel.send(`${user} was added successfully.`).then(msg => msg.delete({ timeout: 10000 })),
            message.delete();

    } else return message.channel.send("This is not a ticket.").then(msg => msg.delete({ timeout: 10000 })),
        message.delete();


}

    module.exports.help = {
        name: "add",
}