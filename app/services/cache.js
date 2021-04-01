const { createClient } = require('redis');

const client = createClient();

const { promisify } = require('util');

const redis = {
    del: promisify(client.del).bind(client),
    get: promisify(client.get).bind(client),
    set: promisify(client.set).bind(client),
    setex: promisify(client.setex).bind(client),
    exists: promisify(client.exists).bind(client)
};

const keysIndex = new Set();

/**
 * A litteral object containing 2 middlewares for caching purpose
 * @typedef {object} CacheObject
 * @property {Middleware} cache - the middleware for caching
 * @property {Middleware} flush - the middleware for flushing
 */

/**
 * An Express Middleware, sharing a request and a response object with its peers
 * @typedef {Function} Middleware
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 */

/**
 * A function that generates ready-to-use middlewares
 * @param {object} options - an option object for further configuration
 * @returns {CacheObject} the 2 configured middlewares
 */
const cacheGenerator = (options) => {
    return {
        cache: async (req, res, next) => {

            const theKey = `${options.prefix}:${req.originalUrl}`
            console.log(theKey)

            if (await redis.exists(theKey)) {
                // take it out the register
                const theValue = await redis.get(theKey).then(JSON.parse);

                // and answer directly to the user
                res.json(theValue);
                
            } else {
                const originalResponseJson = res.send.bind(res);

                res.send = (theResponse) => {
                    // keep track of the used keys
                    keysIndex.add(theKey);
                    // store the response in ythe cache
                    redis.setex(theKey, options.ttl, theResponse);
                    // call the original version of response.json
                    originalResponseJson(theResponse);
                }
                next();
            }
        },
        flush: async (req, res, next) => {
            for (const key of keysIndex) {
                await redis.del(key);
                keysIndex.delete(key);
            }
            next();
        }
    }
};
module.exports = cacheGenerator;