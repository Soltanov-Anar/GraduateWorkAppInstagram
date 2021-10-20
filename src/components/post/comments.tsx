import { FC, MutableRefObject, useState } from "react";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import AddComment from "./addComment";
import { CommentType } from "../../helpers/types";

type CommentsProps = {
  docId: string,
  comments: CommentType[],
  posted: number,
  commentInput: MutableRefObject<HTMLInputElement>
}

const Comments: FC<CommentsProps> = ({
  docId,
  comments: allComments,
  posted,
  commentInput
}: CommentsProps) => {

  const [comments, setComments] = useState<Array<CommentType>>(allComments);
  const [commentsSlice, setCommentsSlice] = useState<number>(3);

  const showNextComments = () => setCommentsSlice(commentsSlice + 3);

  return (
    <>
      <div className="p-4 pt-1 pb-4">

        {comments.slice(0, commentsSlice).map((item: CommentType) => (
          <p
            key={`${item.comment}-${item.displayName}`}
            className="mb-1"
          >
            <Link to={`/p/${item.displayName}`}>
              <span className="mr-1 font-bold">
                {item.displayName}
              </span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}

        {comments.length >= 3 && commentsSlice < comments.length && (
          <button
            className="text-sm text-gray-base mb-1 cursor-pointer focus:outline-none"
            type="button"
            onClick={showNextComments}
            onKeyDown={({ key }) => key === 'Enter' && showNextComments()}
          >
            View more comments
          </button>
        )}

        <p className="text-gray-base uppercase text-xs mt-2">
          {formatDistance(posted, new Date())} ago
        </p>

      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
};

Comments.displayName = "Comments";

export default Comments;