const
    config = require("../config"),
    { RichEmbed, Collection } = require("discord.js"),
    radios = new Collection(config.radios);

config.radios.forEach(radio => {
    radios.set(radio.name, {
        title: radio.title,
        url: radio.url
    });
});

module.exports = {

    name: "radio",
    aliases: ["stream"],
    usage: "radio <list/radio name>",
    guildOnly: true,
    execute: (client, message, args) => {


        if (!args[0]) return message.reply("No radio provided");
        if (args[0] == "list") return message.channel.send(
            new RichEmbed()
                .setAuthor("Radios - List of avaliable radios", client.user.avatarURL)
                .setDescription(config.radios.map(r => `${r.title} - ${r.name}`).join("\n"))
                .setTimestamp(new Date())
                .setFooter(`Executed by ${message.author.tag}`)
                .setColor(config.global.color)
        );
        if (!radios.get(args[0])) return message.reply("Invalid radio provided");
        if (!message.member.voiceChannel) return message.reply("Please join a voice channel first");
        message.member.voiceChannel.join()
            .then(conn => {
                let dispacher = conn.playArbitraryInput(radios.get(args[0]).url);
                message.channel.send(
                    new RichEmbed()
                        .setDescription(`Stream ${radios.get(args[0]).title} radio`)
                        .setColor(config.global.color)
                );
                dispacher.on("end", () => message.guild.member(client.user).voiceChannel.leave());
                dispacher.on("error", () => {
                    message.guild.member(client.user).voiceChannel.leave();
                    console.log(error);
                    message.reply("Unable to execute action, this bug was reported to my developper !");
                });
            })
            .catch(error => {
                console.log(error);
                message.reply("Unable to execute action, this bug was reported to my developper !");
            })


    }
}