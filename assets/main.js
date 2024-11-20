console.log("start");

const APIKey = "0b2a8f800dbed7216279e080f7740ab0";
let cityName = "tehran";
async function getWeather() {
  var weatherApiCall = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`
  );
  var jsonOutput = await weatherApiCall.json();
  console.log(jsonOutput);
}

getWeather();
