import { collection, getDocs, Timestamp } from "firebase/firestore";
import { Button, Card, FloatingLabel, Form, Stack } from "react-bootstrap";
import { db } from "../config/firebaseConfig";
import { useEffect, useState } from "react";

type MessageType = {
  user: string;
  text: string;
  date: Timestamp;
};

function Chat() {
  const [messages, setMessages] = useState<MessageType[] | null>(null);
  const getMessages = async () => {
    const querySnapshot = await getDocs(collection(db, "chat"));
    const messagesArray: MessageType[] = [];
    querySnapshot.forEach((doc) => {
      //   console.log(`${doc.id} => ${doc.data().text}`);
      const message = doc.data() as MessageType;
      messagesArray.push(message);
      setMessages(messagesArray);
    });
    console.log(messagesArray);
  };

  const dateFormat = (seconds:number) => {
    const formattedDate = new Date(seconds * 1000).toLocaleString()
    return formattedDate
  }
 
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
              <Card style={{ width: "18rem" }} key={message.date.nanoseconds}>
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

       
        <Form>
          <FloatingLabel
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
