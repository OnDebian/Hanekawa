const
    config = require("../config"),
    player = require("../modules/player"),
    { RichEmbed } = require("discord.js");

module.exports = {

    name: "radio",
    aliases: ["stream"],
    usage: "<radio name>",
    description: "Play a radio",
    guildOnly: true,
    execute: (client, message, args) => {
        if(!args[0]) return message.reply("No radio provided");
        let radio = player.getRadios().get(args[0]);
        if(!radio) return message.reply("Invalid radio provided");
        if(!message.member.voiceChannel) return message.reply("You are not in a voice channel");
        if(player.getQueue(message.guild.id).length > 0) player.emptyQueue(message.guild.id);
        if(message.guild.member(client.user).voiceChannel && message.guild.member(client.user).voiceChannel.connection) message.guild.member(client.user).voiceChannel.connection.dispatcher.end();
        message.member.voiceChannel.join()
            .then(conn => {
                player.setPlaying(args[0]);
                let playerConfig = player.getPlayerConfig(message.guild.id);
                let dispatcher = conn.playArbitraryInput(radio.url, {volume: parseInt(playerConfig.volume)/100});
                player.enableRadio(message.guild.id);
                message.channel.send(
                    new RichEmbed()
                        .setDescription(`Streaming ${radio.title}'s radio ♪`)
                        .setColor(config.global.color)
                );
                dispatcher.on("end", () => {
                    player.setPlaying(null);
                    player.disableRadio(message.guild.id);
                    message.guild.member(client.user).voiceChannel.leave();
                });
            })
            .catch(error => {
                console.log(error);
                message.reply("Unable to execute action, this bug was reported to my developper !");
            });
    }

}