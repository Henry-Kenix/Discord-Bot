const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const fs = require("fs");

const client = new discord.Client();


client.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("There are no files avalible!");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`The next files are found! ${f}`);

        client.commands.set(fileGet.help.name, fileGet);

    })

});

const bot = new discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const stuff = ['algemeen', 'moderation', 'tickets']; // Folder names. 
stuff.forEach(c => {
    readdir(`./commands/${c}/`, (err, files) => {
        if (err) throw err;
        console.log(`Laad ${files.length} files in (${c})`);
        files.forEach(f => {
            if (!f.endsWith(".js")) return;
            let props = require(`./commands/${c}/${f}`);
            props.help && client.commands.set(props.help.name, props);
        });
    });
});
client.on("guildMemberAdd", member => {

    var role = member.guild.roles.cache.get(`735951577663275119`);

    if (!role) return;

    member.roles.add(role)

    var channelWelkom = member.guild.channels.cache.get(`741285992417198162`);

    var channelWelkomEmbed = new discord.MessageEmbed()
        .setTitle("Welcome")
        .setDescription(`Welcome ${member}, in our discord!.`)
        .setColor("#00a846")
        .setThumbnail(/*"Logo"*/)
        .setFooter("Â© Bot | 2020")

    if (!channelWelkom) return console.log(`If this message doesn't work please contact a developer!`);

    channelWelkom.send(channelWelkomEmbed);

})

client.on("guildMemberRemove", member => {

    var channelLeave = member.guild.channels.cache.get(`x`);

    var channelLeaveEmbed = new discord.MessageEmbed()
        .setTitle("Leaving")
        .setDescription(`Good bye ${member}.`)
        .setColor("#00a846")
        .setThumbnail(/*'Logo'*/)
        .setFooter("Â© Bod | 2020")

    if (!channelLeave) return console.log(`If this message doesn't work please contact a developer!`);

    channelLeave.send(channelLeaveEmbed);

})


client.login(botConfig.token);

client.on("ready", async () => {

    console.log(`${client.user.username} is online`);
    client.user.setActivity("Simping", { type: "WATCHING" });
   /* function randomStatus() {
        let status = ["", "", ""]
        let rstatus = Math.floor(Math.random() * status.length);

        client.user.setActivity(status[rstatus], {type: "WATCHING"});
    }; setInterval(randomStatus, 30000)*/
    

});



client.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type == "dm") return;

    if (!message.content.startsWith(botConfig.prefix)) return;
    
    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");


    var scheldWoorden = JSON.parse(fs.readFileSync("./badWords.json"));

    var senteceUser = "";
    var amountScheldWoorden = 0;

    for (let y = 0; y < messageArray.length; y++) {

        const word = messageArray[y].toLowerCase();

        var changeWord = "";

        for (let i = 0; i < scheldWoorden["vloekwoorden"].length; i++) {

            if (word.includes(scheldWoorden["vloekwoorden"][i])) {

                changeWord = word.replace(scheldWoorden["vloekwoorden"][i], "******");

                senteceUser += " " + changeWord;

                amountScheldWoorden++;

            }

        }

        if (!changeWord) {
            senteceUser += " " + messageArray[y];
        }

    }

    if (amountScheldWoorden != 0) {

        message.delete();
        message.channel.send(senteceUser);
        message.channel.send("Swear words are not allowed!").then(msg => msg.delete({ timeout: 3000 }));

    }


    var command = messageArray[0];

    var arguments = messageArray.slice(1);

    var commands = client.commands.get(command.slice(prefix.length));

    if (commands) commands.run(client, message, arguments);


     if (command === `${prefix}kick`) {

        const args = message.content.slice(prefix.length).split(/ +/);

         if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Sorry, you can't do this.").then(msg => msg.delete({ timeout: 10000 })),
            message.delete();

         if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Sorry, you can't do this.").then(msg => msg.delete({ timeout: 10000 })),
            message.delete();

         if (!args[1]) return message.reply("No user specified.").then(msg => msg.delete({ timeout: 10000 })),
            message.delete();

         if (!args[2]) return message.reply("Please provide a reason.").then(msg => msg.delete({ timeout: 10000 })),
            message.delete();

         var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

         var reason = args.slice(2).join(" ");

        if (!kickUser) return message.reply("Can't find the user.").then(msg => msg.delete({ timeout: 10000 })),
            message.delete();

        var embedkick = new discord.MessageEmbed()
             .setColor("#520bb0")
             .setThumbnail(kickUser.user.displayAvatarURL)
             .setFooter(message.member.displayName, message.author.displayAvatarURL)
             .setTimestamp()
             .setDescription(`** Gekickt:** ${kickUser} (${kickUser.id})
                 **Gekickt by:** ${message.author}
                 **Reason: ** ${reason}`);

         var embedPromptkick = new discord.MessageEmbed()
             .setColor("#520bb0")
             .setAuthor("Please respond within 30 sec.")
             .setDescription(`Wil je ${kickUser} kicken?`);

         var channelKick = message.member.guild.channels.cache.get(/*"Chennle ID"*/);

         message.channel.send(embedPromptkick).then(async msg => {

             var emoji = await promptMessage(msg, message.author, 30, ["âœ…", "âŒ"]);


            
              message.channel.awaitMessages(m => m.author.id == message.author.id,
                  { max: 1, time: 30000 }).then(collected => {

                      if (collected.first().content.toLowerCase() == 'yes') {
                          message.reply('Kick member.').then(msg => msg.delete({ timeout: 10000 }));
                      }
                      else
                          message.reply('Canceled').then(msg => msg.delete({ timeout: 10000 }));

                  }).catch(() => {
                      message.reply('No answer after 30 sec, canceled.').then(msg => msg.delete({ timeout: 10000 }));
                  });


             if (emoji === "âœ…") {

                 msg.delete();

                kickUser.kick(reason).catch(err => {
                     if (err) return message.channel.send(`Something went wrong.`).then(msg => msg.delete({ timeout: 10000 }));
                 });

                 channelKick.send(embedkick);
                 message.reply(embedkick).then(msg => msg.delete({ timeout: 10000 }));

             } else if (emoji === "âŒ") {

                msg.delete();

                 message.reply("Kick canceled").then(msg => msg.delete({ timeout: 10000 }));

             }

         });
     }

    if (command === `${prefix}ban`) {

        var args = message.content.slice(prefix.length).split(/ +/);

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You do not have access to this!").then(msg => msg.delete({ timeout: 10000 })),
            message.delete();

        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("You do not have access to this!").then(msg => msg.delete({ timeout: 10000 })),
            message.delete();

        if (!args[1]) return message.reply("You have not specified a member!").then(msg => msg.delete({ timeout: 10000 })),
            message.delete();

        if (!args[2]) return message.reply("You have not given a reason!").then(msg => msg.delete({ timeout: 10000 })),
            message.delete();

        var banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

        var reasonban = args.slice(2).join(" ");

        if (!banUser) return message.reply("Can't find the user.").then(msg => msg.delete({ timeout: 10000 })),
            message.delete();

        var embedban = new discord.MessageEmbed()
            .setColor("#520bb0")
            .setTitle("Ban Menu")
            .setDescription(`Please respond within 30 seconds to complete the kick
            Conformation: Are you sure you want to kick ${banUser}?`);

        var embedcofirmedban = new discord.MessageEmbed()
            .setColor(`#520bb0`)
            .setFooter(message.member.displayName)
            .setTimestamp()
            .setDescription(`**Gebanned: ** ${banUser} (${banUser.id})
                **Gebanned door:** ${message.author}
                **Reason:** ${reasonban}`);

        var channelBan = message.member.guild.channels.cache.get(/*'channle ID'*/);

        message.channel.send(embedban).then(async msg => {

            var emoji = await promptMessage(msg, message.author, 30, ["âœ…", "âŒ"]);

            if (emoji === "âœ…") {

                msg.delete();


                banUser.ban(reasonban).catch(err => {
                    if (err) return message.channel.send(`Something went wrong.`).then(msg => msg.delete({ timeout: 10000 }));
                });

                channelBan.send(embedcofirmedban);
                message.reply(embedcofirmedban).then(msg => msg.delete({ timeout: 10000 }));

            } else if (emoji === "âŒ") {

                msg.delete();

                message.reply("Ban canceled").then(msg => msg.delete({ timeout: 10000 }));

            }

        });
    }
    async function promptMessage(message, author, time, reactions) {
        time *= 1000;


        for (const reaction of reactions) {
            await message.react(reaction);
        }

        const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;
        return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);
    }
}); 


var swearWords = ["Cancer", "kut", "kkr", "homo", "gay", "hoe", "tyfus", "bitch", "fuck",];

client.on("message", async message => {

    if (message.author.bot) return;
    if (message.channel.type === "DM") return;

    var msg = message.content.toLowerCase();

    for (let i = 0; i < swearWords.length; i++) {

        if (msg.includes(swearWords[i])){

            message.delete();

            return message.reply("This language is not allowed.").then(msg => msg.delete({timeout: 3000}));
        }
    }
});

bot.login(process.env.token); 