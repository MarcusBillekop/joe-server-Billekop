let responseDom = document.getElementById("response");
let cookieDom = document.getElementById("cookie");
let locationDom = document.getElementById("location");
let latlongDom = document.getElementById("latlong");
let weatherDom = document.getElementById("weather");


// funktion til at hente respons fra server
// async funktion med await
async function getResponse() {
  // try catch blok
  try {
    // fetch data fra /res endpoint og await responsen
    const response = await fetch('/res');
    
    // hvis responsen ikke er ok, kast en fejl
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // konverter responsen til tekst
    const data = await response.text(); 
    
    // håndter succes
    console.log(data);
    responseDom.innerHTML = data;
  } catch (error) {
    // håndter fejl
    console.log(error);
    responseDom.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}


// funktion til at sætte cookie
// async funktion med await
async function setCookie() {
    // try catch blok
    try {
      // fetch data fra /res endpoint og await responsen
      const response = await fetch('/cookie');

      // hvis responsen ikke er ok, kast en fejl
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // konverter responsen til tekst
      const value = await response.text();

      // håndter succes
      console.log(value);
      cookieDom.innerHTML = value;
    } catch (error) {
      // håndter fejl
      console.log(error);
      cookieDom.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}


// funktion til at hente placering og kalder getLatLong() funktionen
// async funktion med await
async function getLocation() {
  const dropdown = document.getElementById('locationDropdown');
  const selectedLocation = dropdown.options[dropdown.selectedIndex].text;
  locationDom.innerHTML = `Your location is ${selectedLocation}`;
  document.cookie = `location=${selectedLocation}; path=/;`;
  await getLatLong(selectedLocation);
}


// Asynkron funktion til at hente latitude og longitude
async function getLatLong(locationName) {
  // Definer API-endpoint
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&addressdetails=1`;

  try {
      // Fetch data fra API
      const response = await fetch(url);

      // Tjek om svaret er gyldigt
      if (!response.ok) {
          throw new Error("Fejl under hentning af data");
      }

      // Konverter responsen til JSON
      const data = await response.json();

      // Log data til konsollen for at se struktur
      console.log(data);

      // Tjek om vi har modtaget resultater
      if (data.length === 0) {
          throw new Error("Ingen resultater fundet");
      }

      // Hent latitude og longitude fra det første resultat
      const latitude = data[0].lat;
      const longitude = data[0].lon;

      // Tilføj data til DOM-elementer
      const locationDom = document.getElementById("location");
      const latlongDom = document.getElementById("latlong");

      // Opdater DOM med data
      locationDom.innerHTML = `Location: ${locationName}`;
      latlongDom.innerHTML = `Latitude: ${latitude}, Longitude: ${longitude}`;

  } catch (error) {
      // Håndter fejl og log til konsollen
      console.error("Fejl:", error.message);

      // Tilføj fejlbesked til DOM
      const latlongDom = document.getElementById("latlong");
      latlongDom.innerHTML = `Fejl: ${error.message}`;
  }
}

// Funktion der bliver kaldt ved knaptryk for at få valgt placering
function getLocation() {
  // Hent den valgte placering fra dropdown
  const locationDropdown = document.getElementById("locationDropdown");
  const locationName = locationDropdown.value;

  // Kald funktionen til at hente latitude og longitude
  getLatLong(locationName);
}



// ----------------------------------------------------------------------------------------------------
// Opgave 3: Lav en asynkron funktion med latitude og longitude som parametre til at hente vejrdata
// url for API: `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`
// dokumentation for API: https://open-meteo.com/en/docs
// response er json() data og skal konverteres og brug console.log() til at se data
// denne funktion bliver kaldt i getLatLong() funktionen

// async funktion med await
// Opgave 3: Lav en asynkron funktion med latitude og longitude som parametre til at hente vejrdata
async function getWeather(lat, long) {
  // Definer API-endpoint med de givne latitude og longitude
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`;

  try {
      // Fetch vejrdata fra API
      const response = await fetch(url);

      // Tjek om svaret er gyldigt
      if (!response.ok) {
          throw new Error("Fejl under hentning af vejrdata");
      }

      // Konverter responsen til JSON
      const data = await response.json();

      // Log data til konsollen for at se struktur
      console.log(data);

      // Tjek om der er vejrdata
      if (data && data.current_weather) {
          // Hent relevant vejrdata
          const temperature = data.current_weather.temperature;
          const windspeed = data.current_weather.windspeed;

          // Tilføj vejrdata til DOM
          const weatherDom = document.getElementById("weather");
          weatherDom.innerHTML = `Temperatur: ${temperature}°C, Vindhastighed: ${windspeed} km/h`;
      } else {
          throw new Error("Ingen vejrdata fundet");
      }
  } catch (error) {
      // Håndter fejl og log til konsollen
      console.error("Fejl:", error.message);

      // Tilføj fejlbesked til DOM
      const weatherDom = document.getElementById("weather");
      weatherDom.innerHTML = `Fejl: ${error.message}`;
  }
}

// ----------------------------------------------------------------------------------------------------