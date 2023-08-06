const express = require('express')
const router = express.Router()

const { storeResource, getResources } = require('../controllers/resource.controller')

router.post("/storeResource", storeResource)

router.get("/getResources", getResources)

module.exports = router