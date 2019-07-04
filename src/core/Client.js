const { Client } = require("discord.js")
    , config = require("../config")
    , commands = require("./Commands")
    , events = require("./Events");

class Hanekawa extends Client {

    constructor(options) {
        super(options);

        this.config = config;
        this.commands = new Set();
    }

    async loadCommands() {
        this.commands = await commands();
    }

    async loadEvents() {
        await events(this);
    }

}

module.exports = Hanekawa;