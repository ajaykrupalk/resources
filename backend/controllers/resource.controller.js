require('dotenv').config()
const axios = require('axios')

const Resource = require("../models/resource.model")

const storeResource = async (req, res) => {

    try {
        const link = req.body.link

        const response = await axios.post("https://api.peekalink.io/", {
            "link": link
        }, {
            headers: {
                "X-API-Key": "c334f7b4-14e8-4621-8be2-f930add93282"
            }
        }).catch(error => {res.status(500).json({error: error})});

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

const getResources = async (req, res) => {
    try {
        const resources = await Resource.find({}).sort({createdAt: -1})
        res.status(200).json(resources)
    } catch(error) {
        res.status(500).json({error: error})
    }
}

module.exports = { storeResource, getResources }