const CommandStructure = require("../../structure/Commands")
	, _ping = require("../../utils/ping");

class Ping extends CommandStructure {

	constructor(){
		super({
			name: "ping",
			description: "Get ping of the bot",
			usage: "ping"
		})
	}

	run(client, message) {
		message.channel.send("Ping ...")
			.then(async m => {
				const ping = await _ping("discordapp.com");
				if(!ping) return message.channel.send("Sorry but I have some problem to ping discordapp.com ...");
				return m.edit(`**Pong :ping_pong:** - Latency: ${ping}ms`);
			})
			.catch(console.err);
	}

}

module.exports = Ping;
