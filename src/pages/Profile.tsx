import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
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
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  // Generate a random DiceBear avatar URL
  const generateAvatar = () => {
    const seed = Math.random().toString(36).substring(7); // Random seed
    const newAvatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
    setAvatarUrl(newAvatarUrl);
  };

  const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    setUsername(inputText);
  };

  const handleProfileUpdate = async () => {
    if (user) {
      try {
        await updateProfile(user, {
          displayName: username,
          photoURL: avatarUrl,
        });

        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, {
          displayName: username,
          avatar: avatarUrl,
        });

        console.log("Profile updated");
        setUser({ ...user, displayName: username, photoURL: avatarUrl });
      } catch (error) {
        console.log("Error updating profile:", error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (updatedUser) => {
      setUser(updatedUser);
      if (updatedUser?.photoURL) {
        setAvatarUrl(updatedUser.photoURL);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <>
      <h1>Your Profile</h1>
      <div className="profile-page">
        <img src={avatarUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"} className="logo" alt="User Avatar" />
        <Button onClick={generateAvatar}>Randomize Avatar</Button>
        <h3>Email: {user?.email}</h3>
        <h3>Username: {user?.displayName || "No username set"}</h3>
        <div className="profile-input">
          <input
            type="text"
            placeholder="Enter new username"
            value={username}
            onChange={handleUsernameInput}
          />
          <Button onClick={handleProfileUpdate}>Update Profile</Button>
        </div>
      </div>
    </>
  );
}

export default Profile;