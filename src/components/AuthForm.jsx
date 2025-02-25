import React from "react";

const AuthForm = ({
  title,
  onSubmit,
  children,
  error,
  submitText = "Отправить",
  footerContent,
}) => (
  <div className="auth-container">
    <h2>{title}</h2>
    <form onSubmit={onSubmit}>
      {children}
      {error && <p className="error">{error}</p>}
      <button type="submit">{submitText}</button>
    </form>
    {footerContent && <div className="auth-footer">{footerContent}</div>}
  </div>
);

export default AuthForm;
