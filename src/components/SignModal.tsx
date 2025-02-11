
import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

const SignModal = () => {
  const { login, register } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  // modal functions

  const handleCloseSignUp = () => setShowSignUp(false);
  const handleCloseSignIn = () => setShowSignIn(false);

  const handleShowSignIn = () => {
    setShowSignIn(true);
    setShowSignUp(false);
  };

  const handleShowSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  // user input functions

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  // login/register on form submit

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
    autoRedirect();
  };

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(email,password);
    register(email, password);
  };

  // redirect user after sign in

  const goBackTo = useNavigate();
  const redirectTo = () => {
    goBackTo("/");
  };

  const autoRedirect = () => {
    setTimeout(() => {
      redirectTo();
    }, 0);
  };

  const myStyle = {
    width:"205px"
  }

  return (
    <div>
      <Button variant="primary" onClick={handleShowSignIn}>
        Login
      </Button>

      <Modal
        className="dark-theme"
        show={showSignIn}
        onHide={handleCloseSignIn}
      >
        <Modal.Header className="modal-top-btn">
          <Button onClick={handleShowSignIn}>Login</Button>
          <Button onClick={handleShowSignUp}>Register</Button>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-input">
              <h2>Login</h2>
              <div className="input-modal">
                <input
                  type="text"
                  style={myStyle}
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />

                <div className="input-password-modal">
                <input
                  type={type}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  autoComplete="current-password"
                />
                <span
                  className="flex justify-around items-center"
                  onClick={handleToggle}
                >
                  <Icon className="absolute mr-10" icon={icon} size={25} />
                </span>
                </div>
              </div>

              <Button type="submit" onClick={handleCloseSignIn}>
                Login
              </Button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSignIn}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSignUp} onHide={handleCloseSignUp}>
        <Modal.Header className="modal-top-btn">
          <Button onClick={handleShowSignIn}>Login</Button>
          <Button onClick={handleShowSignUp}>Register</Button>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-input">
              <h2>Register</h2>
              <div className="input-modal">
                <input
                  type="text"
                  style={myStyle}
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />

                <div className="input-password-modal">
                <input
                  type={type}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  autoComplete="current-password"
                />
                <span
                  className="flex justify-around items-center"
                  onClick={handleToggle}
                >
                  <Icon className="absolute mr-10" icon={icon} size={25} />
                </span>
                </div>
              </div>
              <Button onClick={handleCloseSignUp} type="submit">
                Register
              </Button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSignUp}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignModal;
