const
    config = require("../config");

module.exports = {

    name: "stop",
    aliases: ["end"],
    usage: "stop",
    guildOnly: true,
    execute: (client, message, args) => {
        if(!message.guild.member(client.user).voiceChannel) return message.reply(`${message.guild.member(client.user)} isn't in voice channel`);
        if(!message.guild.member(client.user).voiceChannel.connection) message.guild.member(client.user).voiceChannel.leave();
        message.guild.member(client.user).voiceChannel.connection.dispatcher.end();
        return message.channel.send("Successfully disconnected");
    }
}