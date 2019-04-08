const
    config = require("../config"),
    player = require("../modules/player"),
    { RichEmbed } = require("discord.js");

module.exports = {

    name: "playing",
    aliases: ["now_playing"],
    usage: "",
    description: "Show music playing now",
    guildOnly: true,
    execute: (client, message, args) => {
        if (!message.guild.member(client.user).voiceChannel) return message.reply(`${message.guild.member(client.user).displayName} is not in a voice channel`);
        if (!player.getPlayerConfig(message.guild.id).now_playing) return message.reply(`Sorry but I can't get played music`);
        if (typeof player.getPlayerConfig(message.guild.id).now_playing == "string") {
            let radio = player.getRadios().get(player.getPlayerConfig(message.guild.id).now_playing);
            return message.channel.send(
                new RichEmbed()
                    .setDescription(`${message.guild.member(client.user).displayName} stream ${radio.title}'s radio !`)
                    .setColor(config.global.color)
            );
        } else {
            let infos = player.getPlayerConfig(message.guild.id).now_playing;
            return message.channel.send(
                new RichEmbed()
                    .setAuthor(`${client.user.username} - Music`, client.user.avatarURL)
                    .setDescription("Now Playing")
                    .addField("Name :", infos.name, true)
                    .addField("Channel :", infos.channel, true)
                    .addField("Duration :", infos.duration, true)
                    .setThumbnail(infos.img)
                    .setColor(config.global.color)
                    .setTimestamp(new Date())
                    .setFooter(`Command send by ${message.author.tag}`, message.author.avatarURL)
            );
        }
    }
}