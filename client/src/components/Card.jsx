import { BsWind, BsSunriseFill, BsSunsetFill, BsWater } from "react-icons/bs";
import { WiHumidity } from "react-icons/wi";

import styles from "./Card.module.css";

function Card({ current, loadedData }) {
  function convertCelsius(temp) {
    const tempCelcius = Math.floor(temp - 273.5);

    return tempCelcius;
  }

  return current ? (
    <div className={`${styles["card-container"]} ${styles.climat}`}>
      <div className={styles["weather-content"]}>
        <h2 className={styles.location}>
          {loadedData.weatherData && loadedData.weatherData.city.name}
        </h2>
        <p className={styles.date}>
          <span className={styles.month}>
            {loadedData.weatherData &&
              new Intl.DateTimeFormat("en", { month: "long" }).format(
                new Date(loadedData.weatherData.list[0].dt_txt)
              )}
          </span>
          &nbsp;
          {loadedData.weatherData &&
            new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
              new Date(loadedData.weatherData.list[0].dt_txt)
            )}
          ,&nbsp;
          {loadedData.weatherData &&
            new Intl.DateTimeFormat("en", { year: "numeric" }).format(
              new Date(loadedData.weatherData.list[0].dt_txt)
            )}
        </p>
        <div className={styles["climat-content"]}>
          <img
            src={`https://openweathermap.org/img/wn/${
              loadedData.weatherData &&
              loadedData.weatherData.list[0].weather[0].icon
            }@2x.png`}
            className={styles["icon-current"]}
            alt="Weather icon"
          />
          <p className={styles.weather}>
            {loadedData.weatherData &&
              loadedData.weatherData.list[0].weather[0].main}
          </p>
        </div>
      </div>
      <div className={styles["degrees-content"]}>
        <h2 className={styles["current-degrees"]}>
          {convertCelsius(
            loadedData.weatherData && loadedData.weatherData.list[0].main.temp
          )}
          &nbsp;ºC
        </h2>
        <p className={styles["max-min-degrees"]}>
          {convertCelsius(
            loadedData.weatherData &&
              loadedData.weatherData.list[0].main.temp_min
          )}
          /
          {convertCelsius(
            loadedData.weatherData &&
              loadedData.weatherData.list[0].main.temp_max
          )}
          &nbsp;ºC
        </p>
      </div>
    </div>
  ) : (
    <div className={`${styles["card-container"]} ${styles.info}`}>
      <div className={styles["wind-info"]}>
        <BsWind size={100} className={styles.icon} />
        <div className={styles["wind-text-container"]}>
          <p
            className={`${styles["wind-text"]} ${styles["wind-text-wrapper"]}`}
            style={{ marginRight: "2rem" }}
          >
            {loadedData.weatherData && loadedData.weatherData.list[0].wind.deg}º
          </p>
          <p className={styles["wind-text"]} style={{ marginRight: "2rem" }}>
            <span className={styles["wind-text-wrapper"]}>
              {loadedData.weatherData &&
                loadedData.weatherData.list[0].wind.gust}
            </span>
            <br />
            m/s
          </p>
          <p className={styles["wind-text"]}>
            <span className={styles["wind-text-wrapper"]}>
              {loadedData.weatherData &&
                loadedData.weatherData.list[0].wind.speed}
            </span>
            <br />
            m/s
          </p>
        </div>
      </div>
      <div className={styles["general-info"]}>
        <div className={styles.divider}>
          <div className={styles["small-divider"]}>
            <WiHumidity size={80} className={styles.icon} />
            <p
              className={`${styles["wind-text"]} ${styles["wind-text-wrapper"]}`}
            >
              {loadedData.weatherData &&
                loadedData.weatherData.list[0].main.humidity}
              %
            </p>
          </div>
          <div className={styles["small-divider"]}>
            <BsWater size={60} className={styles.icon} />
            <p className={styles["wind-text"]} style={{ marginTop: "6rem" }}>
              <span className={styles["wind-text-wrapper"]}>
                {loadedData.weatherData &&
                  loadedData.weatherData.list[0].main.sea_level}
              </span>{" "}
              hPa
            </p>
          </div>
        </div>
        <div className={styles.divider}>
          <div className={styles["small-divider"]}>
            <BsSunriseFill size={80} className={styles.icon} />
            <p
              className={`${styles["wind-text"]} ${styles["wind-text-wrapper"]}`}
            >
              {loadedData.weatherData &&
                new Date(loadedData.weatherData.city.sunrise * 1000).getHours()}
              h:
              {loadedData.weatherData &&
                new Date(
                  loadedData.weatherData.city.sunrise * 1000
                ).getMinutes()}
              m
            </p>
          </div>
          <div className={styles["small-divider"]}>
            <BsSunsetFill size={80} className={styles.icon} />
            <p
              className={`${styles["wind-text"]} ${styles["wind-text-wrapper"]}`}
            >
              {loadedData.weatherData &&
                new Date(loadedData.weatherData.city.sunset * 1000).getHours()}
              h:
              {loadedData.weatherData &&
                new Date(
                  loadedData.weatherData.city.sunset * 1000
                ).getMinutes()}
              m
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
