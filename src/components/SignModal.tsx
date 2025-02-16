import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import styles from "../styles/modal.module.css";

const SignModal = () => {
  const { login, register } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const goToHome = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
    setIcon(type === "password" ? eye : eyeOff);
  };

  const handleShowLoginModal = () => {
    setShowSignIn(true);
    setShowSignUp(false);
  };

  const handleCloseBothModals = () => {
    setShowSignIn(false);
    setShowSignUp(false);
  };

  // const myStyle = {
  //   width: "250px",
  // };

  return (
    <div>
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
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  className={errors.email && email.length > 0 ? styles.errorInput : styles.input}
                />
                {errors.email && email.length > 0 ? <p className={styles.error}>{errors.email}</p> : ""}

                <input
                  type={type}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  autoComplete="current-password"
                  className={errors.password && password.length > 0 ? styles.errorInput : styles.input}
                />

{errors.password && password.length > 0 ? <p className={styles.error}>{errors.password}</p> : ""}
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
            <div className={styles.formInput}>
              <h2>Register</h2>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                className={errors.email ? styles.errorInput : ""}
              />
              {errors.email && <p className={styles.error}>{errors.email}</p>}

              <div className={styles.inputPassword}>
                <input
                  type={type}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  autoComplete="current-password"
                  className={errors.password ? styles.errorInput : ""}
                />
                <span onClick={handleToggle}>
                  <Icon icon={icon} size={25} />
                </span>
              </div>
              {errors.password && (
                <p className={styles.error}>{errors.password}</p>
              )}

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
    </div>
  );
};

export default SignModal;
