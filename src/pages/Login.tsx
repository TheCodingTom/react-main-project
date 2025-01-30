import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
// import React from "react";

function Login() {
  const {login} = useContext(AuthContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleRegisterSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email,password);
  }


  return (
    <div>
      <h2>Login</h2>
      <div>
        <form onSubmit={handleRegisterSubmit}>
          <div className="form-input">
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
            <Button type="submit">Sign in</Button>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default Login;
