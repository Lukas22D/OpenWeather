// Variables
import chave from './senhas.js';
const apiCountryURL = "https://www.countryflagicons.com/FLAT/64/";
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const APIKEY = chave;
const apikey2 ="Q2V4GlrngVlT5o2EiBZ4NMcdOvF3cVBplITgAYK5Z3ndd63VELk7Gjiy";

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country ");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

//Functions
const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric&lang=pt_br`;
    
    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
};

 const showWeatherData = async (city) => {
    const data = await getWeatherData(city);
    if(data.name !== undefined){
    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    countryElement.src = `${apiCountryURL}${data.sys.country}.png`;
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;
    weatherContainer.classList.remove("hide");
    }else{
        alert("Cidade não encontrada");
        weatherContainer.classList.add("hide");
        }
    
 };

// Event 

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value;
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    
    if(e.code === "Enter"){
        const city = e.target.value;
        showWeatherData(city);
    }

});