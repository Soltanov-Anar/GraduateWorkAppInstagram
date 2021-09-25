import { FC, MutableRefObject, useState } from "react";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import AddComment from "./addComment";
import { CommentType } from "../../helpers/types";

type CommentsProps = {
  docId: string,
  comments: CommentType[],
  posted: number,
  commentInput: MutableRefObject<null>
}

const Comments: FC<CommentsProps> = ({
  docId,
  comments: allComments,
  posted,
  commentInput
}: CommentsProps) => {

  const [comments, setComments] =
    useState<Array<CommentType | any>>(allComments);

  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments.length >= 3 && (
          <p className="text-sm text-gray-base mb-1 cursor-pointer">
            View all {comments.length} comments
          </p>
        )}
        {comments.slice(0, 3).map((item: CommentType) => (
          <p
            key={`${item.comment} - ${item.displayName}`}
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
        <p className="text-gray-base uppercase text-xs">
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