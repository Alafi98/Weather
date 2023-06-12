const keyWeather = '1a765cf32b5a2cd7c8cbbebf5fe10144';
//https://openweathermap.org/weather-conditions


const pais = document.getElementById('pais');
const ciudad = document.getElementById('ciudad');
const longitud = document.getElementById('longitud');
const latitud = document.getElementById('latitud');
const descripcion = document.getElementById('description');
const temperatura = document.getElementById('temperatura');
const tempMax = document.getElementById('temperatura-max');
const tempMin = document.getElementById('temperatura-min');
const viento = document.getElementById('viento');
const humedad = document.getElementById('humedad');


const input = document.getElementById('buscador-hijo');




input.addEventListener('input', function() {
  this.style.width = (this.value.length + 1) * 22 + 'px';
});

const cambioImg = function cambiarImagenJS(){
    document.getElementsByClassName("sol-img").src=`https://openweathermap.org/img/wn/${}@2x.png`;
  }




cambiarImagenJS();


const cityParam = async (city) => {
    const url2 =  `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${keyWeather}`;
    const response2 = await fetch(url2);
    const data2 = await response2.json();
    console.log(data2)

    return data2;
}


const weatherParam = async (city) => {
    const url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyWeather}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    
    return data;
}

input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const city = this.value;

        cityParam(city)
            .then(response2 => {
                pais.innerText = "Pais: " + response2[0].country;
                 ciudad.innerText = 'Estado: ' + response2[0].state;
                longitud.innerText = 'Longitud= ' + response2[0].lon;
                latitud.innerText = 'Latitud= ' + response2[0].lat;  
                
        
            })
        
        .catch(error => console.log(error));
        weatherParam(city)
        .then(response => {
        descripcion.innerText = "," + response.weather[0].description;

        const imgWeather = 

     
        //Temperatura
        const temperaturaKelvin = response.main.temp;
        const temperaturaCelsius = Math.round(temperaturaKelvin - 273.15);
     
        temperatura.innerText = temperaturaCelsius + ' °C';

        //Temperatura max
        const temMaxKelvin = response.main.temp_max;
        const temMaxCelsius = Math.round(temMaxKelvin - 273.15);

        tempMax.innerText = '/' + temMaxCelsius + ' °C';

        //temperatura min
        const temMinKelvin = response.main.temp_min;
        const temMinCelsius = Math.round(temMinKelvin - 273.15);

        tempMin.innerText = temMinCelsius + ' °C';

        //Velocidad del viento 
        const wind = response.wind.speed;

        viento.innerText = Math.round(wind) + 'Km/h';
        
        //porcentaje de humedad

        humedad.innerText = response.main.humidity + "%";













    })

.catch(error => console.log(error));
    }
});    