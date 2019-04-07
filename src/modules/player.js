const
    config = require("../config"),
    ytdl = require("ytdl-core"),
    { Collection, RichEmbed } = require("discord.js"),
    playerConfig = new Collection(),
    radios = new Collection(),
    queue = new Collection();

function durationForm(val) {
    var sec_num = parseInt(val, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds;
}

function getRadios() {
    config.radios.map(r => radios.set(r.name, { title: r.title, url: r.url }));
    return radios;
}

function getQueue(guildID) {
    if (!queue.get(guildID)) queue.set(guildID, []);
    return queue.get(guildID);
}

function emptyQueue(guildID) {
    queue.set(guildID, []);
}

function addToQueue(guildID, url) {
    if (!queue.get(guildID)) queue.set(guildID, []);
    let _queue = queue.get(guildID);
    _queue.push(url);
    queue.set(guildID, _queue);
}

function shiftMusic(guildID) {
    if (!queue.get(guildID)) queue.set(guildID, []);
    let _queue = queue.get(guildID);
    _queue.shift();
    queue.set(guildID, _queue);
}

function getPlayerConfig(guildID) {
    if (!playerConfig.get(guildID)) playerConfig.set(guildID, { volume: 20, radio: false });
    return playerConfig.get(guildID);
}

function setVolume(guildID, volume) {
    if (!playerConfig.get(guildID)) return playerConfig.set(guildID, { volume: 20, radio: false });
    let _playerConfig = playerConfig.get(guildID);
    _playerConfig.volume = volume;
    playerConfig.set(guildID, _playerConfig);
}

function enableRadio(guildID) {
    if (!playerConfig.get(guildID)) return playerConfig.set(guildID, { volume: 20, radio: false });
    let _playerConfig = playerConfig.get(guildID);
    _playerConfig.radio = true;
    playerConfig.set(guildID, _playerConfig);
}

function disableRadio(guildID) {
    if (!playerConfig.get(guildID)) return playerConfig.set(guildID, { volume: 20, radio: false });
    let _playerConfig = playerConfig.get(guildID);
    _playerConfig.radio = true;
    playerConfig.set(guildID, _playerConfig);
}

async function playSong(client, message, url) {
    const
        player = getPlayerConfig(message.guild.id),
        infos = await ytdl.getInfo(url),
        conn = await (message.guild.member(client.user).voiceChannel || message.member.voiceChannel).join(),
        dispatcher = conn.playStream(ytdl(url, { filter: 'audioonly' }), { seek: 0, volume: player.volume / 100 });

    message.channel.send(
        new RichEmbed()
            .setAuthor(`${client.user.username} - Music`, client.user.avatarURL)
            .setDescription("Now Playing")
            .addField("Name :", infos.title, true)
            .addField("Channel :", infos.author.name, true)
            .addField("Duration :", durationForm(infos.length_seconds), true)
            .setThumbnail(infos.thumbnail_url)
            .setColor(config.global.color)
            .setTimestamp(new Date())
            .setFooter(`Command send by ${message.author.tag}`, message.author.avatarURL)
    );

    dispatcher.on("end", () => {
        if(getQueue(message.guild.id).length > 0){
            playSong(client, message, getQueue(message.guild.id)[0].url);
            shiftMusic(message.guild.id);
        }else{
            message.guild.member(client.user).voiceChannel.leave();
        }
    });

}

module.exports = {
    durationForm: durationForm,
    getRadios: getRadios,
    getQueue: getQueue,
    emptyQueue: emptyQueue,
    getPlayerConfig: getPlayerConfig,
    setVolume: setVolume,
    addToQueue: addToQueue,
    shiftMusic: shiftMusic,
    playSong: playSong,
    enableRadio: enableRadio,
    disableRadio: disableRadio
}