import React, { useState } from "react";
import styles from "./ForgotPassword.module.css"; 

const ForgotPassword = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); 
  };

  return (
    <div className={styles.container}>
      <h2>Forgot Password</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Enter your email address:</label>
          <input type="email" id="email" name="email" required />
          <button type="submit">Send Reset Link</button>
        </form>
      ) : (
        <p>
          ✅ If your email is registered, you'll receive a password reset link
          shortly.
        </p>
      )}
    </div>
  );
};

export default ForgotPassword;
