export async function getWeather(city) {
  const search = city.trim();

  if (!search) {
    throw new Error("Please enter a city name.");
  }

  const locationResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(search)}&count=1&language=en&format=json`
  );

  if (!locationResponse.ok) {
    throw new Error("Unable to find that city right now.");
  }

  const locationData = await locationResponse.json();
  const location = locationData.results?.[0];

  if (!location) {
    throw new Error("City not found. Try a nearby city name.");
  }

  const forecastResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=7`
  );

  if (!forecastResponse.ok) {
    throw new Error("Weather data is temporarily unavailable.");
  }

  const weather = await forecastResponse.json();

  return {
    location,
    weather
  };
}