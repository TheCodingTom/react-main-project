import { useState } from "react";
import { Button } from "react-bootstrap";
// import { AuthContext } from "../context/AuthContext";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

function Profile() {
  const [username, setUsername] = useState<string>("");
  const auth = getAuth();
  const user = auth.currentUser;

  const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleUsernameChange = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (user)
      try {
        // updates profile in auth
        await updateProfile(user, {
          displayName: username,
        });
        // updates document in firestore database
        const docRef = doc(db, "users", user?.uid);

        await updateDoc(docRef, {
          displayName: username,
        });

        console.log("username updated");
      } catch (error) {
        console.log("error while updating:", error);
      }
  };

  return (
    <>
      <h1>Your profile</h1>
      <div>
        <input
          type="text"
          placeholder="Enter new username"
          value={username}
          onChange={handleUsernameInput}
        />
        <Button onClick={handleUsernameChange}>Update</Button>
        {/* <button onClick={handleUsernameChange}>Update</button> */}
      </div>
      <h2>Username: {user?.displayName}</h2>

      {/* <Form>
        <h2>Set a username</h2>
        <FloatingLabel
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          controlId="floatingInput"
          label="message"
          className="mb-3"
        >
          <Form.Control as="textarea" placeholder="message" />
        </FloatingLabel>
        <Button onClick={handleUsernameChange} type="submit">
          Send
        </Button>
        <h2>Username: {user?.displayName}</h2>
      </Form> */}
    </>
  );
}

export default Profile;
