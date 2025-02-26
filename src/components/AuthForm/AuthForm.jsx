import React from "react";
import styles from "./AuthForm.module.css";

const AuthForm = ({
  title,
  onSubmit,
  children,
  error,
  submitText = "Отправить",
  footerContent,
}) => (
  <div className={styles.authContainer}>
    <h2 className={styles.authContainerTitle}>{title}</h2>
    <form onSubmit={onSubmit}>
      {children}
      {error && <p className="error">{error}</p>}
      <button className={styles.submit} type="submit">
        {submitText}
      </button>
    </form>
    {footerContent && <div className="auth-footer">{footerContent}</div>}
  </div>
);

export default AuthForm;
