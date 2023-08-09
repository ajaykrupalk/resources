const express = require('express')
const router = express.Router()

const { storeResource, getResources, welcome } = require('../controllers/resource.controller')

router.get("/", welcome)

router.post("/storeResource", storeResource)

router.get("/getResources", getResources)

module.exports = router