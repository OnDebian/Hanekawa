const
    ytdl = require("ytdl-core"),
    request = require("request");

function search(key, args) {
    return new Promise((resolve, reject) => {
        request(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&fields=items(id/videoId,snippet(channelId,channelTitle,thumbnails/high,title))&order=viewcount&q=${encodeURI(args)}&type=video&videoDefinition=high&key=${key}`,
            (error, response, body) => {
                if(error) reject(error);
                if(response.statusCode !== 200) reject(body);
                try {
                    let data = JSON.parse(body);
                    resolve(data);
                } catch (error) {
                    reject(error);
                }
            }
        )
    });
}

function getID(url) {
    let test = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i.exec(url);
    return (test&&test[1]) ? test[1] : false;
}

function getInfos(url) {
    return new Promise((resolve, reject) => {
        ytdl.getInfo(url)
        .then(info => {
            if(!info) return resolve(false);
            resolve(info);
        })
        .catch(err => resolve(false));
    });
}

module.exports = {
    search: search,
    getID: getID,
    getInfos: getInfos
}