import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { Button, Card, FloatingLabel, Form, Stack } from "react-bootstrap";

import { useContext, useEffect, useState } from "react";
import { User } from "../types/customTypes";
import { useParams } from "react-router";
import { db } from "../config/firebaseConfig";
import { AuthContext } from "../context/AuthContext";

type CommentType = {
  user: User;
  text: string;
  date: Timestamp;
  id: string;
};

function Comments() {
  const { countryName } = useParams<string>();
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState<CommentType[] | null>(null);
  const [commentText, setCommentText] = useState<string>("");

  const getLiveMessages = async () => {
    if (!countryName) {
      throw new Error("countryName is undefined!");
    }

    const q = query(
      collection(db, "comments", countryName, "messages"),
      orderBy("date", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const arrayOfComments: CommentType[] = [];
      querySnapshot.forEach((doc) => {
        const newComment: CommentType = {
          text: doc.data().text,
          date: doc.data().date,
          user: doc.data().user,
          id: doc.id,
        };

        arrayOfComments.push(newComment);
        setComments(arrayOfComments);
      });
    });
  };

  const handleTextCommentChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    console.log(e.target.value);
    const inputText = e.target.value;
    setCommentText(inputText);
  };

  const dateFormat = (seconds: number) => {
    const formattedDate = new Date(seconds * 1000).toLocaleString();
    return formattedDate;
  };

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newComment = {
      text: commentText,
      date: new Date(),
      user: user,
    };

    if (!countryName) {
      throw new Error("countryName is undefined!");
    }

    const messagesCollectionRef = collection(
      db,
      "comments",
      countryName,
      "messages"
    ); // Subcollection for messages

    const docRef = await addDoc(messagesCollectionRef, newComment);
    console.log(newComment);

    console.log("Message added with ID:", docRef.id);
  };

  // const handleMessageDelete = async (e: React.FormEvent<HTMLButtonElement>) => {
  //   e.preventDefault()

  //   if (!countryName) {
  //     throw new Error("countryName is undefined!");
  //   }

  //   const messagesCollectionRef = collection(
  //     db,
  //     "comments",
  //     countryName,
  //     "messages",
  //   );

  //   await deleteDoc(doc(messagesCollectionRef, "messages"));
  //   console.log("Message deleted");
  // }

  useEffect(() => {
    getLiveMessages();
  }, []);

  return (
    <>
      <Stack gap={3} className="align-items-center">
        <h2>Let's talk about {countryName}</h2>

        {comments &&
          comments.map((comment) => {
            return (
              <Card style={{ width: "18rem" }} key={comment.id}>
                <Card.Body>
                  <Card.Title>{comment.user.email}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {dateFormat(comment.date.seconds)}
                  </Card.Subtitle>
                  <Card.Text>{comment.text}</Card.Text>
                </Card.Body>
                <Button>Delete</Button>
              </Card>
            );
          })}

        <Form onSubmit={handleCommentSubmit}>
          <FloatingLabel
            onChange={handleTextCommentChange}
            controlId="floatingInput"
            label="message"
            className="mb-3"
          >
            <Form.Control as="textarea" placeholder="message" />
          </FloatingLabel>
          <Button type="submit">Send</Button>
        </Form>
      </Stack>
    </>
  );
}

export default Comments;
