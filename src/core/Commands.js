const path = require("path")
    , fs = require("fs")
    , commands = {};

module.exports = () => {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(path.resolve(__dirname, "../commands"))) return resolve(commands);
        fs.readdir(path.resolve(__dirname, "../commands"), {}, (err, items) => {
            if (err) return reject(new Error("Unable to read commands folder"));
            if(items.length < 1) return resolve(commands);
            items.forEach((item, index) => {
                const categoryFolder = path.resolve(__dirname, "../commands", item);
                if (fs.lstatSync(categoryFolder).isDirectory()) {
                    fs.readdir(categoryFolder, {}, (err, files) => {
                        if (err) return reject(new Error("Unable to read commands folder"));
                        files.forEach(file => {
                            const filePath = path.resolve(__dirname, "../commands", item, file);
                            if (fs.lstatSync(filePath).isFile() && file.endsWith(".js")) {
                                const command = require(filePath);
                                if (command.name) return;
                                command.category = item;
                                commands[command.name] = command;
                            }
                        });
                    });
                }
                if ((index + 1) === items.length) {
                    resolve(commands);
                }
            });
        });
    });
}

