var outputTemp = document.getElementById("main__temp");
var outputHumidity = document.getElementById("humidity_number");
var outputWind = document.getElementById("wind_speed");

console.log("start");

const APIKey = "0b2a8f800dbed7216279e080f7740ab0";
let cityName = "tehran";

async function getTodayWeather() {
  try {
    var weatherApiCall = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=metric`
    );
    var jsonOutput = await weatherApiCall.json();
    // console.log(jsonOutput);

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

const lat = 35.6944;
const lon = 51.4215;

async function getNextFiveDaysWeather() {
  try {
    const weatherApiCall = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`
    );

    const jsonOutput = await weatherApiCall.json();
    console.log("5-Day Forecast Data:", jsonOutput);

    // Create an array to store daily average temperatures
    const dailyTemps = new Array(5).fill(null).map(() => []);

    // Process the forecast data
    const today = new Date().getDate();
    jsonOutput.list.forEach((entry) => {
      const entryDate = new Date(entry.dt * 1000);
      const dayDifference = entryDate.getDate() - today;

      if (dayDifference >= 1 && dayDifference <= 5) {
        dailyTemps[dayDifference - 1].push(entry.main.temp);
      }
    });

    // Calculate daily averages and update the HTML
    dailyTemps.forEach((temps, index) => {
      if (temps.length > 0) {
        const avgTemp =
          temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
        document.getElementById(`next_day${index + 1}`).innerHTML =
          avgTemp.toFixed(1);
      }
    });
  } catch (error) {
    console.error("Error fetching 5-day forecast data:", error);
  }
}

getTodayWeather();
getNextFiveDaysWeather();
