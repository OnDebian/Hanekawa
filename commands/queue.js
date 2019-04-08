const
    config = require("../config"),
    player = require("../modules/player"),
    { RichEmbed } = require("discord.js");

module.exports = {

    name: "queue",
    aliases: ["qlist", "queue_list"],
    usage: "",
    description: "Show queue",
    guildOnly: true,
    execute: (client, message, args) => {
        let queue = player.getQueue(message.guild.id);
        let unfocus = 0;
        let queue_show = [];
        queue.map(async (m, i) => {
            if(i <= 5){
                queue_show.push(`${(i+1)} - [${m.name}](${m.url}) [**${m.duration}**]`);
            }else{
                unfocus = unfocus+1;
                queue_show[5] = `\nAnd ${unfocus} others ...`;
            }
        });
        if (!message.guild.member(client.user).voiceChannel) return message.reply(`${message.guild.member(client.user).displayName} is not in a voice channel`);
        if (queue.length < 1) return message.reply("No music in queue");
        message.channel.send(
            new RichEmbed()
                .setAuthor(`${client.user.username} - Music`, client.user.avatarURL)
                .setDescription(`Music(s) in queue\n\n${queue_show.join("\n\n")}`)
                .setThumbnail(queue[0].img)
                .setColor(config.global.color)
                .setTimestamp(new Date())
                .setFooter(`Command send by ${message.author.tag}`, message.author.avatarURL)
        );
    }
}