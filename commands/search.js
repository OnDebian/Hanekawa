const
    config = require("../config"),
    youtube = require("../modules/youtube"),
    { RichEmbed } = require("discord.js");

module.exports = {

    name: "search",
    aliases: ["youtube", "yt"],
    usage: "<search arguments>",
    description: "Search a video on Youtube",
    guildOnly: false,
    execute: async (client, message, args) => {

        if (!args[0]) return message.reply("No search provided");

        try {
            let
                videos = [],
                result = await youtube.search(config.apikey.google, args.join(" "));

            if (result.items.length < 1) return message.reply("No videos found");
            
            result.items.forEach(video => {
                videos.push(`[${video.snippet.title}](https://youtu.be/${video.id.videoId})\n→ [${video.snippet.channelTitle}](https://www.youtube.com/channel/${video.snippet.channelId})`)
            });

            message.channel.send(
                new RichEmbed()
                    .setAuthor(`${client.user.username} - Search on Youtube`, client.user.avatarURL)
                    .setDescription(`Result : \n\n${videos.join("\n\n")}`)
                    .setColor(config.global.color)
                    .setTimestamp(new Date())
                    .setFooter(`Command send by ${message.author.tag}`, message.author.avatarURL)
            );
        } catch (error) {
            console.log(error);
            message.reply("Unable to execute action, this bug was reported to my developper !");
        }

    }
}