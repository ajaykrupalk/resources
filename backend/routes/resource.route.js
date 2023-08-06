const express = require('express')
const router = express.Router()

const { storeResource } = require('../controllers/resource.controller')

router.post("/storeResource", storeResource)

router.get("/getResources")

module.exports = router