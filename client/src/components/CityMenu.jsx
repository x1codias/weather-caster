import styles from "./CityMenu.module.css";
import lisbonImage from "../images/lisbon.jpg";
import leiriaImage from "../images/leiria.jpg";
import coimbraImage from "../images/coimbra.jpg";
import portoImage from "../images/porto.jpg";
import faroImage from "../images/faro.jpg";
import CityMenuItem from "./CityMenuItem";

function CityMenu({ onChange }) {
  const cities = [
    {
      name: "Lisbon",
      id: 2267056,
      image: lisbonImage,
    },
    {
      name: "Leiria",
      id: 2267094,
      image: leiriaImage,
    },
    {
      name: "Coimbra",
      id: 2740636,
      image: coimbraImage,
    },
    {
      name: "Porto",
      id: 2735941,
      image: portoImage,
    },
    {
      name: "Faro",
      id: 2268337,
      image: faroImage,
    },
  ];

  return (
    <ul className={styles["city-menu"]}>
      {cities.map((city) => (
        <CityMenuItem
          key={city.id}
          cityId={city.id}
          cityImage={city.image}
          cityName={city.name}
          onChange={onChange}
        />
      ))}
    </ul>
  );
}

export default CityMenu;
