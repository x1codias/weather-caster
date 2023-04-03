import { useContext } from "react";
import { useFormInputValidation } from "react-form-input-validation";

import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import LoaddingSpinner from "../components/LoadingSpinner";

import styles from "./AuthModal.module.css";

function AuthModal({ closeModal, isLogin }) {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();
  const [fields, errors, form] = useFormInputValidation(
    {
      username: "",
      email: "",
      password: "",
    },
    {
      username: "required",
      email: "required|email",
      password: "required",
    }
  );

  function handleCloseModal() {
    closeModal(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    console.log(fields, event);

    if (isLogin) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            username: fields.username,
            password: fields.password,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        console.log(responseData);

        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
      handleCloseModal();
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          JSON.stringify({
            email: fields.email,
            username: fields.username,
            password: fields.password,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    }
    handleCloseModal();
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        {isLoading && <LoaddingSpinner />}
        {!isLoading && (
          <>
            <h1 className={styles.title}>{isLogin ? "Login" : "Sign Up"}</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <label
                    className={
                      !errors.email
                        ? `${styles.label} ${styles["label-no-error"]}`
                        : styles.label
                    }
                  >
                    Email:
                    <input
                      type="email"
                      name="email"
                      className={styles.input}
                      onBlur={form.handleBlurEvent}
                      onChange={form.handleChangeEvent}
                      value={fields.email}
                    />
                  </label>
                  <p className={errors.email ? styles.error : styles.hide}>
                    {errors.email ? errors.email : ""}
                  </p>
                </>
              )}
              <label
                className={
                  !errors.username
                    ? `${styles.label} ${styles["label-no-error"]}`
                    : styles.label
                }
              >
                Username:
                <input
                  type="text"
                  name="username"
                  className={styles.input}
                  onBlur={form.handleBlurEvent}
                  onChange={form.handleChangeEvent}
                  value={fields.username}
                />
              </label>
              <p className={errors.username ? styles.error : styles.hide}>
                {errors.username ? errors.username : ""}
              </p>
              <label
                className={
                  !errors.password
                    ? `${styles.label} ${styles["label-no-error"]}`
                    : styles.label
                }
              >
                Password:
                <input
                  type="password"
                  name="password"
                  className={styles.input}
                  onBlur={form.handleBlurEvent}
                  onChange={form.handleChangeEvent}
                  value={fields.password}
                />
              </label>
              <p className={errors.password ? styles.error : styles.hide}>
                {errors.password ? errors.password : ""}
              </p>
              <div className={styles.footer}>
                <button
                  type="reset"
                  onClick={handleCloseModal}
                  className={`${styles.button} ${styles.cancel}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`${styles.button} ${styles.submit}`}
                >
                  Submit
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthModal;
