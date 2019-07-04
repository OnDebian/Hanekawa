const Hanekawa = require("./core/Hanekawa")
    , { commands, loadCommands } = require("./core/Commands")
    , { events, loadEvents } = require("./core/Events")
    , client = new Hanekawa();

(async () => {
    await Promise.all([
        loadCommands("miscellaneous")
    ]);
    await loadEvents(client);

    client.commands = commands;
    client.events = events;

    client.login(client.config.token);
})();