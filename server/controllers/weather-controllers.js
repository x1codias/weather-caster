const axios = require("axios");

const ErrorHandler = require("../models/error-handler");

const getWeatherForState = async (req, res, next) => {
  let weatherData;

  console.log(req.body, req.params);

  const cityId = req.params.cityId;

  console.log(
    `${process.env.WEATHER_API_URL}id=${cityId}&APPID=${process.env.WEATHER_API_KEY}`
  );

  try {
    weatherData = await axios.get(
      `${process.env.WEATHER_API_URL}id=${cityId}&APPID=${process.env.WEATHER_API_KEY}`
    );
    console.log(weatherData.data);
  } catch (err) {
    console.log(err.message);
    return next(
      new ErrorHandler(
        "Fetching weather for this country failed, please try again later",
        500
      )
    );
  }

  res.status(200).json({ weatherData: weatherData.data });
};

exports.getWeatherData = getWeatherForState;
