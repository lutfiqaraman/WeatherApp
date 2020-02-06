const path = require("path");
const express = require("express");
const hbs = require("hbs");

const requestForeCast = require("./utils/forecast");
const requestGeoCode  = require("./utils/geocode");

const app = express();
const port = process.env.PORT;

// Setup handlebars engine and views location
const partialsPath = path.join(__dirname, "../views/partials");
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

// Setup static directory to serve
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    pagename: "Weather",
    creator: "Lutfi Qaraman"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather App - About",
    pagename: "About",
    creator: "Lutfi Qaraman"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Weather App - Help",
    pagename: "Help",
    helptext: "This is some helpful text ...",
    creator: "Lutfi Qaraman"
  });
});

app.get("/weather", (req, res) => {
  const location = req.query.address;

  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }

  requestGeoCode.geoCode(location, (error, geoCodeData) => {
    if (error) {
      return res.send({ error });
    }
    
    requestForeCast.foreCast(geoCodeData.longitude, geoCodeData.latitude, (error, forecastResult) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastResult,
        location: geoCodeData.location,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    pagename: "404",
    creator: "Lutfi Qaraman",
    errorMsg: "Help article is not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    creator: "Lutfi Qaraman",
    errorMsg: "404 Page",
    pagename: "404",
  });
});

app.listen(port, () => {
  process.stdout.write("Server is up on port " + port);
});
