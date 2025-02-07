import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
// import { AuthContext } from "../context/AuthContext";
import { getAuth, updateProfile } from "firebase/auth";

function Profile() {
  const [username, setUsername] = useState<string>("");
  const auth = getAuth();
  const user = auth.currentUser;

  const handleUsernameInput = (e:React.FormEvent<HTMLElement>) => {
    setUsername(e.target.value)
  }

  const handleUsernameChange = (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (user)
    updateProfile(user, {
      displayName: username,
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
      console.log(user?.displayName);
  };


  return (
    <>
      <h1>Your profile</h1>
      <Form>
        <h2>Set a username</h2>
        <FloatingLabel
          onChange={(e) => { setUsername(e.target.value)
            
          }}
          controlId="floatingInput"
          label="message"
          className="mb-3"
          value={username}
        
        >
          <Form.Control as="textarea" placeholder="message" />
        </FloatingLabel>
        <Button onClick={handleUsernameChange}type="submit">Send</Button>
      </Form>

      
    </>
  );
}

export default Profile;
