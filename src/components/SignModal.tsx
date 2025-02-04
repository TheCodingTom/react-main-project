// import React from 'react'

import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const SignModal = () => {
  const [show, setShow] = useState(false);

  const handleCloseSignIn = () => setShow(false);
  const handleShowSignIn = () => setShow(true);

  const handleCloseSignUp = () => setShow(false);
  const handleShowSignUp = () => setShow(true);
  return (
    <div>
      <Button variant="primary" onClick={handleShowSignIn}>
        Login
      </Button>

      <Modal show={show} onHide={handleCloseSignIn}>
        <Modal.Header closeButton>
          <Modal.Title><Button onClick={handleShowSignIn}>Sign in</Button><Button onClick={handleShowSignUp}>Sign up</Button></Modal.Title>
        </Modal.Header>
        <Modal.Body>This is to sign in!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSignIn}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseSignIn}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleCloseSignUp}>
        <Modal.Header closeButton>

        <Modal.Title><Button onClick={handleShowSignIn}>Sign in</Button><Button onClick={handleShowSignUp}>Sign up</Button></Modal.Title>
        </Modal.Header>
        <Modal.Body>This is to sign up!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSignUp}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseSignUp}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignModal;
