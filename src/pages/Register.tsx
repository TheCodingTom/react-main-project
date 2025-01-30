import { Button, TextField } from "@mui/material";
import React from "react";

function Register() {
  return (
    <div>
      <h2>Register</h2>
      <div>
        <form>
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
            <Button>Sign up</Button>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default Register;
