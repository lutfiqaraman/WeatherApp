const request = require("request");

exports.foreCast = (longitude, latitude, callBack) => {
  const measurmentUnit = "?units=ca";
  const weatherURL =
    "https://api.darksky.net/forecast/6471b15195d09bd94b4fe0b05ace7054/" +
    latitude +
    "," +
    longitude +
    measurmentUnit;

  request({ url: weatherURL, json: true }, (error, responsedarksky) => {
    if (error) {
      callBack("Unable to connect to weather service !", undefined);
    } else if (responsedarksky.body.error) {
      callBack(
        "According to the information, location cannot be found ...",
        undefined
      );
    } else {
      const weatherData = {
        temp: Math.round(responsedarksky.body.currently.temperature),
        chanceRain: responsedarksky.body.currently.precipProbability * 100,
        summary: responsedarksky.body.daily.data[0].summary,
        highTemp: Math.round(responsedarksky.body.daily.data[0].temperatureHigh),
        lowTemp: Math.round(responsedarksky.body.daily.data[0].temperatureLow)
      };

      const data =
        weatherData.summary +
        " It is currently " +
        weatherData.temp + "&#8451; " +
        " degrees out. This high today is " +
        weatherData.highTemp + "&#8451; " +
        " with a low of " +
        weatherData.lowTemp + "&#8451; " +
        ". There is a " +
        weatherData.chanceRain +
        "% chance of rain. ";

      callBack(undefined, data);
    }
  });
};
