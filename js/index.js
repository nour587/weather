let searchInput =document.querySelector("#searchInput")
let weather

searchInput.addEventListener("input",function(){
    if(searchInput.value.length>4){
        sendData(searchInput.value)
    }
})

 async function sendData(term) {
    weather=  await data(term)
    todayWeather()
    tomorrowWeather()
    AftertomorrowWeather()
}

async function data(term) {
    let response= await fetch (`https://api.weatherapi.com/v1/forecast.json?key=c03846057c5c4c749d215837251905&q=${term}&days=3`)
    let dataResponse= await response.json()
    return dataResponse
}  

function todayWeather() {
    let date = new Date(weather.location.localtime)
    
    document.querySelector("#todayDay").innerHTML = date.toLocaleDateString("en-us",{weekday:"long"})
    document.querySelector("#todayNum").innerHTML = date.toLocaleDateString("en-us",{day:"numeric"})
    document.querySelector("#month").innerHTML = date.toLocaleDateString("en-us",{month:"short"})
    document.querySelector("#todayTitle").innerHTML = weather.location.name
    document.querySelector("#todayImg").setAttribute("src",`https:${weather.current.condition.icon}`)
    document.querySelector("#todayTemp").innerHTML = weather.current.temp_c+"C"
    document.querySelector("#todayText").innerHTML = weather.current.condition.text
    document.querySelector("#wind-mph").innerHTML = weather.current.wind_mph+"%"
    document.querySelector("#wind-kph").innerHTML = weather.current.wind_kph+"km/h"
    document.querySelector("#todayDir").innerHTML = weather.current.wind_dir

}
function tomorrowWeather() {
    let date = new Date(weather.forecast.forecastday[1].date)
    
    document.querySelector("#tomorrowDay").innerHTML =date.toLocaleDateString("en-us",{weekday:"long"})
    document.querySelector("#tomorrowImg").setAttribute("src",`https:`+weather.forecast.forecastday[1].day.condition.icon)
    document.querySelector("#tomorrowDeg").innerHTML = weather.forecast.forecastday[1].day.maxtemp_c+"C"
    document.querySelector("#tomorrowWind").innerHTML = weather.forecast.forecastday[1].day.mintemp_c+"C"
    document.querySelector("#tomorrowText").innerHTML = weather.forecast.forecastday[1].day.condition.text
}
function AftertomorrowWeather() {
    let date = new Date(weather.forecast.forecastday[2].date)
    
    document.querySelector("#aftertomorrowDay").innerHTML =date.toLocaleDateString("en-us",{weekday:"long"})
    document.querySelector("#aftertomorrowImg").setAttribute("src",`https:`+weather.forecast.forecastday[2].day.condition.icon)
    document.querySelector("#afertomorrowDeg").innerHTML = weather.forecast.forecastday[2].day.maxtemp_c+"C"
    document.querySelector("#aftertomorrowWind").innerHTML = weather.forecast.forecastday[2].day.mintemp_c+"C"
    document.querySelector("#aftertomorrowText").innerHTML = weather.forecast.forecastday[2].day.condition.text
}


navigator.geolocation.getCurrentPosition(function(position){
    let livelocation = position.coords.latitude + ',' +position.coords.longitude
    sendData(livelocation)
    
})