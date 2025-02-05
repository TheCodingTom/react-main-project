import {
  addDoc,
  collection,
  onSnapshot,
  query,
  Timestamp,
} from "firebase/firestore";
import { Button, Card, FloatingLabel, Form, Stack } from "react-bootstrap";

import { useContext, useEffect, useState } from "react";
import { User } from "../types/customTypes";
import { useParams } from "react-router";
import { db } from "../config/firebaseConfig";
import { AuthContext } from "../context/AuthContext";

type MessageType = {
  user: User;
  text: string;
  date: Timestamp;
  id: string;
};

function Chat() {
  const { countryName } = useParams<string>();
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState<MessageType[] | null>(null);
  const [messageText, setMessageText] = useState<string>("");

  const getLiveMessages = async () => {
    if (!countryName) {
      throw new Error("countryName is undefined!");
    }

    const q = query(collection(db, "chat", countryName, "messages"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesArray: MessageType[] = [];
      querySnapshot.forEach((doc) => {
        const message: MessageType = {
          text: doc.data().text,
          date: doc.data().date,
          user: doc.data().user,
          id: doc.id,
        };

        messagesArray.push(message);
        setMessages(messagesArray);
      });
    });
  };

  const handleTextMessageChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    console.log(e.target.value);
    const inputText = e.target.value;
    setMessageText(inputText);
  };

  const dateFormat = (seconds: number) => {
    const formattedDate = new Date(seconds * 1000).toLocaleString();
    return formattedDate;
  };

  const handleMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMessage = {
      text: messageText,
      date: new Date(),
      user: user,
    };

    if (!countryName) {
      throw new Error("countryName is undefined!");
    }

    const messagesCollectionRef = collection(
      db,
      "chat",
      countryName,
      "messages"
    ); // Subcollection for messages

    const docRef = await addDoc(messagesCollectionRef, newMessage);

    console.log("Message added with ID:", docRef.id);
  };

  useEffect(() => {
    getLiveMessages();
  }, []);

  return (
    <>
      <h1>Chat</h1>
      <Stack gap={3} className="align-items-center">
        {messages &&
          messages.map((message) => {
            return (
              <Card style={{ width: "18rem" }} key={message.id}>
                <Card.Body>
                  <Card.Title>{message.user.email}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {dateFormat(message.date.seconds)}
                  </Card.Subtitle>
                  <Card.Text>{message.text}</Card.Text>
                </Card.Body>
                <Button>Delete</Button>
              </Card>
            );
          })}

        <Form onSubmit={handleMessageSubmit}>
          <FloatingLabel
            onChange={handleTextMessageChange}
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

export default Chat;
