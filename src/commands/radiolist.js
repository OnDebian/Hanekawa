const
    config = require("../config"),
    player = require("../modules/player"),
    { RichEmbed } = require("discord.js");

module.exports = {

    name: "radiolist",
    aliases: ["rlist", "radio_list"],
    guildOnly: false,
    adminsOnly: false,
    execute: (client, message, args) => {
        let radios = player.getRadios();

        message.channel.send(
            new RichEmbed()
                .setAuthor(`${client.user.username} - List of radios`, client.user.avatarURL)
                .setDescription(`List of avaliables radios :\n\n${config.radios.map(r => `${r.title} ~ ${config.global.prefix}radio ${r.name}`).join("\n")}`)
                .setColor(config.global.color)
                .setTimestamp(new Date())
                .setFooter(`Command send by ${message.author.tag}`, message.author.avatarURL)
        );
    }

}