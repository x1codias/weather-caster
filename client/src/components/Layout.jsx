import styles from "./Layout.module.css";

function Layout({ children, hideWelcome }) {
  return (
    <div
      className={
        hideWelcome
          ? `${styles.container} ${styles["hide-welcome"]}`
          : styles.container
      }
    >
      {children}
    </div>
  );
}

export default Layout;
