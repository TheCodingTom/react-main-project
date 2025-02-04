// import React from 'react'

import { TextField } from "@mui/material";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const SignModal = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleCloseSignUp = () => setShowSignUp(false);
  const handleCloseSignIn = () => setShowSignIn(false);

  const handleShowSignIn = () => {
    setShowSignIn(true);
    setShowSignUp(false);
  }

  const handleShowSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  }


  return (
    <div>
      <Button variant="primary" onClick={handleShowSignIn}>
        Login
      </Button>

      <Modal show={showSignIn} onHide={handleCloseSignIn}>
        <Modal.Header closeButton>
          <Modal.Title><Button onClick={handleShowSignIn}>Sign in</Button><Button onClick={handleShowSignUp}>Sign up</Button></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
        <form >
          <div className="form-input">
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
            <Button type="submit">Sign in</Button>
          </div>
          
        </form>
      </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSignIn}>
            Close
          </Button>
  
        </Modal.Footer>
      </Modal>

      <Modal show={showSignUp} onHide={handleCloseSignUp}>
        <Modal.Header closeButton>

        <Modal.Title><Button onClick={handleShowSignIn}>Sign in</Button><Button onClick={handleShowSignUp}>Sign up</Button></Modal.Title>
        </Modal.Header>
        <Modal.Body>This is to sign up!</Modal.Body>
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
