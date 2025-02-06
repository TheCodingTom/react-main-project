import { getAuth, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";

function Profile() {
    const [commentText, setCommentText] = useState<string>("");


    const handleTextCommentChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        console.log(e.target.value);
        const inputText = e.target.value;
        setCommentText(inputText);
      };
  

   

  getAuth();
  return (
    <div>
      <h1>Your profile</h1>
      <Form>
        <h2>Set a username</h2>
        <FloatingLabel
        onChange={handleTextCommentChange}
          controlId="floatingInput"
          label="message"
          className="mb-3"
        >
          <Form.Control as="textarea" placeholder="message" />
        </FloatingLabel>
        <Button type="submit">
          Send
        </Button>
      </Form>
    </div>
  );
}

export default Profile;
