import { Fragment, useContext, useState } from "react";
import styles from "./MainPage.module.css";
import AuthModal from "./AuthModal";
import { AuthContext } from "../context/auth-context";

function MainPage({ onHideContent, isHidden }) {
  const auth = useContext(AuthContext);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Fragment>
      <div
        className={
          isHidden ? `${styles.container} ${styles.hidden}` : styles.container
        }
      >
        <h1
          className={
            isHidden
              ? `${styles.title} ${styles["lower-title-size"]}`
              : styles.title
          }
        >
          Weather Caster
        </h1>
        <div
          className={
            isHidden
              ? `${styles["text-container"]} ${styles["hide-text"]}`
              : styles["text-container"]
          }
        >
          <p className={styles["welcome-text"]}>
            Welcome to our brand new forecast website, where you can get the
            most precise forecasts
          </p>
          <div className={styles["auth-group"]}>
            {!auth.isLoggedIn && (
              <>
                <p className={styles["sign-up-text"]}>
                  Be sure to{" "}
                  <button
                    className={`${styles["show-data-button"]} ${styles.auth}`}
                    onClick={() => {
                      setOpenAuthModal(true);
                      setIsLogin(false);
                    }}
                  >
                    sign up
                  </button>{" "}
                  to get access to our data
                </p>
                <p className={styles["log-in-text"]}>
                  You already own an account?{" "}
                  <button
                    className={`${styles["show-data-button"]} ${styles.auth}`}
                    onClick={() => {
                      setOpenAuthModal(true);
                      setIsLogin(true);
                    }}
                  >
                    Log in here
                  </button>
                </p>
              </>
            )}
            {auth.isLoggedIn && (
              <button
                className={`${styles["show-data-button"]} ${styles.auth}`}
                style={{ marginBottom: "4rem", padding: "1rem 2rem" }}
                onClick={() => {
                  auth.logout();
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {auth.isLoggedIn && (
          <button
            className={styles["show-data-button"]}
            onClick={onHideContent}
          >
            {isHidden ? "Hide" : "Show"} forecast
          </button>
        )}
      </div>
      {openAuthModal && (
        <AuthModal closeModal={setOpenAuthModal} isLogin={isLogin} />
      )}
    </Fragment>
  );
}

export default MainPage;
