const { Client } = require("discord.js")
    , config = require("../config");

class Hanekawa extends Client {
    constructor(options) {
        super(options);

        this.config = config;
        this.database = null;

        this.commands = [];
        this.events = [];
    }

    handleCommands(message) {
        if(message.author.bot) return;
        if(!message.content.trim().startsWith(this.config.prefix)) return;

        const args = message.content.trim().split(/ +/g)
            , command = args.shift().slice(this.config.prefix.length).toLowerCase()
            , executor = this.commands.find(c => c.name === command) || this.commands.find(c => c.aliases.includes(command));

        if(executor) executor.run(this, message, args);
    }
}

module.exports = Hanekawa;
