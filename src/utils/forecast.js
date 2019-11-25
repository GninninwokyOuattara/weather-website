const request = require("request");

const forecast = ({ latitude, longitude }, callback) => {
  const url =
    "https://api.darksky.net/forecast/6249fc36ffdca3faaa481787ae4ac8ba/" +
    latitude +
    "," +
    longitude +
    "?units=si";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to access the servces.", undefined);
    } else if (body.code === 400) {
      callback("Unable to access this location information, try another.");
    } else {
      callback(undefined, {
        temperature: body.currently.temperature,
        precipProbability: body.currently.precipProbability,
        currently: body.currently.icon,
        timezone: body.timezone
      });
    }
  });
};

module.exports = forecast;
