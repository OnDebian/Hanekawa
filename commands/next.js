const
    config = require("../config"),
    player = require("../modules/player"),
    { RichEmbed } = require("discord.js");

module.exports = {

    name: "next",
    aliases: [],
    usage: "",
    description: "Skip the current music",
    guildOnly: true,
    execute: (client, message, args) => {
        if(!message.member.voiceChannel) return message.reply("You are not in a voice channel");
        if(!message.guild.member(client.user).voiceChannel) return message.reply(`${message.guild.member(client.user).displayName} is not in a voice channel`);
        if(player.getQueue(message.guild.id).length < 1)
        	message.channel.send(
	            new RichEmbed()
	                .setDescription("No music after")
	                .setColor(config.global.color)
	        );
        message.guild.member(client.user).voiceChannel.connection.dispatcher.end();
    }
}