const
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

module.exports = {
    search: search
}