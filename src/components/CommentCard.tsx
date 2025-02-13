import { Button, Card } from "react-bootstrap";
import { CommentType } from "../types/customTypes";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

type CommentCardProps = {
  comment: CommentType;
};

function CommentCard({ comment }: CommentCardProps) {
  const { countryName } = useParams<string>();
  const { user } = useContext(AuthContext);

  const dateFormat = (seconds: number) => {
    const formattedDate = new Date(seconds * 1000).toLocaleString();
    return formattedDate;
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

  const [username, setUsername] = useState<string | null>(null);

  const getUsername = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      if (user && user.id === doc.id) {
        const displayName = doc.data().displayName;
        setUsername(displayName);

        if (!displayName) {
          setUsername("friend");
        }
      }
    });
  };

  useEffect(() => {
    getUsername();
  }, [user]); // Run the effect when the user changes

  return (
    <Card style={{ width: "18rem" }} key={comment.id}>
      <Card.Body>
        <Card.Title>{username}</Card.Title>
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
}

export default CommentCard;
