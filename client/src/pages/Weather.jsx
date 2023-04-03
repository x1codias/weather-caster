import { useCallback, useEffect, useState } from "react";

import { useHttpClient } from "../hooks/http-hook";
import CityMenu from "../components/CityMenu";
import LoadingSpinner from "../components/LoadingSpinner";
import styles from "./Weather.module.css";
import Card from "../components/Card";

function Weather({ isHidden }) {
  const [selectedCity, setSelectedCity] = useState("");
  const [loadedWeatherData, setLoadedWeatherData] = useState({});
  const { isLoading, sendRequest } = useHttpClient();

  const changeCityHandler = useCallback(
    async (event) => {
      setSelectedCity(event.target.value);
      try {
        const weatherData = await sendRequest(
          `http://localhost:5000/api/weather/${event.target.value}`
        );

        console.log(weatherData);

        setLoadedWeatherData(weatherData);
      } catch (err) {}
    },
    [sendRequest]
  );

  useEffect(() => {
    const interval =
      selectedCity &&
      setInterval(async () => {
        try {
          const weatherData = await sendRequest(
            `http://localhost:5000/api/weather/${selectedCity}`
          );

          console.log(weatherData);

          setLoadedWeatherData(weatherData);
        } catch (err) {}
      }, 180000);

    return () => clearInterval(interval);
  }, [selectedCity, sendRequest]);

  return (
    <div
      className={
        !isHidden ? `${styles.container} ${styles.hidden}` : styles.container
      }
    >
      <CityMenu onChange={changeCityHandler} />
      {isLoading && <LoadingSpinner />}
      {!selectedCity && (
        <div className={styles.center}>
          <h2 className={styles["select-city-text"]}>
            Please select a city above to display data
          </h2>
        </div>
      )}
      {!isLoading && selectedCity && (
        <div className={styles.center}>
          <Card current loadedData={loadedWeatherData} />
          <Card loadedData={loadedWeatherData} />
        </div>
      )}
    </div>
  );
}

export default Weather;
