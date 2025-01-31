import { Button, FloatingLabel, Form, Stack } from "react-bootstrap";

function Chat() {
  return (
    <div>
      <Stack gap={3} className="align-items-center">
        <h1>Chat</h1>
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
    </div>
  );
}

export default Chat;
