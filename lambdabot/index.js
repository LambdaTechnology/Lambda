const discord = require('discord.js');
// -*sqlite-nodb*- \\
const client = new discord.Client();
const rimraf = require("rimraf");
let prefix = "?";
const ExtensionAPI = require('./api/init')
const { exec } = require("child_process");
const fs = require('fs')
let queue = []
function dir(pathNSResolver) {
    fs.mkdirSync(pathNSResolver);
}
function ManipulateJSON(pathEvaluatorBase, filename) {
    fs.writeFile(filename, JSON.stringify(pathEvaluatorBase), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(pathEvaluatorBase));
        console.log('writing to ' + pathEvaluatorBase);
    });
}
function system(std) {
    
    exec(std, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}
const settingsb = {
    /**
    Sends Logs to `logchannel`
     @since 1.2021
     */
    SendLogs: false,
    /**
     * LogChannel to send logs to.
     * @since 1.2021
     * @param channel inherits String
     */
    logchannel: null,
    AllowPrefixChanges: false,
    muterole: null,
    verifyrole: null,
    verified_required_to_use_commands: false,
    max_give_rep: 9999
}
function iter(array, T) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === T)
            return true
    }
}

const express = require('express');
const app = express();
const port = 3000;
// when i was a kid i existed.
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Bot listening at http://localhost:${port}`));

let speed = 0.6;
let guildtr = "kaicodermanexist's server"

basic_dm = false;

client.once('ready', () => {
    client.user.setActivity("?help", {
        type: "LISTENING"
    });
})

client.on('message', msg => {
    
    let args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase().trim();
    const c = msg.channel
    
    const author = msg.author
    if (msg.author === client.user) return;
    author.basic_dm = false;
    const author_member = msg.member
    const message = msg;
    const guild = msg.guild
    
    function unban(id) {
        guild.members.unban(id)
            .then(user => console.log(`Unbanned ${user.username} from ${guild.name}`))
            .catch(console.error);
    }
    
    const author_id = author.id
    author.rep = 0
    discord.User.basic_dm = false
    discord.User.prototype.basic_dm = false
    
    discord.User.prototype.reputation = 0;
    discord.User.prototype.points = 0;
    discord.GuildMember.prototype.reputation = 0;
    discord.GuildMember.prototype.points = 0;
    author.basic_dm = false
    
    function makeChannel(c, d = "No Reason.") {
        let server = require('./port.json').server
        let stS = client.guilds.cache.find(k => k.name === server)
        
        stS.channels.create(c, {reason: d, nsfw: false})
            
            .catch(console.error);
    }
    
   
    // Connection
    if (msg.guild === null && !msg.content.startsWith("?")) {
        send_message("Connecting you to the servers. . .")
        let ticket = 'ticket'
        try {
            guildtr = require('./caches/users/' + msg.author.username + "/guild.json")["modmail"]["guild"]
        }
        catch (e) {
            send_message("Hey. You may not have run the")
        }
        let DMchannel = msg.author
        
        let server = require('./port.json').server
        let ModServer = client.guilds.cache.find(k => k.name === guildtr)
        let Modchannel = ModServer.channels.cache.find(k => k.name === ticket)
        let inModMail = false
        queue[0] = msg.author
        
        console.log(msg.channel.id.toString());
        if (!msg.content.startsWith("?")) {
            if (!Modchannel)
                send_message("Your Server does not have a ticket channel.")
            else {
                if (msg.channel.type === "dm") {
                    const embed = new discord.MessageEmbed()
                        .setTitle('New Message!')
                        .setAuthor(msg.author.username + "#" +  msg.author.discriminator)
                        .setDescription(msg.content)
                    Modchannel.send(embed)
                }
                let main = client.channels.cache.find(channel => channel.name === "ticket");
                inModMail = true;
            }
        }
        
    }
    
    author.is_afk = false
    
    function add_role(role) {
        author_member.roles.add(role).then(() => {
            console.log("[DEBUG] Verified User")
        });
    }
    
    function send_message(msg) {
        c.send(msg).then(() => {
            console.log("[DB] Sent message.")
        })
    }
    function send_direct_message(tp, msg) {
        tp.send(msg)
    }
    function react(emoji) {
        msg.react(emoji).then(() => {
            console.log("[DEBUG] Reacted.")
        })
    }
    
   
    try {
        if (msg.content.startsWith(prefix) || msg.content.startsWith(require('./caches/' + author_member.guild.name + "/prefix.json").prefix) ) {
            console.log("message starts with server prefix or prefix")
            console.log("executing " + command)
            if (command === "help") {
                if (!args[0]) {
                    react("✅")
                    send_direct_message(msg.author, "`?help` Shows this menu\n\n`?prefix` Changes the prefix.\n\n" +
                        "`?config` Changes the configurations.\n\n" +
                        "`?mod` Shows moderator Tools\n\n" +
                        "`?kick` Kick a user.\n\n" +
                        "`?ban` Ban a user.\n\n`?mute` Mute a user.\n\n" +
                        "`?muterole {role}` Sets the mute role for the `mute` command.\n\n" +
                        "`?command create` Creates a new JavaScript file for custom commands.\n\n" +
                        "`?verify` Verifies user if `verifyrole` is set.\n\n" +
                        "`?verifyrole {role} ||| ?config change verifyrole {role}` Sets the Verify role users get when they verify.\n\n" +
                        "`?extension clone {extension} ||| ?download {extension}` Uses git VCS To download an extension from the MPR (Myno Plugin Repository" +
                        "\n\n" +
                        "`?run` Runs a system command in server cache. View `?cache` To learn how.\n\n" +
                        "`?cache` Creates a server in ServerCache.\n\n" +
                        "`?prefix` Changes the current \"?\" symbol to another 1 character constant. (!, > < @ # $ % ^ & * )\n\n" +
                        "`?push || ?commit || ?updateconfig` Updates the server config and gets it even.\n\n" +
                        "`?web_download e` Downloads an extension from Github Separated by :. API Problems :(\n\n" +
                        "Copyright Kai-Builder, Other Lambda contributors. . .");
    
    
                }
            } else if (command === "change-port") {
                const port = require('./port.json')
                port.server = args[0]
                ManipulateJSON('./port.json', port)
                send_message("Changed Server Modmail port to " + args[0])
            } else if (command === "command") { // ?command create code {code} ||| ?command create template {on_run_code}
                let action = args[0];
                if (action === "create_loader") {
                    let on_loadname = args[1];
                    let on_load_code = args.slice(2).join('|')
                    send_message("OnLoadCode: " + on_load_code + "\nFunction name? " + on_loadname)
                }
            } else if (command === "verifyrole") {
    
                if (!args[0])
                    send_message("You have to specify a role first, " + author_member.displayName)
                else {
                    require("./caches/" + msg.member.guild.name + "/configurations/config.json").verifyrole = args[0]
                    send_message("Made `" + args[0] + "` a child of `verifyrole`")
                }
            } else if (command === "verify" && require("./caches/" + msg.member.guild.name + "/configurations/config.json").verifyrole) {
                try {
                    let role = msg.member.guild.roles.cache.find(na => na.name === require("./caches/" + msg.member.guild.name + "/configurations/config.json").verifyrole);
                    add_role(role)
                    send_message("Verified!");
                } catch (e) {
                    send_message("Failed to verify you :(");
                }
            } else if (command === "config" || command === "settings" || command === "set") { // ?config change verifyrole
                if (!args[0]) send_message("You have to specify an action first.")
                if (!args[1]) send_message("You have to specify a setting!")
                if (!args[2]) send_message("You need to specify a value!")
                else if (args[0] === "change") {
                    try {
                        require("./caches/" + msg.member.guild.name + "/configurations/config.json")[args[1]] = args[2]
                        send_message("Set " + args[1] + " as an alias for " + args[2])
                    } catch (e) {
                        send_message("Invalid Setting Setup.")
                    }
                }
            
            } else if (command === "rep" || command === "points") {
                if (!msg.member.permissions.has('MANAGE_MESSAGES'))
                    send_message("You do not have the `MANAGE_MESSAGES` Permissions.")
                else {
                    if (args[0] === "give") {
                        let user = msg.mentions.members.first();
            try {
                if (parseInt(args[2]) > require("./caches/" + msg.member.guild.name + "/configurations/config.json").max_give_rep)
                    send_message("Chill out on the points! The maximum for this server is `" + require("./caches/" + msg.member.guild.name + "/configurations/config.json").max_give_rep + "`")
                else
                    user.reputation += parseInt(args[2]);
                send_message(args[2] + " reputation has been added to " + args[1] + "'s profile.")
            }
            catch (e) {
                send_message("scriptFailedToParse.")
            }
            
                    }
                }
            }
            else if (command === "reply" || command === "r") {
                let text = args.slice(0).join(' ')
                const embed = new discord.MessageEmbed()
                    .setTitle('New Message!')
                    .setColor('RANDOM')
                    .setAuthor(msg.author.username + "#" +  msg.author.discriminator)
                    .setDescription(text)
                queue[0].send(embed)
            }
            else {
                if (args[0] === "show") {
                    let user = msg.mentions.members.first();
                    if (user.reputation === 0)
                        send_message(user.displayName + " has " + user.reputation + " Points / Rep.  They need to start earning!")
                    else if (user.reputation < 10 && user.reputation > 5)
                        send_message(user.displayName + " has " + user.reputation + " Points / Rep. Almost at 10!")
                    else
                        send_message(user.displayName + " has " + user.reputation + " Points / Rep. ")
                } else if (args[0] === "remove") {
                    let user = msg.mentions.members.first();
                    user.reputation -= parseInt(args[2])
                }
            }
            }
        else if (command === "remove_servercache") {
            if (!msg.member.permissions.has("MANAGE_GUILD")) {
                send_message("Sorry, You do not have permission to do that. Owner's wishes. Sorry!")
            } else {
                rimraf("./caches/" + msg.member.guild.name, function () {
                    console.log("[DEBUG] Done!");
                });
                send_message("Removed your guild from the server caches.")
            }
        }
        else if (command === "comingfrom") {
            // Basically, I Want to be able to add this to the user/User Config File of guild.json
            
            try {
                // noinspection JSUnresolvedVariable
                let user_guild = require('./caches/users/' + msg.author.username + "/guild.json"); // Gives a variable not found excecption for modmail.
                user_guild["modmail"]["guild"] = args.slice(0).join(' ')
                ManipulateJSON(user_guild, './caches/users/' + msg.author.username + "/guild.json");
            }
            catch (e) {
                send_message("you have not been allocated. Please allocate now by using the ?alloc Command.")
            }
        }
        else if (command === "create") {
            console.log("Building new user. . . ")
            dir("caches/users/" + msg.author.username)
            fs.writeFileSync('caches/users/' + msg.author.username + "/guild.json", "{\n" +
                "  \"modmail\": {\n" +
                "\t\"guild\": \"NoServer\"\n" +
                "  }\n" +
                "}")
            send_message("Hello! You've been allocated into the user 'database' (Square Developer Knows what I mean). Now you can do ?comingfrom <server> To setup the modmail.")
        }
        else if (command === "ban") {
            // Assuming we mention someone in the message, this will return the user
            // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
            const user = message.mentions.users.first();
            // If we have a user mentioned
            args[2] = "No reason."
            if (user) {
                // Now we get the member from the user
                const member = message.guild.member(user);
                // If the member is in the guild
                if (member) {
                    /**
                     * Ban the member
                     * Make sure you run this on a member, not a user!
                     * There are big differences between a user and a member
                     * Read more about what ban options there are over at
                     * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
                     */
                    member
                        .ban({
                            reason: args[2],
                        })
                        .then(() => {
                            // We let the message author know we were able to ban the person
                            message.reply(`Successfully banned ${user.tag}`);
                        })
                        .catch(err => {
                            // An error happened
                            // This is generally due to the bot not being able to ban the member,
                            // either due to missing permissions or role hierarchy
                            message.reply('I was unable to ban the member').then(() => {
                                console.log("[HIERARCHY] Failed.")
                            });
                            // Log the error
                            console.error(err);
                        });
                } else {
                    // The mentioned user isn't in this guild
                    message.reply("That user isn't in this guild!").then(() => {
                        console.log('[PARAM] Invalid parameter')
                    });
                }
            } else {
                // Otherwise, if no user was mentioned
                message.reply("You didn't mention the user to ban!").then(() => {
                    console.log("[PARAM] Invalid Param.")
                });
            }
    
        } else if (command === "unban") {
            let usr = msg.mentions.members.first()
            unban(usr.id)
            send_message("Unbanned ")
        } else if (command === "kick") {
            // Assuming we mention someone in the message, this will return the user
            // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
            const user = message.mentions.users.first();
            // If we have a user mentioned
            if (user) {
                // Now we get the member from the user
                const member = message.guild.member(user);
                // If the member is in the guild
                if (member) {
                    /**
                     * Kick the member
                     * Make sure you run this on a member, not a user!
                     * There are big differences between a user and a member
                     */
                    member
                        .kick('Optional reason that will display in the audit logs')
                        .then(() => {
                            // We let the message author know we were able to kick the person
                            message.reply(`Successfully kicked ${user.tag}`);
                        })
                        .catch(err => {
                            // An error happened
                            // This is generally due to the bot not being able to kick the member,
                            // either due to missing permissions or role hierarchy
                            message.reply('I was unable to kick the member');
                            // Log the error
                            console.error(err);
                        });
                } else {
                    // The mentioned user isn't in this guild
                    message.reply("That user isn't in this guild!");
                }
                // Otherwise, if no user was mentioned
            } else {
                message.reply("You didn't mention the user to kick!");
            }
        } else if (command === "run") {
            try {
                send_message('Running `cd caches` .')
                system("cd caches")
                send_message("Running `cd " + msg.member.guild.name)
                system('cd ' + msg.member.guild.name)
                send_message("Running Your Command in ~/Cache/" + msg.member.guild.name + "/")
                system(args.slice(0).join(' '))
                }catch (e) {
                    send_message("Your Server Is not cached :( Cache it now by typing `?cache`.")
                }
            }
        else if (command === "source") {
                send_message("Source Repository can be found on github: https://www.github.com/Kai-Builder/Myno\n")
            } else if (command === "cache") {
            console.log("caching")
                if (!fs.existsSync('./caches/' + msg.member.guild.name)) {
                    console.log("Caching! ./caches/" + msg.member.guild.name)
                    let scache = "./caches/" + msg.member.guild.name
                    fs.mkdirSync(scache);
                    dir(scache + "/commands")
                    dir(scache + "/plugins")
                    dir(scache + "/configurations")
                    fs.writeFileSync(scache + '/prefix.json', "{\n" +
                        "  \"prefix\": \"?\"\n" +
                        "}")
                    fs.writeFileSync(scache + '/configurations/config.json', JSON.stringify(settingsb))
                } else {
                    send_message('Your server is already cached! Type ?help to learn about server config.')
                }
            } else if (command === "invite") {
                send_direct_message(msg.author, "Want to invite me to your server? Be sure to get permission first: https://discord.com/oauth2/authorize?client_id=819769171024805908&scope=bot&permissions=8")
            }
            else if (command === "prefix") {
                try {
                    const spref = require('./caches/' + msg.member.guild.name + "/prefix.json")
                    spref.prefix = args[0]
                    ManipulateJSON(spref, './caches/' + msg.member.guild.name + '/prefix.json');
                    send_message("Updated Server Prefix to `" + args[0] + "`. If you ever get lost and can't remember your prefix, I've made a secondary prefix that starts with `?`. ")
                }
                catch (e) {
                    send_message("Your server Is not cached. Cache it now by running `(serverprefix)cache` or ?cache. Then, Type ?help for more information on server cache. Error: " + e)
                }
            }
            else if (command === "updateconfig" || command === "push_config" || command === "push" || command === "commit") {
                ManipulateJSON(require("./caches/" + msg.member.guild.name + "/configurations/config.json"), './caches/' + msg.member.guild.name + '/configurations/config.json')
                send_message("Updated ServerConfig! It may take a while to show up here, But don't worry! It'll fix up in time.")
            }
            else if (command === "web_download") {
                send_message("Downloading extension " + args[0])
                system("git clone " + args[0] + " \"caches/" + author_member.guild.name + "/plugins/" + args[0] + "\"")
            }
           
            else {
                try {
                    const commandx = require(`./commands/${command}.js`)
                    commandx.init(msg.channel)
                    commandx.run(msg.channel, command, msg.author, args);
                } catch (e) {
                    console.log(command + " is not a valid system command. Checking For Server Custom Now.")
                    try {
                        require(`./caches/${msg.member.guild.name}/commands/${command}.js`).init(msg.channel)
                        require(`./caches/${msg.member.guild.name}/commands/${command}.js`).run(msg.channel, command, msg.author, args);
                    } catch (e) {
                        console.log(command + " is not a valid system nor server command. Or server is not cached.")
                    }
                }
            }
        
        }
    
    catch (e) {
        if (msg.content.startsWith("?")) {
            send_message("Cache Myno First! This gives myno the ability to give users a full experience such as:\n- Custom Prefixes\n- Custom Server Commands\n- Server Plugins\n- And More!\n\n(This message appears when an error has occurred in the system process. Error: " + e + ")")
        }
    }
   
})


client.login(require('./config.json').token).then(() => {
    console.log("[INIT] Ready!");
   
})
