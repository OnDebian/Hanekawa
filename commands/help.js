const
    commands = require("../modules/commands"),
    config = require("../config"),
    { RichEmbed } = require("discord.js");

module.exports = {

    name: "help",
    aliases: [],
    usage: "",
    description: "See this help",
    guildOnly: false,
    execute: (client, message, args) => {
        if (!args[0]) {
            return message.channel.send(
                new RichEmbed()
                    .setAuthor(`${client.user.username} - Help`, client.user.avatarURL)
                    .setDescription(`List of avaliables commands :\n\n${commands.map(c => `**${config.global.prefix}${c.name}`).join("\n")}\n\nFor see help about a command, tape ${config.global.prefix}help <command>`)
                    .setColor(config.global.color)
                    .setTimestamp(new Date())
                    .setFooter(`Command send by ${message.author.tag}`, message.author.avatarURL)
            );
        } else {
            let command = commands.get(args[0]) || commands.find(c => c.aliases.includes(args[0]));
            if(!command) return message.reply("This command doesn't exist");
            return message.channel.send(
                new RichEmbed()
                    .setAuthor(`${client.user.username} - Help`, client.user.avatarURL)
                    .setDescription(`Help about ${command.name}`)
                    .addField("Description :", command.description, true)
                    .addField("Usage :", `${config.global.prefix}${command.name} ${command.usage}`, true)
                    .addField("Aliases :", (command.aliases.length < 1) ? ":x:" : command.aliases.join(", "))
                    .setColor(config.global.color)
                    .setTimestamp(new Date())
                    .setFooter(`Command send by ${message.author.tag}`, message.author.avatarURL)
            );
        }
    }
}