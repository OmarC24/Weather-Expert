import React, { useState } from "react";
import solImage from "./assets/sol.png";
import nubladoImage from "./assets/nublado2.png";
import lluviaImage from "./assets/lluvia.png";
import "./styles.css"; // Asegúrate de importar tu archivo CSS aquí

export const WeatherSearch = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const onValueChange = (event) => {
    setInputValue(event.target.value);
  };

  const traducciones = {
    'clear sky': 'cielo despejado',
    'few clouds': 'pocas nubes',
    'scattered clouds': 'nubes dispersas',
    'broken clouds': 'nubes rotas',
    'overcast clouds': 'nublado',
    'shower rain': 'lluvia',
    'light rain': 'lluvia ligera',
    'moderate rain': 'lluvia moderada',
    'heavy rain': 'lluvia intensa',
    'thunderstorm': 'tormenta eléctrica',
    'snow': 'nieve',
    'mist': 'niebla',
    'haze': 'neblina',
    // Agrega más traducciones según sea necesario
  };

  const traducirDescripcionClima = (descripcionEnIngles) => {
    return traducciones[descripcionEnIngles] || descripcionEnIngles;
  };

  const obtenerIconoClima = (descripcionEnIngles) => {
    const descripcionEnMinusculas = descripcionEnIngles.toLowerCase();

    if (descripcionEnMinusculas.includes("cielo despejado")) {
      return solImage;
    } else if (descripcionEnMinusculas.includes("n")) {
      return nubladoImage;
    } else if (descripcionEnMinusculas.includes("lluvia", "tormenta")) {
      return lluviaImage;
    } else {
      return null; // Retornar null si no se encuentra una imagen correspondiente
    }
  };

  const searchClick = () => {
    const apiKey = "be38c626389b678193109d8fa85d2e70";
    const ciudad = inputValue;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud a la API falló.");
        }
        return response.json();
      })
      .then((responseData) => {
        const descripcionEnIngles = responseData.weather[0].description;
        const descripcionEnEspanol = traducirDescripcionClima(descripcionEnIngles);

        setData({
          ...responseData,
          weather: [
            {
              ...responseData.weather[0],
              description: descripcionEnEspanol,
            },
          ],
        });

        setError(null);
      })
      .catch((fetchError) => {
        setError(fetchError.message);
        setData(null);
      });
  };

  return (
    <div className="weather-container">
      <div className="weather-info-container slide-down-enter">
      <h1 className="weather-title">Weather</h1>
      <input
        placeholder="Ingresar el nombre de una ciudad..."
        value={inputValue}
        onChange={onValueChange}
        className="weather-input"
      />
      <button onClick={searchClick} className="weather-button">
        Ver Clima
      </button>
      {error && <p className="weather-error">Error: {error}</p>}
      {data && (
        <div className="weather-info-container slide-down-enter">
        <p className="weather-info-text">
          Temperatura: {((data.main.temp) - 273.15).toFixed(2)} C
        </p>
        <p className="weather-info-text">
          Descripción: {data.weather[0].description}
        </p>
        <img
          src={obtenerIconoClima(data.weather[0].description)}
          alt="Icono del clima"
          className="weather-icon"
        />
      </div>
      )}
      </div>
    </div>
  );
};
