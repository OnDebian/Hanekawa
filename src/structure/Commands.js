class Commands {

	constructor({
		name = null,
		description = "No description.",
		aliases = [],
		category = "miscellaneous",
		usage = null,
		guildOnly = false
	}){
		this.name = name;
		this.category = category;
		this.aliases = aliases;
		this.description = description;
		this.usage = usage;
	}

}

module.exports = Commands;
