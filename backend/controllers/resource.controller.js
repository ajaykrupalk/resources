require('dotenv').config()
const axios = require('axios')
const redis = require('redis')

const Resource = require("../models/resource.model")
let redisClient;

(async () => {
    redisClient = redis.createClient({
        username: process.env.REDIS_UNAME,
        password: process.env.REDIS_PASSWORD,
        socket: {
            host: process.env.REDIS_URI,
            port: process.env.REDIS_PORT
        }
    })

    redisClient.on("error", (error) => console.error(`Redis Client Error : ${error}`));

    await redisClient.connect()
})();

const welcome = (req, res) => {
    res.send('Welcome to resourc-es')
}

const storeResource = async (req, res) => {

    try {
        const link = req.body.link

        const checkAvailable = await axios.post("https://api.peekalink.io/is-available/", {
            "link": link
        }, {
            headers: {
                "X-API-Key": "c334f7b4-14e8-4621-8be2-f930add93282"
            }
        })

        try {
            if (!checkAvailable.data.isAvailable) throw new Error('Website is not available')
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }

        const response = await axios.post("https://api.peekalink.io/", {
            "link": link
        }, {
            headers: {
                "X-API-Key": "c334f7b4-14e8-4621-8be2-f930add93282"
            }
        }).catch(error => { res.status(500).json({ error: error }) });

        console.log(response.data)

        const { url: URL, domain, title, description, image } = response.data

        try {
            const resource = await Resource.create({ URL, domain, imgURL: image?.url, title, description })
            return res.status(200).json(resource);
        } catch (error) {
            return res.status(500).json(error);
        }
    } catch (error) {
        return res.status(500).json({ error: "link parameter missing in body" });
    }

}

const DEFAULT_EXPIRATION = 86400

const getResources = async (req, res) => {

    const value = await redisClient.get('resources')

    if (value !== null) {
        console.log('Cache Hit!')
        return res.status(200).json(JSON.parse(value))
    }

    try {
        console.log('Cache Miss!')
        const resources = await Resource.find()

        // initially, we are adding data to redis cache
        redisClient.setEx('resources', DEFAULT_EXPIRATION, JSON.stringify(resources))

        // adding headers for faster and compressed data
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Accept-Encoding', 'gzip, compress, br')

        return res.status(200).json(resources)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = { storeResource, getResources, welcome }
