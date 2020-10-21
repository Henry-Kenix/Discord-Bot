const { MessageEmbed } = require('discord.js');
const IGNORED = new Set([
    "720643240386363546",
    "720643409613815870",
    "720643430069436486",
    "720643481512574986",
    "740551124167295048",
    "740557521353441330",
    "740646067225493546",
    "740650173771939931",
    "721728855735533629",
    "729725092870881311",
    "740578807626596473",
    "740649617175216291"
]);

module.exports = {
    name: "lock",
    category: "moderation",
    run: async (client, message, args) => {
        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
        if (args[0] === 'on') {
            channels.forEach(channel => {
                if(!IGNORED.has(channel.id)) 
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                }).then(() => {
                    channel.setName(channel.name += `🔒`)
                })
            })
            return message.channel.send('locked all channels').then(msg => msg.delete({ timeout: 10000 })),
                message.delete();

        } else if (args[0] === 'off') {
            channels.forEach(channel => {
                if(!IGNORED.has(channel.id)) 
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: true
                }).then(() => {
                        channel.setName(channel.name.replace('🔒', ''))
                    }
                )
            })
            return message.channel.send('unlocked all channels').then(msg => msg.delete({ timeout: 10000 })),
                message.delete();
        }
    }
}

module.exports.help = {
    name: 'lockdown',
}