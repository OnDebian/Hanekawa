const
    config = require("./config"),
    discord = require("discord.js"),
    fs = require("fs"),
    commands = new discord.Collection();

client = new discord.Client();

fs.readdir("./events/", (err, files) => {
    if (err) throw new Error("Unable to load events");
    console.log("Loading events ...");
    files.forEach(async file => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`${eventName} loaded`);
        client.on(eventName, event.bind(null, client));
    });
});

fs.readdir("./commands/", (err, files) => {
    if (err) throw new Error("Unable to load commands");
    console.log("Loading commands ...");
    files.forEach(async file => {
        if (!file.endsWith(".js")) return;
        const command = require(`./commands/${file}`);
        commands.set(command.name, command);
        console.log(`${command.name} loaded`);
    });
});

client.on("message", (message) => {

    if (!message.content.startsWith(config.global.prefix) || message.author.bot) return;

    const
        args = message.content.slice(config.global.prefix.length).trim().split(/ +/g),
        commandName = args.shift().toLowerCase(),
        command = commands.get(commandName) || commands.find(c => c.aliases.includes(commandName));

    if (!command) return;
    if (!message.guild && command.guildOnly) return message.reply("I'm unable to execute this here !");
    try {
        command.execute(client, message, args);
    } catch (error) {
        console.log(error);
        message.reply("Unable to execute action, this bug was reported to my developper !");
    }

});

client.login(config.global.token);