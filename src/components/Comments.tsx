import {
  addDoc,
  collection,

  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { Button, FloatingLabel, Form, Stack } from "react-bootstrap";

import { useContext, useEffect, useState } from "react";

import { useParams } from "react-router";
import { db } from "../config/firebaseConfig";
import { AuthContext } from "../context/AuthContext";
import { CommentType } from "../types/customTypes";
import CommentCard from "./CommentCard";


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



  useEffect(() => {
    getLiveMessages();
    
  }, []);

  return (
    
      <Stack gap={3} className="align-items-center">
        <h2>Let's talk about {countryName}</h2>

        {comments &&
          comments.map((comment) => {
            return <CommentCard comment={comment} key={comment.id} />;
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
      

  );
}

export default Comments;
