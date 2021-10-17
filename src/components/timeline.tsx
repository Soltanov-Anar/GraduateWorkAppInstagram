import { FC, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import LoggedInUserContext from "../context/loggedInUser";
import usePhotos from "../hooks/usePhotos";
import Post from "./post";

const Timeline: FC = () => {

  const { user } = useContext(LoggedInUserContext);

  const { following = {} } = user;
  console.log(following);

  const { photos } = usePhotos(user);

  return (
    <div className="container col-span-3 lg:col-span-2">
      {!following ? (
        <Skeleton
          count={4} width={640} height={500}
          className="mb-5"
        />
      ) : following.length === 0 ? (
        <p className="flex justify-center font-bold">
          Follow other people to see Photos
        </p>
      ) : photos ? (
        photos.map((content: any) =>
          <Post key={content.docId} content={content} />
        )
      ) : null}
    </div>
  );
};

Timeline.displayName = "Timeline";

export default Timeline;