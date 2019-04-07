const
    config = require("../config"),
    ytdl = require("ytdl-core"),
    player = require("../modules/player"),
    youtube = require("../modules/youtube"),
    { RichEmbed } = require("discord.js");

module.exports = {

    name: "play",
    aliases: [],
    guildOnly: true,
    adminsOnly: false,
    execute: async (client, message, args) => {
        if (!message.member.voiceChannel) return message.reply("You are not in a voice channel");
        if (!args[0]) return message.reply("No url or search provided");

        if (youtube.getID(args[0])) {
            let infos = await youtube.getInfos(`https://youtu.be/${youtube.getID(args[0])}`);
            if (!infos) return message.reply("Invalid url");
            if (message.guild.member(client.user).voiceChannel && message.guild.member(client.user).voiceChannel.connection) {
                if (!player.getPlayerConfig(message.guild.id).radio) {
                    player.addToQueue(message.guild.id, {duration: player.durationForm(infos.length_seconds), img: infos.thumbnail_url, name: infos.title+" ~ "+infos.author.name, url: `https://youtu.be/${youtube.getID(args[0])}`});
                    return message.channel.send(
                        new RichEmbed()
                            .setAuthor(`${client.user.username} - Music`, client.user.avatarURL)
                            .setDescription("Music added to queue")
                            .addField("Name :", infos.title, true)
                            .addField("Channel :", infos.author.name, true)
                            .addField("Duration :", player.durationForm(infos.length_seconds), true)
                            .setThumbnail(infos.thumbnail_url)
                            .setColor(config.global.color)
                            .setTimestamp(new Date())
                            .setFooter(`Command send by ${message.author.tag}`, message.author.avatarURL)
                    );
                } else {
                    message.guild.member(client.user).voiceChannel.connection.dispatcher.end();
                }
            }
            player.playSong(client, message, `https://youtu.be/${youtube.getID(args[0])}`);
        } else {
            let search = await youtube.search(config.apikey.google, args.join(" "));
            if (!search || search.items.length < 1) return message.reply("No result found");
            let infos = await ytdl.getInfo(`https://youtu.be/${search.items[0].id.videoId}`);
            if (message.guild.member(client.user).voiceChannel && message.guild.member(client.user).voiceChannel.connection) {
                if (!player.getPlayerConfig(message.guild.id).radio) {
                    player.addToQueue(message.guild.id, {duration: player.durationForm(infos.length_seconds), img: infos.thumbnail_url, name: infos.title+" ~ "+infos.author.name, url: `https://youtu.be/${search.items[0].id.videoId}`});
                    return message.channel.send(
                        new RichEmbed()
                            .setAuthor(`${client.user.username} - Music`, client.user.avatarURL)
                            .setDescription("Music added to queue")
                            .addField("Name :", infos.title, true)
                            .addField("Channel :", infos.author.name, true)
                            .addField("Duration :", player.durationForm(infos.length_seconds), true)
                            .setThumbnail(infos.thumbnail_url)
                            .setColor(config.global.color)
                            .setTimestamp(new Date())
                            .setFooter(`Command send by ${message.author.tag}`, message.author.avatarURL)
                    );
                } else {
                    message.guild.member(client.user).voiceChannel.connection.dispatcher.end();
                }
            }
            player.playSong(client, message, `https://youtu.be/${search.items[0].id.videoId}`);
        }
    }
}