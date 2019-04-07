const
    config = require("../config"),
    { Collection } = require("discord.js"),
    playerConfig = new Collection(),
    radios = new Collection(),
    queue = new Collection();

function getRadios() {
    config.radios.map(r=>radios.set(r.name,{title:r.title,url: r.url}));
    return radios;
}

function getQueue(guildID) {
    if (!queue.get(guildID)) queue.set(guildID, []);
    return queue.get(guildID);
}

function emptyQueue(guildID) {
    queue.set(guildID, []);
}

function getPlayerConfig(guildID) {
    if (!playerConfig.get(guildID)) playerConfig.set(guildID, {volume: 0.2});
    return playerConfig.get(guildID);
}

function setVolume(guildID, volume) {
    if (!playerConfig.get(guildID)) return playerConfig.set(guildID, {volume: volume});
    let _playerConfig = playerConfig.get(guildID);
    _playerConfig.volume = volume;
    playerConfig.set(guildID, _playerConfig);
}

module.exports = {
    getRadios: getRadios,
    getQueue: getQueue,
    emptyQueue: emptyQueue,
    getPlayerConfig: getPlayerConfig,
    setVolume: setVolume
}