import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { Button, Card, FloatingLabel, Form, Stack } from "react-bootstrap";

import { useContext, useEffect, useState } from "react";

import { useParams } from "react-router";
import { db } from "../config/firebaseConfig";
import { AuthContext } from "../context/AuthContext";
import { User } from "../types/customTypes";

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

  const getLiveMessages = () => {
    if (!countryName) {
      throw new Error("countryName is undefined!");
    }

    const q = query(
      collection(db, "comments", countryName, "messages"),
      orderBy("date", "asc")
    );

    onSnapshot(q, (querySnapshot) => {
      const arrayOfComments: CommentType[] = [];
      querySnapshot.forEach((doc) => {
        const newComment: CommentType = {
          text: doc.data().text,
          date: doc.data().date,
          user: doc.data().user,
          id: doc.id,
        };
        arrayOfComments.push(newComment);
      });

      if (arrayOfComments.length > 0) {
        setComments(arrayOfComments);
      } else {
        setComments(null);
      }
    });
  };

  const handleTextCommentChange = (e: React.ChangeEvent<HTMLFormElement>) => {
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
    console.log("Message added with ID:", docRef.id);
  };

  const handleCommentDelete = async (commentId: string) => {
    if (!countryName) {
      throw new Error("countryName is undefined!");
    }

    try {
      const commentDocRef = doc(
        db,
        "comments",
        countryName,
        "messages",
        commentId
      );
      await deleteDoc(commentDocRef);
      console.log("Message deleted with ID:", commentId);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  // const handleCommentEdit = async (commentId: string) => {
  //   if (!countryName) {
  //     throw new Error("countryName is undefined!");
  //   }

  //   try {
  //     const commentDocRef = doc(db, "comments", countryName, "messages", commentId);
  //     await updateDoc(commentDocRef, {
  //       text: commentText,
  //     date: new Date(),
  //     user: user,
  //     });
  //     console.log("Message edited with ID:", commentId);
  //   } catch (error) {
  //     console.error("Error editing message:", error);
  //   }
  // };

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
                <div>
                  <Button
                    className="comment-delete-button"
                    onClick={() => handleCommentDelete(comment.id)}
                  >
                    Delete
                  </Button>
                </div>
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
