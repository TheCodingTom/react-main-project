import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

import styles from "../styles/modal.module.css";

const SignModal = () => {
  const { login, register } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const [type, setType] = useState("password");

  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const goToHome = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regulare expression used to validate emails
    return emailRegex.test(email); // test method checks if the email string matches the pattern
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors({
      ...errors,
      email: validateEmail(e.target.value) ? "" : "Invalid email format",
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrors({
      ...errors,
      password: validatePassword(e.target.value)
        ? ""
        : "Password must be at least 6 characters",
    });
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email) || !validatePassword(password)) {
      setErrors({
        email: validateEmail(email) ? "" : "Invalid email format",
        password: validatePassword(password)
          ? ""
          : "Password must be at least 6 characters",
      });
      return;
    }
    login(email, password);
    goToHome("/");
  };

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email) || !validatePassword(password)) {
      setErrors({
        email: validateEmail(email) ? "" : "Invalid email format",
        password: validatePassword(password)
          ? ""
          : "Password must be at least 6 characters",
      });
      return;
    }
    register(email, password);
  };

  const handleToggle = () => {
    setType(type === "password" ? "text" : "password");
  };

  const handleShowLoginModal = () => {
    setShowSignIn(true);
    setShowSignUp(false);
  };

  const handleCloseBothModals = () => {
    setShowSignIn(false);
    setShowSignUp(false);
  };

  const myStyle = {
    width: "250px",
    height: "40px",
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShowSignIn(true)}>
        Login
      </Button>

      <Modal show={showSignIn} onHide={() => setShowSignIn(false)}>
        <Modal.Header className={styles.topButton}>
          <Button onClick={handleShowLoginModal}>Login</Button>
          <Button onClick={() => setShowSignUp(true)}>Register</Button>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleLoginSubmit}>
            <div className={styles.formModal}>
              <h2>Login</h2>
              <div className={styles.modalInputs}>
                <input
                  style={myStyle}
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  className={
                    errors.email && email.length > 0
                      ? styles.errorInput
                      : styles.input
                  }
                />
                {errors.email && email.length > 0 ? (
                  <p className={styles.error}>{errors.email}</p>
                ) : (
                  ""
                )}

                <div className={styles.passwordContainer}>
                  <input
                    style={myStyle}
                    type={type}
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    autoComplete="current-password"
                    className={
                      errors.password && password.length > 0
                        ? styles.errorInput
                        : styles.input
                    }
                  />

                  <span onClick={handleToggle}>
                    {type === "password" ? (
                      <Button>Show</Button>
                    ) : (
                      <Button>Hide</Button>
                    )}
                  </span>
                </div>

                {errors.password && password.length > 0 ? (
                  <p className={styles.error}>{errors.password}</p>
                ) : (
                  ""
                )}
              </div>

              <Button type="submit">Login</Button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSignIn(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSignUp} onHide={handleCloseBothModals}>
        <Modal.Header className={styles.topButton}>
          <Button onClick={handleShowLoginModal}>Login</Button>
          <Button onClick={() => setShowSignUp(true)}>Register</Button>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleRegisterSubmit}>
            <div className={styles.formModal}>
              <h2>Register</h2>
              <div className={styles.modalInputs}>
                <input
                  style={myStyle}
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  className={
                    errors.email && email.length > 0
                      ? styles.errorInput
                      : styles.input
                  }
                />
                {errors.email && email.length > 0 ? (
                  <p className={styles.error}>{errors.email}</p>
                ) : (
                  ""
                )}

                <div className={styles.passwordContainer}>
                  <input
                    style={myStyle}
                    type={type}
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    autoComplete="current-password"
                    className={
                      errors.password && password.length > 0
                        ? styles.errorInput
                        : styles.input
                    }
                  />

                  <span onClick={handleToggle}>
                    {type === "password" ? (
                      <Button>Show</Button>
                    ) : (
                      <Button>Hide</Button>
                    )}
                  </span>
                </div>

                {errors.password && password.length > 0 ? (
                  <p className={styles.error}>{errors.password}</p>
                ) : (
                  ""
                )}
              </div>

              <Button type="submit">Register</Button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseBothModals}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SignModal;
