const path = require("path")
    , fs = require("fs");

module.exports = (client) => {
    return new Promise((resolve, reject) => {
        fs.readdir(path.resolve(__dirname, "../events"), (err, files) => {
            if (err) return reject(new Error("Unable to load events"));
            if(files.length < 1) return resolve();
            files.forEach(async (file, i) => {
                if (!file.endsWith(".js")) return;
                const event = require(`${path.resolve(__dirname, "../events")}/${file}`);
                let eventName = file.split(".")[0];
                client.on(eventName, event.bind(null, client));
                if((i+1) === files.length) {
                    resolve();
                }
            });
        });
    });
}