const 
    config = require("../config");

module.exports = (client) => {

    console.log("Bot started successfully !");

    client.user.setActivity(config.global.status+" ~ "+config.global.prefix+"help");

}