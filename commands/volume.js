const
    config = require("../config"),
    { RichEmbed } = require("discord.js"),
    player = require("../modules/player");

module.exports = {

    name: "volume",
    aliases: ["vol"],
    usage: "<1-100>%",
    description: "Adjust the volume of musics",
    guildOnly: true,
    execute: (client, message, args) => {
        if(!message.member.voiceChannel) return message.reply("You are not in a voice channel");
        if(!message.guild.member(client.user).voiceChannel) return message.reply(`${message.guild.member(client.user).displayName} is not in a voice channel`);
        if(!message.guild.member(client.user).voiceChannel.connection) message.reply(`${message.guild.member(client.user).displayName} not playing anything`);
        if(!args[0]) return message.reply("No volume value provided");
        if(isNaN(args[0]) || args[0] < 0 || args[0] > 100) return message.reply("Invalid volume value");
        let dispatcher = message.guild.member(client.user).voiceChannel.connection.dispatcher;
        player.setVolume(message.guild.id, parseInt(args[0])/100);
        dispatcher.setVolume(parseInt(args[0])/100);
        message.channel.send(
            new RichEmbed()
                .setDescription(`Volume set to ${args[0]}%`)
                .setColor(config.global.color)
        );
    }
}