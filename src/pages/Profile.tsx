import React from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

function Profile() {
  const q = query(collection(db, "cities"), where("capital", "==", true));

  
  return (
    <div>
      <h1>Your profile</h1>
    </div>
  );
}

export default Profile;
