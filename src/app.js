const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
//Heroku provide a port number or the port will be 3000 locally
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");
const templatesPath = path.join(__dirname, "../templates");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
// app.set("templates", templatesPath);
// app.set("partials", partialsPath);
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "S's S",
    paragraph: "I'm a paragraph"
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help" });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    name: "Ouattara",
    title: "404",
    errorMessage: "Help article not found"
  });
});

app.get("/weather", (req, res) => {
  console.log(req.query);
  if (!req.query.address) {
    return res.send({ error: "No address has been provided." });
  } else {
    geocode(req.query.address, (error, data) => {
      if (error) {
        return res.send({ error: error });
      }

      forecast(data, (error, dataForecast = {}) => {
        if (error) {
          return res.send({ error: error });
        }

        const { placeName } = data;
        const { temperature, precipProbability, currently } = dataForecast;
        return res.send({
          address: req.query.address,
          placeName: placeName,
          currently: currently,
          temperature: temperature,
          precipProbability: precipProbability
        });
      });
    });
  }
});

app.get("*", (req, res) => {
  res.render("404", {
    name: "Ouattara",
    title: "404",
    errorMessage: "Page not found"
  });
});
app.listen(port);
