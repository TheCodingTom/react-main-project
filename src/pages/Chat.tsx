import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { Button, Card, FloatingLabel, Form, Stack } from "react-bootstrap";
import { db } from "../config/firebaseConfig";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

type MessageType = {
  user: string;
  text: string;
  date: Timestamp;
  id: string;
};

function Chat() {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState<MessageType[] | null>(null);
  const [messageText, setMessageText] = useState<string>("");

  const getMessages = async () => {
    const querySnapshot = await getDocs(collection(db, "chat"));
    const messagesArray: MessageType[] = [];
    querySnapshot.forEach((doc) => {
      //   console.log(`${doc.id} => ${doc.data().text}`);
      // const message = doc.data() as MessageType;
      const message: MessageType = {
        text: doc.data().text,
        date: doc.data().date,
        user: doc.data().user,
        id: doc.id,
      };
      messagesArray.push(message);
      setMessages(messagesArray);
    });
    console.log(messagesArray);
  };

  const dateFormat = (seconds: number) => {
    const formattedDate = new Date(seconds * 1000).toLocaleString();
    return formattedDate;
  };

  const handleTextMessageChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    console.log(e.target.value);
    const inputText = e.target.value;
    setMessageText(inputText);
  };

  const handleMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if no user? - protected route YES

    const newMessage = {
      text: messageText,
      date: new Date(),
      user: user,
    };
    const docRef = await addDoc(collection(db, "cities"), newMessage);

    if (!docRef) {
      throw new Error("something went wrong while sending the message");
    }

    if (docRef) {
      console.log("message sent successfully");
    }
  };

  useEffect(() => {
    getMessages();
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
                  <Card.Title>{message.user}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {dateFormat(message.date.seconds)}
                  </Card.Subtitle>
                  <Card.Text>{message.text}</Card.Text>
                </Card.Body>
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
