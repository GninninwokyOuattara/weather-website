console.log("App started");

// fetch("http://127.0.0.1:8080/weather?address=boston").then(response => {
//   response.json().then(data => {
//     if (data.error) {
//       return console.log(data.error);
//     }
//     console.log(data);
//   });
// });

const searchQuery = "/weather?address=";
const weatherForm = document.querySelector("form");
const searchLocation = document.querySelector("input");
const state = document.querySelector("#query-state");
const result = document.querySelector("#query-result");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  let location = searchLocation.value;
  //searchLocation.value = "";
  result.textContent = "";
  state.textContent = "Fetching ...";
  //   if (location !== "") {
  state.textContent = "Fetching weather ...";
  let query = searchQuery + location;
  //console.log("Fetching : " + query);
  fetch(query).then(response => {
    response.json().then(data => {
      state.textContent = "";
      if (data.error) {
        result.textContent = data.error;
        console.log(typeof data.error);
        return console.log(data.error);
      }
      state.textContent = data.placeName;
      result.textContent =
        "It is currently " +
        data.currently +
        " with a temperature of " +
        data.temperature +
        " degrees and " +
        data.precipProbability +
        "% chance of raining";
      console.log(data);
    });
  });
  //   } else {
  //     state.textContent = "";
  //     result.textContent = "An address must be provided";
  //   }
});
