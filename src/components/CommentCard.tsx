import { Button, Card } from "react-bootstrap";
import { CommentType } from "../types/customTypes";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useParams } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

type CommentCardProps = {
  comment: CommentType;
};

function CommentCard({ comment }: CommentCardProps) {
  const { countryName } = useParams<string>();

  const {user} = useContext(AuthContext)

  const dateFormat = (seconds: number) => {
    const formattedDate = new Date(seconds * 1000).toLocaleString();
    return formattedDate;
  };

  console.log(user?.email);
  console.log(comment.user.email);

  const handleCommentDelete = async (commentId: string) => {
    if (!countryName) {
      throw new Error("countryName is undefined!");
    }

    if (user?.email === comment.user.email) {
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
    }




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
          className={user?.email === comment.user.email ? "comment-delete" : "comment-delete-disabled"}
          onClick={() => handleCommentDelete(comment.id)}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
}

export default CommentCard;
