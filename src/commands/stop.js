const
    config = require("../config"),
    player = require("../modules/player"),
    { RichEmbed } = require("discord.js");

module.exports = {

    name: "stop",
    aliases: ["end"],
    guildOnly: true,
    adminsOnly: false,
    execute: (client, message, args) => {
        if(!message.member.voiceChannel) return message.reply("You are not in a voice channel");
        if(!message.guild.member(client.user).voiceChannel) return message.reply(`${message.guild.member(client.user).displayName} is not in a voice channel`);
        if(player.getQueue(message.guild.id).length > 0) player.emptyQueue(message.guild.id);
        (!message.guild.member(client.user).voiceChannel.connection)
            ? message.guild.member(client.user).voiceChannel.leave()
            : message.guild.member(client.user).voiceChannel.connection.dispatcher.end();
        message.channel.send(
            new RichEmbed()
                .setDescription("Successfully stoped streaming")
                .setColor(config.global.color)
        );
    }

}