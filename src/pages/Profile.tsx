import { useState } from "react";
import { Button } from "react-bootstrap";
// import { AuthContext } from "../context/AuthContext";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

function Profile() {
  
  const [usernameText, setUsernameText] = useState<string>("");
  const auth = getAuth();
  const user = auth.currentUser;
  const [username, setUsername] = useState<string>();

  // const getLiveUsername = () => {
   
  //   if (user) {
  //     const q = query(
  //       collection(db, "users", user?.uid, displayName))
  //       onSnapshot(q, (querySnapshot) => {
  //         const arrayOfComments: CommentType[] = [];
  //         querySnapshot.forEach((doc) => {
  //           const newComment: CommentType = {
  //             text: doc.data().text,
  //             date: doc.data().date,
  //             user: doc.data().user,
  //             id: doc.id,
  //           };
    
  //           arrayOfComments.push(newComment);
  //           setComments(arrayOfComments);
  //         });
  //       });
  //   }
  // }


  const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
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
