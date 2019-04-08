const
    { Collection } = require("discord.js"),
    fs = require("fs"),
    path = require("path"),
    commands = new Collection();

fs.readdir(path.resolve(__dirname, "../commands"), (err, files) => {
    if (err) throw new Error("Unable to load commands");
    console.log("Loading commands ...");
    files.forEach(async file => {
        if (!file.endsWith(".js")) return;
        const command = require(`${path.resolve(__dirname, "../commands")}/${file}`);
        commands.set(command.name, command);
        console.log(`${command.name} loaded`);
    });
});

module.exports = commands;