import {
  FC,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  MutableRefObject,
} from "react";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import { CommentType } from "../../helpers/types";

type AddCommentProps = {
  docId: string,
  comments: CommentType[],
  setComments: Dispatch<SetStateAction<CommentType[]>>,
  commentInput: MutableRefObject<null>,
}

const AddComment: FC<AddCommentProps> = ({
  docId,
  comments,
  setComments,
  commentInput
}: AddCommentProps) => {

  const [comment, setComment] = useState<string>("");
  const { firebase, FieldValue } = useContext(FirebaseContext);

  const { user: { displayName } } = useContext(UserContext);

  const handleSubmitComment = (event: any) => {
    event.preventDefault();

    setComments([...comments, { displayName, comment }]);
    setComment("");

    return firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment })
      });
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        data-testid={`add-comment-submit-${docId}`}
        action="POST"
        className="flex justify-between pl-0 pr-5"
        onSubmit={(event) =>
          comment.length >= 1 ?
            handleSubmitComment(event) :
            event.preventDefault()
        }
      >
        <input
          data-testid={`add-comment-${docId}`}
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target: { value } }) => setComment(value)}
          ref={commentInput}
        />

        <button
          className={
            `text-sm font-bold text-blue-medium ${!comment && "opacity-25"}`
          }
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
};

AddComment.displayName = "AddComment";

export default AddComment;