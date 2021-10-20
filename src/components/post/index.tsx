import { FC, useRef } from "react";
import Header from "./header";
import Image from "./image";
import Action from "./actions";
import Footer from "./footer";
import Comments from "./comments";
import { PostProps } from "../../helpers/types";

const Post: FC<PostProps> = ({
  content: {
    username, imageSrc, caption, docId, likes, userLikedPhoto, comments, dateCreated
  } }: PostProps) => {

  const commentInput = useRef<HTMLInputElement>({} as HTMLInputElement);
  const handleFocus = () =>
    commentInput?.current?.focus && commentInput.current.focus();

  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
      <Header username={username || ""} />

      <div className="bg-black-faded">
        <Image src={imageSrc} caption={caption} />
      </div>

      <Action
        docId={docId}
        totalLikes={likes.length}
        likedPhoto={userLikedPhoto || false}
        handleFocus={handleFocus}
      />

      <Footer caption={caption} username={username || ""} />

      <Comments
        docId={docId}
        comments={comments}
        posted={dateCreated}
        commentInput={commentInput}
      />

    </div>
  );
};

Post.displayName = "Post";

export default Post;