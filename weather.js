
const API_KEY='429e7f601c22320f01eeb47b60a1cf2a';
const COORDS='coords';
const weather = document.querySelector('.js-weather');


function getWeather(lat,lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json()
    }).then(function(json){
        console.log(json)
        const temperature = json.main.temp;
        const feels_like = json.main.feels_like;
        const temp_min = json.main.temp_min;
        const temp_max = json.main.temp_max;
        const humidity = json.main.humidity;

        const place = json.name;
        const span1= document.createElement('span');
        const span2 = document.createElement('span');
        const span3 = document.createElement('span');
        const span4 = document.createElement('span');

        span1.innerText = `${temperature} @ ${place}`;
        span2.innerText = `feels like ${feels_like}`;
        span3.innerText= `min ${temp_min} max ${temp_max}`;
        span4.innerText = `Humidity ${humidity}`;
        
        weather.appendChild(span1);
        weather.appendChild(span2);
        weather.appendChild(span3);
        weather.appendChild(span4);

        
})
}
function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj))
}   
function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const coordsObj={
        latitude,
        longitude
    };
    saveCoords(coordsObj)
    getWeather(latitude,longitude)

}
function handleGeoError(){
    console.log('cant access geo location')
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError)
}
function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords ===null){
        askForCoords();
    } else {
        //get weather
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude)
    }
}

function init(){
    loadCoords()
}

init();
