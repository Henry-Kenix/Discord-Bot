const discord = require ('discord.js')
const ms = require ('ms');

module.exports.run = async (bot, message, args) => {

    if (! message.member.hasPermission ("KICK_MEMBERS")) return message.reply ("You can't do this!"). then (msg => msg.delete ({timeout: 10000})),
        message.delete ();

    if (! args [0]) return message.channel.send (`You did not enter a specific time!`) .then (msg => msg.delete ({timeout: 10000})),
        message.delete ();

    if (! args [0] .endsWith ("d") &&! args [0] .endsWith ("h") &&! args [0] .endsWith ("m")) return message.channel.send (`Enter the following in d = days \nh = hours \nm = month! (!giveaway 1h *Channle* *Price*)`) .then (msg => msg.delete ({timeout: 10000})),
        message.delete ();

    if (isNaN (args [0] [0])) return message.channel.send (`That's not a number!`) .then (msg => msg.delete ({timeout: 10000})),
        message.delete ();

    let channel = message.mentions.channels.first ()

    if (! channel) return message.channel.send (`This channel was not found in the server!`) .then (msg => msg.delete ({timeout: 10000})),
        message.delete ();

    let prize = args.slice (2) .join ("")

    if (! prize) return message.channel.send (`No prize given!`) .then (msg => msg.delete ({timeout: 10000})),
        message.delete ();

    message.channel.send (`Giveaway created in ${channel}`) .then (msg => msg.delete ({timeout: 10000})),
        message.delete ();

    var giveEmbed = new discord.MessageEmbed()
    .setTitle(`**GIVEAWAY!!!**`)
    .setDescription(`A giveaway is being held by ${message.author}
    Price: **${prize}**
    Expires in : **${args[0]}** `)
    .setTimestamp(Date.now()+ms(args[0]))
    .setColor("#520bb0")
    .setFooter("© Bot | 2020")
    .setThumbnail(/*'Logo'*/)

    let m = await channel.send(giveEmbed)
    m.react("🎉")
    setTimeout(() => {
        if(m.reactions.cache.get("🎉").count<=2){
            message.channel.send(`Reactions: ${m.reactions.cache.get("🎉").count}`)
            return message.channel.send(`Not enough members participated.`)
        }
        
        let winner = m.reactions.cache.get("🎉").users.cache.filter(u=>!u.bot).random()
        
        var uitslagEmbed = new discord.MessageEmbed()
        .setTitle(`**GIVEAWAY UITSLAG!!**`)
        .setDescription(`Congratulations ${winner} you have won ** ${prize} **. \n create a ticket to receive your prize.`)
        .setTimestamp ()
        .setColor("#520bb0")
        .setFooter("© Bot | 2020")
        .setImage(/*'Logo'*/)

        channel.send(uitslagEmbed);

    }, ms(args[0]));
}
    

module.exports.help = {
    name: "giveaway"
}