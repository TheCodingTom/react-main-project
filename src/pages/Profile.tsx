import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
// import { AuthContext } from "../context/AuthContext";
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  User,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

function Profile() {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [username, setUsername] = useState<string>("");

  // Listen for auth state changes and update user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (updatedUser) => {
      setUser(updatedUser);
    });

    return () => unsubscribe();
  }, [auth]);


  const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    setUsername(inputText);
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
        // forcing re-render by updating user state with spread operator, creating a new object with same properties and replacing displayName
        setUser({ ...user, displayName: username });
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
      </div>
      <h2>Username: {user?.displayName || "No username set"}</h2>
    </>
  );
}

export default Profile;
