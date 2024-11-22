var outputTemp = document.getElementById("main__temp");
var outputHumidity = document.getElementById("humidity_number");
var outputWind = document.getElementById("wind_speed");

console.log("start");

const APIKey = "0b2a8f800dbed7216279e080f7740ab0";
let cityName = "tehran";

async function getWeather() {
  try {
    var weatherApiCall = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=metric`
    );
    var jsonOutput = await weatherApiCall.json();
    console.log(jsonOutput);

    showData(jsonOutput);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    main_temp.innerHTML = "Error!";
  }
}

function showData(data) {
  var temp = data["main"]["temp"];
  var humidity = data["main"]["humidity"];
  var wind = data["wind"]["speed"];

  // console.log(temp);

  outputTemp.innerHTML = temp.toFixed(2);
  outputHumidity.innerHTML = `${humidity} %`;
  outputWind.innerHTML = `${wind} km/h`;
}

getWeather();
