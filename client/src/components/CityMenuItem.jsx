import styles from "./CityMenuItem.module.css";

function CityMenuItem({ cityName, cityImage, cityId, onChange, selected }) {
  return (
    <li className={styles.city}>
      <div className={styles["background-container"]}>
        <img src={cityImage} alt="Background lisbon" />
      </div>
      <div className={styles["city-content"]}>
        <input
          type="radio"
          className={styles["city-input"]}
          id={cityName}
          value={cityId}
          onChange={onChange}
          name="city-group"
        />
        <label className={styles["city-label"]} htmlFor={cityName}>
          {cityName}
        </label>
      </div>
    </li>
  );
}

export default CityMenuItem;
