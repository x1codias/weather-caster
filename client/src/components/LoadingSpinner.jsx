import styles from "./LoadingSpinner.module.css";

function LoadingSpinner() {
  return (
    <div className={styles.holder}>
      <div className={styles.preloader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
