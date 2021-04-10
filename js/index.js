const API_KEY = "4d72e32c81d7c3011895d859d33bf158";
const DEFAULT_CITY = "Ahmedabad";

function getDatafromAPI(cityName = DEFAULT_CITY) {
    let URL =
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=` +
        API_KEY;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => printUI(data));
}

getDatafromAPI();

function printUI(data) {
    if (data.cod === 200) {
        let cityName = data.name;
        let { feels_like, humidity, temp } = data.main;
        let { description, icon } = data.weather[0];

        let sunrise = new Date(data.sys.sunrise * 1000);
        let sunset = new Date(data.sys.sunset * 1000);

        document.querySelector(
            ".city-name"
        ).innerText = `Weather in ${cityName}`;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(
            ".weather-icon"
        ).src = `https://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector(".description").innerText = description;
        document.querySelector(
            ".humidity"
        ).innerText = `Humidity : ${humidity}`;
        document.querySelector(
            ".feels-like"
        ).innerText = `Feels like : ${feels_like}°C`;
        document.querySelector(
            ".sunrise"
        ).innerText = `Sunrise : ${sunrise.toLocaleTimeString()}`;
        document.querySelector(
            ".sunset"
        ).innerText = `Sunset : ${sunset.toLocaleTimeString()}`;

        document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${cityName})`;
        document.querySelector(".weather.loading").classList.remove("loading");
    } else {
        alert("Invalid city name!");
        searchCity();
    }
}

function searchCity() {
    let cityName = document.querySelector(".search-box");
    if (cityName.value != "") {
        document.querySelector(".weather").classList.add("loading");
        console.log(cityName.value);
        getDatafromAPI(cityName.value);
        cityName.value = "";
    } else getDatafromAPI();
}

document.querySelector(".search-btn").addEventListener("click", () => {
    searchCity();
});

document.querySelector(".search-box").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        searchCity();
    }
});
