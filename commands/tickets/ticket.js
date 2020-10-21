const Discord = require("discord.js");
const discord = require("discord.js");
var one = require("discord-emoji").symbols.one;
var two = require("discord-emoji").symbols.two;
var three = require("discord-emoji").symbols.three;
var four = require("discord-emoji").symbols.four;

module.exports.run = async (bot, message, args) => {

    var botIcon = bot.user.displayAvatarURL;

    const ticketcategoryID = "768425802449682432";
  
    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

    var ticketBestaat = false;

    message.guild.channels.cache.forEach(channel => {

        if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {
            ticketBestaat = true;

            message.reply("You have already created a ticket").then(msg => msg.delete({ timeout: 10000 })),
                message.delete();

            return;
        }

    });

    if (ticketBestaat) return;

    var ticketEmbedCreate = new Discord.MessageEmbed()
        .setColor(`#520bb0`)
        .setTitle(`${message.author.username} Your support channel is being created!`)
        .setFooter("© Bot | 2020")
        .setTimestamp()
        .setThumbnail(`https://cdn.discordapp.com/icons/763468770428846129/bf7629717bb86709e1716b671a05a105.webp?size=128`)

    message.channel.send(ticketEmbedCreate).then(msg => msg.delete({ timeout: 10000 })),
        message.delete();

    message.guild.channels.create(userName.toLowerCase() + "-" + userDiscriminator, { type: 'text' }).then(
        (createdChannel) => {
            createdChannel.setParent(ticketcategoryID).then(
                (settedParent) => {

                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'), {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false
                    });

                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === 'Vrijwillger'), {
                        CREATE_INSTANT_INVITE: false,
                        READ_MESSAGES: true,
                        SEND_MESSAGES: true,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        ADD_REACTIONS: true,
                        READ_MESSAGE_HISTORY: true,
                        VIEW_CHANNEL: true
                    });

                    settedParent.updateOverwrite(message.author.id, {
                        CREATE_INSTANT_INVITE: false,
                        READ_MESSAGES: true,
                        SEND_MESSAGES: true,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        ADD_REACTIONS: true,
                        READ_MESSAGE_HISTORY: true,
                        VIEW_CHANNEL: true
                    });

                    var embedTicketKanaal = new Discord.MessageEmbed()
                        .setColor("#520bb0")
                        .setTitle(`Hoi ${message.author.username}`)
                        .setDescription(`As we can see you have created a ticket! \n I would like to ask you to respond with one of the emojis \n\n1️⃣ general \n2️⃣ questions \n3️⃣ need-help \n4️⃣ other`)
                        .setFooter("© Bot | 2020")
                        .setTimestamp()
                        .setThumbnail(`https://cdn.discordapp.com/icons/763468770428846129/bf7629717bb86709e1716b671a05a105.webp?size=128`)

                        settedParent.send(embedTicketKanaal).then(async function (embedMessage) {

                            await embedMessage.react(one);
                            await embedMessage.react(two);
                            await embedMessage.react(three);
                            await embedMessage.react(four);
            
                            const filter = (reaction, user) => {
                                return [one, two, three, four, "5️⃣"].includes(reaction.emoji.name) && user.id === message.author.id;
                            };
            
                            embedMessage.awaitReactions(filter, {
                                max: 1,
                                time: 60000,
                                errors: ['time']
                            })
                                .then(collected => {
                                    const reaction = collected.first();
            
                                    if (reaction.emoji.name === one) {
            
                                        embedMessage.delete()
                                        settedParent.setName("『📃』General-" + userName);
            
                                        var ictAlgemeenEmbed = new discord.MessageEmbed()
                                            .setColor("#520bb0")
                                            .setThumbnail(`https://cdn.discordapp.com/icons/763468770428846129/bf7629717bb86709e1716b671a05a105.webp?size=128`)
                                            .setTitle(message.author.username.toString() + " | general 🎫")
                                            .setDescription(`Thank you for creating an general ticket. \n If you already explain your problem, we can help you as soon as possible.`)
                                            .setTimestamp()
                                            .setFooter(`© Bot | 2020`)

                                        settedParent.send(ictAlgemeenEmbed)
            
                                    }

                                    if (reaction.emoji.name === two) {
            
                                        embedMessage.delete()
                                        settedParent.setName("『❓』Questions-" + userName);
            
                                        var ictErrorsEmbed = new discord.MessageEmbed()
                                            .setColor("#520bb0")
                                            .setThumbnail(`https://cdn.discordapp.com/icons/763468770428846129/bf7629717bb86709e1716b671a05a105.webp?size=128`)
                                            .setTitle(message.author.username.toString() + " | questions 🎫")
                                            .setDescription(`Thank you for creating an questions ticket. \n If you already explain your problem, we can help you as soon as possible.`)
                                            .setTimestamp()
                                            .setFooter(`© Bot | 2020`)

                                        settedParent.send(ictErrorsEmbed)
            
                                    }

                                    if (reaction.emoji.name === three) {
            
                                        embedMessage.delete()
                                        settedParent.setName("『🧩』Need-Help-" + userName);
            
                                        var ictSpoedEmbed = new discord.MessageEmbed()
                                            .setColor("#520bb0")
                                            .setTitle(message.author.username.toString() + " | need-help 🎫")
                                            .setDescription(`Thank you for creating an need help ticket. \n If you already explain your problem, we can help you as soon as possible.`)
                                            .setThumbnail(`https://cdn.discordapp.com/icons/763468770428846129/bf7629717bb86709e1716b671a05a105.webp?size=128`)
                                            .setTimestamp()
                                            .setFooter(`© Bot | 2020`)

                                        settedParent.send(ictSpoedEmbed)
            
                                    }

                                    if (reaction.emoji.name === three) {
            
                                        embedMessage.delete()
                                        settedParent.setName("『💭』Other-" + userName);
            
                                        var overigEmbed = new discord.MessageEmbed()
                                            .setColor("#520bb0")
                                            .setTitle(message.author.username.toString() + " | other 🎫")
                                            .setDescription(`Thank you for creating an other ticket. \n If you already explain your problem, we can help you as soon as possible.`)
                                            .setThumbnail(`https://cdn.discordapp.com/icons/763468770428846129/bf7629717bb86709e1716b671a05a105.webp?size=128`)
                                            .setTimestamp()
                                            .setFooter(`© Bot | 2020`)

                                        settedParent.send(overigEmbed)
            
                                    }

                                });
                
                    // Emojis aan teksten kopellen.
                    async function promptMessage(message, author, time, reactions) {
                    // We gaan eerst de tijd * 1000 doen zodat we seconden uitkomen.
                    time *= 1000;

                    // We gaan ieder meegegeven reactie onder de reactie plaatsen.
                    for (const reaction of reactions) {
                        await message.react(reaction);
                    }

                    // Als de emoji de juiste emoji is die men heeft opgegeven en als ook de auteur die dit heeft aangemaakt er op klikt
                    // dan kunnen we een bericht terug sturen.
                    const filter = (reaction, user) => {
                        return [one, two, three, four].includes(reaction.emoji.name) && user.id === message.author.id;
                    };

                    // We kijken als de reactie juist is, dus met die filter en ook het aantal keren en binnen de tijd.
                    // Dan kunnen we bericht terug sturen met dat icoontje dat is aangeduid.
                    return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);
                    }

                    

                            // settedParent.send(embedTicketKanaal);

                }
            ).catch(err => {
                message.channel.send(`Er is iets fout gegaan probeer het opnieuw \n Blijft dit probleem voor komen? contacteer de Developer`).then(msg => msg.delete({ timeout: 10000 })),
                    message.delete()
            });
        }
    ).catch(err => {
        message.channel.send(`Er is iets fout gegaan probeer het opnieuw \n Blijft dit probleem voor komen? contacteer de Developer`).then(msg => msg.delete({ timeout: 10000 })),
            message.delete();
    });
})

}


    module.exports.help = {
        name: 'ticket',
    }