import { FC, useRef } from "react";
import Header from "./header";
import Image from "./image";
import Action from "./actions";
import Footer from "./footer";
import Comments from "./comments";
import { PostProps } from "../../helpers/types";

const Post: FC<PostProps> = ({ content }: PostProps) => {

  const commentInput = useRef<any>(null);
  const handleFocus = () =>
    commentInput?.current?.focus && commentInput.current.focus();

  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
      <Header username={content.username} />

      <Image src={content.imageSrc} caption={content.caption} />

      <Action
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />

      <Footer caption={content.caption} username={content.username} />

      <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />

    </div>
  );
};

Post.displayName = "Post";

export default Post;