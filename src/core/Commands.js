const fs = require("fs")
    , path = require("path")
    , commands = [];

function loadCommands(category = "miscellaneous") {
    return new Promise((resolve, reject) => {
        const commandsPath = path.resolve(__dirname, "../commands/" + category);
        if (!fs.existsSync(commandsPath)) return resolve(commands);
        fs.readdir(commandsPath, (err, files) => {
            if (err) return reject(new Error(`Unable to load ${category} commands category`));
            if (files.length < 1) return resolve(commands);
            files.forEach((file, index) => {
                const commandPath = path.resolve(__dirname, "../commands/" + category + "/" + file);
                if (fs.lstatSync(commandPath).isFile() && file.endsWith(".js")) {
                    const command = new (require(commandPath));
                    commands.push(command);
                }
                if ((index + 1) === files.length) {
                    resolve(commands);
                }
            });
        });
    });
}

module.exports = {
    commands,
    loadCommands
};
