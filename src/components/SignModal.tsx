// import React from 'react'

import { TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

const SignModal = () => {
  const {login} = useContext(AuthContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

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

  
  const handleEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleLoginSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email,password);
    autoRedirect()
  }

  const goBackTo = useNavigate()
  const redirectTo = () => { 
    goBackTo("/")
  }

  const autoRedirect = () => {
    setTimeout(() => {
        redirectTo()
    }, 0);
  }

  return (
    <div>
      <Button variant="primary" onClick={handleShowSignIn}>
        Login
      </Button>

      <Modal show={showSignIn} onHide={handleCloseSignIn}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Button onClick={handleShowSignIn}>Sign in</Button>
            <Button onClick={handleShowSignUp}>Sign up</Button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-input">
              <h2>Sign in</h2>
              <TextField
                id="outlined-textarea"
                label="Email"
                placeholder="Type here"
                multiline
                value={email}
             onChange={handleEmailChange}
              />
              <TextField
                id="outlined-textarea"
                label="Password"
                placeholder="Type here"
                multiline
                value={password}
              onChange={handlePasswordChange}
              />
              <Button type="submit" onClick={handleCloseSignIn}>Sign in</Button>
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
        <Modal.Header closeButton>
          <Modal.Title >
            <Button onClick={handleShowSignIn}>Sign in</Button>
            <Button onClick={handleShowSignUp}>Sign up</Button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-input">
              <h2>Sign up</h2>
              <TextField
                id="outlined-textarea"
                label="Email"
                placeholder="Type here"
                multiline
              />
              <TextField
                id="outlined-textarea"
                label="Password"
                placeholder="Type here"
                multiline
              />
              <Button type="submit">Sign up</Button>
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
