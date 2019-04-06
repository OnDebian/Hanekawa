const
    config = require("../config"),
    { RichEmbed } = require("discord.js"),
    youtube = require("../modules/youtube");

module.exports = {

    name: "search",
    aliases: ["find"],
    usage: "search <query>",
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
                    .setAuthor("Youtube - Search Result", client.user.avatarURL)
                    .setDescription(videos.join("\n\n"))
                    .setTimestamp(new Date())
                    .setFooter(`Executed by ${message.author.tag}`)
                    .setColor(config.global.color)
            );
        } catch (error) {
            console.log(error);
            message.reply("Unable to execute action, this bug was reported to my developper !");
        }

    }

}