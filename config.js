const config = {};

config.https = {
    keyPath: "....",
    certPath: "...",
};

//cors

config.cors = {
    whiteList: {
        local: [],
        prod: [],
    },
}

//rate limiting

config.rateLimit = {
    local: {},
    prod: {},
}

config.mongoURI = {
    local: "mongodb://localhost:27017/clients-db",
    prod: "",
}


module.exports = config