const express = require("express");

const weatherController = require("../controllers/weather-controllers");

const router = express.Router();

router.get("/:cityId", weatherController.getWeatherData);

module.exports = router;
