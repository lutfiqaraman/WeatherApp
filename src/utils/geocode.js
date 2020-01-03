const request = require("request");

exports.geoCode = (address, callBack) => {
  const geoCodeURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibHV0ZmlxYXJhbWFuIiwiYSI6ImNrNG55Nm8zODAwcjQzbHJ4MDJqM2M2YngifQ.EXUHd_n8CxsWrA-YpmER4g&limit=1";

  request({ url: geoCodeURL, json: true }, (error, responsemapbox) => {
    if (error) {
      callBack("Unable to connect to mapbox service ...", undefined);
    } else if (responsemapbox.body.features.length === 0) {
      callBack(
        "According to the information, location cannot be found ...",
        undefined
      );
    } else {
      const data = {
        longitude: responsemapbox.body.features[0].center[0],
        latitude: responsemapbox.body.features[0].center[1],
        location: responsemapbox.body.features[0].place_name
      };
      callBack(undefined, data);
    }
  });
};
