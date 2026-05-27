import React, { useEffect, useState } from 'react';

const DEFAULT_CITY = 'Varanasi';

function App() {
  const [cityInput, setCityInput] = useState(DEFAULT_CITY);
  const [cityName, setCityName] = useState(DEFAULT_CITY);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchWeather(city) {
      setLoading(true);
      setError('');
      setWeatherData(null);

      try {
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
        );
        const geoJson = await geoRes.json();

        if (!geoJson.results || geoJson.results.length === 0) {
          throw new Error(`City not found: ${city}`);
        }

        const { latitude, longitude, name, country } = geoJson.results[0];
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`
        );
        const weatherJson = await weatherRes.json();

        if (!weatherJson.current_weather) {
          throw new Error('Unable to load weather data.');
        }

        const weatherDescription = mapWeatherCodeToText(weatherJson.current_weather.weathercode);

        setWeatherData({
          city: `${name}, ${country}`,
          temperature: weatherJson.current_weather.temperature,
          windSpeed: weatherJson.current_weather.windspeed,
          windDirection: weatherJson.current_weather.winddirection,
          time: weatherJson.current_weather.time,
          weatherDescription,
        });
      } catch (fetchError) {
        setError(fetchError.message || 'Weather fetch failed.');
      } finally {
        setLoading(false);
      }
    }

    fetchWeather(cityName);
  }, [cityName]);

  function handleSearchSubmit(event) {
    event.preventDefault();
    if (!cityInput.trim()) return;
    setCityName(cityInput.trim());
  }

  function mapWeatherCodeToText(code) {
    const weatherCodes = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      56: 'Light freezing drizzle',
      57: 'Dense freezing drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      66: 'Light freezing rain',
      67: 'Heavy freezing rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      77: 'Snow grains',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      85: 'Slight snow showers',
      86: 'Heavy snow showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with hail',
      99: 'Thunderstorm with heavy hail',
    };

    return weatherCodes[code] || 'Unknown weather';
  }

  function renderWeather() {
    if (loading) {
      return (
        <div className="status-card">
          <div className="spinner" />
          <p>Loading weather</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="status-card error-card">
          <p>{error}</p>
        </div>
      );
    }

    if (!weatherData) {
      return (
        <div className="status-card">
          <p>Search a city to reveal the forecast.</p>
        </div>
      );
    }

    return (
      <div className="weather-card">
        <div className="weather-intro">
          <div>
            <p className="weather-label">Current temperature</p>
            <h2>{weatherData.temperature}°</h2>
          </div>
          <p className="weather-location">{weatherData.city}</p>
        </div>

        <div className="weather-grid">
          <div className="detail-pill">
            <span>Wind</span>
            <strong>{weatherData.windSpeed} km/h</strong>
          </div>
          <div className="detail-pill">
            <span>Direction</span>
            <strong>{weatherData.windDirection}°</strong>
          </div>
          <div className="detail-pill">
            <span>Local time</span>
            <strong>{new Date(weatherData.time).toLocaleString()}</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="rain-overlay" />
      <main className="mobile-dashboard">
        <section className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow">{weatherData ? weatherData.weatherDescription : 'Misty Weather'}</p>
            <h1>{weatherData ? `${weatherData.temperature}°` : '---'}</h1>
          </div>

          <form className="search-panel" onSubmit={handleSearchSubmit}>
            <label htmlFor="city-search">Search city</label>
            <div className="input-group">
              <input
                id="city-search"
                value={cityInput}
                onChange={(event) => setCityInput(event.target.value)}
                placeholder="Tokyo"
              />
              <button type="submit">Search</button>
            </div>
          </form>
        </section>

        <section className="weather-panel">{renderWeather()}</section>
      </main>
    </div>
  );
}

export default App;
