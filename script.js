//MAIN
var _0xf15c = [
  "\x39\x38\x35\x35\x35\x34\x65\x64\x38\x33\x36\x35\x37\x62\x33\x31\x65\x63\x35\x39\x63\x61\x64\x31\x63\x36\x32\x63\x33\x34\x35\x31",
];
const xxx = _0xf15c[0];

const cityName = document.querySelector("#cityName");
const searchButton = document.querySelector(".searchButton");
const searchForm = document.querySelector("#searchForm");

// CURRENT
const nameDisplay = document.querySelector(".currentName");
const currentTimeDisplay = document.querySelector(".currentTime");
const currentImageDisplay = document.querySelector(".today__imageWrapper");
const currentTempDisplay = document.querySelector(".currentTemp");
const currentFeelTempDisplay = document.querySelector(".currentFeel");
const currentTextDisplay = document.querySelector(".currentDescription");
const currentFeelText = document.querySelector(".feelText");
const currentClouds = document.querySelector(".currentClouds");
const currentWind = document.querySelector(".currentWind");
const currentPressure = document.querySelector(".currentPressure");
const currentHumidity = document.querySelector(".currentHumidity");
const currentSunset = document.querySelector(".currentSunset");
const currentSunrise = document.querySelector(".currentSunrise");

//48 HOURS
const hoursTimeDisplay = Array.from(
  document.querySelectorAll(".hours__dateAndTime")
);
const hoursImageDisplay = Array.from(
  document.querySelectorAll(".hours__imageWrapper")
);
const hoursTempDisplay = Array.from(document.querySelectorAll(".hours__temp"));
const hoursClouds = Array.from(document.querySelectorAll(".hours__clouds"));
const hoursHumidity = Array.from(document.querySelectorAll(".hours__humidity"));
const hoursWind = Array.from(document.querySelectorAll(".hours__wind"));
const hoursPressure = Array.from(document.querySelectorAll(".hours__pressure"));

//7 DAYS
const daysDateDisplay = Array.from(document.querySelectorAll(".days__date"));
const daysImageDisplay = Array.from(
  document.querySelectorAll(".days__imageWrapper")
);
const daysDescription = Array.from(
  document.querySelectorAll(".days__description")
);
const daysTempDay = Array.from(document.querySelectorAll(".days__tempDay"));
const daysTempNight = Array.from(document.querySelectorAll(".days__tempNight"));
const daysClouds = Array.from(document.querySelectorAll(".days__clouds"));
const daysHumidity = Array.from(document.querySelectorAll(".days__humidity"));
const daysWind = Array.from(document.querySelectorAll(".days__wind"));
const daysPressure = Array.from(document.querySelectorAll(".days__pressure"));
const daysSunrise = Array.from(document.querySelectorAll(".days__sunrise"));
const daysSunset = Array.from(document.querySelectorAll(".days__sunset"));
const daysRain = Array.from(document.querySelectorAll(".days__rainfall"));

//HELP
let weatherData;
let cityNameVar;

//START
cityName.value = "Warsaw";
getCityData();

//FUNCTIONS
function getCityData() {
  if (cityName.value != "") {
    let lat = 0;
    let lon = 0;
    cityNameVar = cityName.value;

    fetch(`city.list.json`)
      .then((response) => {
        return response.json();
      })
      .then((dataList) => {
        for (i = 0; i < dataList.length; i++) {
          if (cityName.value == dataList[i].name) {
            lat = dataList[i].coord.lat;
            lon = dataList[i].coord.lon;
            break;
          }
        }
        if (lat == 0 && lon == 0) {
          window.alert("PLEASE ENTER VALID NAME");
          return;
        }
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${xxx}`
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            weatherData = data;
            updateCurrentDisplay();
            updateHourDisplay();
            updateDayDisplay();
            searchForm.reset();
          });
      });
  } else {
    window.alert("PLEASE ENTER CITY NAME");
  }
}

function updateCurrentDisplay() {
  currentImageDisplay.innerHTML = "";
  nameDisplay.innerHTML = cityNameVar;
  currentTimeDisplay.innerHTML = `${new Date(
    weatherData.current.dt * 1000
  ).toLocaleString("pl-PL", {
    hour: "numeric",
    minute: "numeric",
  })}  -  ${new Date(weatherData.current.dt * 1000).toLocaleString("pl-PL", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  })}`;
  const img = document.createElement("img");
  img.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
  );
  currentImageDisplay.appendChild(img);
  currentTempDisplay.innerHTML = `${weatherData.current.temp.toFixed(1)} ℃`;
  currentFeelTempDisplay.innerHTML = `${weatherData.current.feels_like.toFixed(
    1
  )} ℃`;
  currentFeelText.innerHTML = "FEELS LIKE";
  currentTextDisplay.innerHTML = weatherData.current.weather[0].description;
  currentClouds.innerHTML = `${weatherData.current.clouds} %`;
  currentWind.innerHTML = `${weatherData.current.wind_speed.toFixed(
    1
  )} m/s - ${setWind(weatherData.current.wind_deg)}`;
  currentPressure.innerHTML = `${weatherData.current.pressure} hPa`;
  currentHumidity.innerHTML = `${weatherData.current.humidity} %`;
  currentSunrise.innerHTML = `${new Date(
    weatherData.current.sunrise * 1000
  ).toLocaleString("pl-PL", {
    hour: "numeric",
    minute: "numeric",
  })}`;
  currentSunset.innerHTML = `${new Date(
    weatherData.current.sunset * 1000
  ).toLocaleString("pl-PL", {
    hour: "numeric",
    minute: "numeric",
  })}`;
}

function updateHourDisplay() {
  for (i = 0; i < 48; i++) {
    hoursImageDisplay[i].innerHTML = "";
    hoursTimeDisplay[i].innerHTML = `${new Date(
      weatherData.hourly[i].dt * 1000
    ).toLocaleString("pl-PL", {
      day: "numeric",
      month: "numeric",
    })}  -  ${new Date(weatherData.hourly[i].dt * 1000).toLocaleString(
      "pl-PL",
      {
        hour: "numeric",
        minute: "numeric",
      }
    )}`;
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${weatherData.hourly[i].weather[0].icon}@2x.png`
    );
    hoursImageDisplay[i].appendChild(img);
    hoursTempDisplay[i].innerHTML = `${weatherData.hourly[i].temp.toFixed(
      1
    )} ℃`;
    hoursClouds[i].innerHTML = `${weatherData.hourly[i].clouds} %`;
    hoursHumidity[i].innerHTML = `${weatherData.hourly[i].humidity} %`;
    hoursWind[i].innerHTML = `${weatherData.hourly[i].wind_speed.toFixed(
      1
    )} m/s - ${setWind(weatherData.hourly[i].wind_deg)}`;
    hoursPressure[i].innerHTML = `${weatherData.hourly[i].pressure} hPa`;
  }
}

function updateDayDisplay() {
  for (i = 0; i < 8; i++) {
    daysImageDisplay[i].innerHTML = "";
    daysDateDisplay[i].innerHTML = `${new Date(
      weatherData.daily[i].dt * 1000
    ).toLocaleString("pl-PL", {
      day: "numeric",
      month: "numeric",
    })}`;
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${weatherData.daily[i].weather[0].icon}@2x.png`
    );
    daysImageDisplay[i].appendChild(img);
    daysDescription[i].innerHTML = weatherData.daily[i].weather[0].description;
    daysTempDay[i].innerHTML = `${weatherData.daily[i].temp.day.toFixed(1)} ℃`;
    daysTempNight[i].innerHTML = `${weatherData.daily[i].temp.night.toFixed(
      1
    )} ℃`;
    daysClouds[i].innerHTML = `${weatherData.daily[i].clouds} %`;
    daysHumidity[i].innerHTML = `${weatherData.daily[i].humidity} %`;
    daysWind[i].innerHTML = `${weatherData.daily[i].wind_speed.toFixed(
      1
    )} m/s - ${setWind(weatherData.daily[i].wind_deg)}`;
    daysPressure[i].innerHTML = `${weatherData.daily[i].pressure} hPa`;
    daysSunrise[i].innerHTML = `${new Date(
      weatherData.daily[i].sunrise * 1000
    ).toLocaleString("pl-PL", {
      hour: "numeric",
      minute: "numeric",
    })}`;
    daysSunset[i].innerHTML = `${new Date(
      weatherData.daily[i].sunset * 1000
    ).toLocaleString("pl-PL", {
      hour: "numeric",
      minute: "numeric",
    })}`;
    if (weatherData.daily[i].rain == undefined) {
      daysRain[i].innerHTML = "NO DATA";
    } else {
      daysRain[i].innerHTML = `${weatherData.daily[i].rain} mm`;
    }
  }
}

function setWind(wind) {
  if (wind > 348.75 || wind < 11.25) {
    return "N";
  }
  if ((wind > 11.25) & (wind < 33.75)) {
    return "NNE";
  }
  if ((wind > 33.75) & (wind < 56.25)) {
    return "NE";
  }
  if ((wind > 56.25) & (wind < 78.75)) {
    return "ENE";
  }
  if ((wind > 78.75) & (wind < 101.25)) {
    return "E";
  }
  if ((wind > 101.25) & (wind < 123.75)) {
    return "ESE";
  }
  if ((wind > 123.75) & (wind < 146.25)) {
    return "SE";
  }
  if ((wind > 146.25) & (wind < 168.75)) {
    return "SSE";
  }
  if ((wind > 168.75) & (wind < 191.25)) {
    return "S";
  }
  if ((wind > 191.25) & (wind < 213.75)) {
    return "SSW";
  }
  if ((wind > 213.75) & (wind < 236.25)) {
    return "SW";
  }
  if ((wind > 236.25) & (wind < 258.75)) {
    return "WSW";
  }
  if ((wind > 258.75) & (wind < 281.25)) {
    return "W";
  }
  if ((wind > 281.25) & (wind < 303.75)) {
    return "NNE";
  }
  if ((wind > 303.75) & (wind < 326.25)) {
    return "NNE";
  }
  if ((wind > 326.25) & (wind < 348.75)) {
    return "NNW";
  }
}

searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  getCityData();
});
