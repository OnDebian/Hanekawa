const Hanekawa = require("./core/Client")
    , client = new Hanekawa();

(async () => {
    await client.loadCommands();
    await client.loadEvents();

    client.login(client.config.token);
})();