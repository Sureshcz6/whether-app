let map;

// ENTER KEY
document.getElementById("city").addEventListener("keydown", function(e){
  if(e.key === "Enter"){
    getWeather();
  }
});

async function getWeather(){
  const city = document.getElementById("city").value;

  if(city === ""){
    alert("Enter city or state");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try{
    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

    if(data.cod !== 200){
      document.getElementById("weatherResult").innerHTML = data.message;
      return;
    }

    document.getElementById("weatherResult").innerHTML = `
      <h2>${city}</h2>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
      <p>🌡 ${data.main.temp}°C</p>
      <p>${data.weather[0].description}</p>
    `;

    document.getElementById("userInfo").innerText = `City: ${city}`;

    showMap(data.coord.lat, data.coord.lon);

    changeVideo(data.weather[0].main);

  } catch(err){
    console.error(err);
    alert("Error fetching data");
  }
}

// MAP
function showMap(lat, lon){
  if(map){
    map.remove();
  }

  map = L.map('map').setView([lat, lon], 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    .addTo(map);

  L.marker([lat, lon]).addTo(map);
}

// VIDEO
function changeVideo(weather){
  const video = document.getElementById("bgVideo");

  if(weather === "Rain" || weather === "Drizzle" || weather === "Thunderstorm"){
    video.src = "videos/rain.mp4";
  }
  else if(weather === "Clouds"){
    video.src = "videos/clouds.mp4";
  }
  else{
    video.src = "videos/clear.mp4";
  }
}

// FEEDBACK
function submitFeedback(){
  const feedback = document.getElementById("feedback").value;

  if(feedback === ""){
    alert("Write something");
    return;
  }

  alert("Thanks for feedback!");
}